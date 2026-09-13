// One command to check both files: syntax, DOM lookups, design-bible data
// invariants, sprite connectivity/proportions, and the turn/fixed-view identity.
const fs = require('fs'), os = require('os'), path = require('path'), cp = require('child_process');
const ROOT = require('path').resolve(__dirname, '..');
const BIBLE = ROOT + '/docs/design-bible.html';
const LAB = ROOT + '/tools/sprite-lab.html';
const scriptOf = f => fs.readFileSync(f, 'utf8').match(/<script>\n([\s\S]*)<\/script>/)[1];

let fails = 0;
const ok = (c, msg) => { console.log(`${c ? 'PASS' : 'FAIL'}  ${msg}`); if (!c) fails++; return c; };

// ---- 1. syntax of both script blocks, UI halves included
for (const [name, file] of [['design-bible', BIBLE], ['sprite-lab', LAB]]) {
  const tmp = path.join(os.tmpdir(), `wh-${name}-${process.pid}.js`);
  fs.writeFileSync(tmp, scriptOf(file));
  const r = cp.spawnSync(process.execPath, ['--check', tmp], { encoding: 'utf8' });
  ok(r.status === 0, `${name} · script parses` + (r.status ? `\n      ${r.stderr.split('\n')[4] || r.stderr.trim()}` : ''));
  fs.unlinkSync(tmp);
}

// ---- 2. every getElementById target exists in the markup
for (const [name, file] of [['design-bible', BIBLE], ['sprite-lab', LAB]]) {
  const html = fs.readFileSync(file, 'utf8');
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
  const used = [...scriptOf(file).matchAll(/(?:\$\(|getElementById\()'([^']+)'\)/g)].map(m => m[1]);
  const missing = [...new Set(used)].filter(u => !ids.has(u));
  ok(missing.length === 0, `${name} · ${new Set(used).size} DOM lookups resolve` + (missing.length ? ` — missing: ${missing.join(', ')}` : ''));
}

// ---- 3. design-bible data invariants
{
  const js = scriptOf(BIBLE);
  const data = js.slice(0, js.indexOf('/* ---------- render'));
  const { EL, EK, ALLOC, PLANS, BUILT, STRONG, CAST } = new Function(data + '\nreturn {EL,EK,ALLOC,PLANS,BUILT,STRONG,CAST};')();
  const total = EK.reduce((n, k) => n + ALLOC[k].reduce((a, b) => a + b, 0), 0);
  ok(total === 100, `bible · roster allocates to ${total}`);
  ok(EK.every(k => ALLOC[k].reduce((a, b) => a + b, 0) === 10), 'bible · every element allocates 10');
  ok(EK.every(k => EL[k].shape && EL[k].tell), 'bible · every element states its shape rule');
  const quota = PLANS.reduce((n, p) => n + p[1], 0);
  ok(quota === 100, `bible · body-plan quota sums to ${quota}`);
  const FIELDS = ['name', 'el', 'stage', 'plan', 'living', 'shape', 'obs', 'rite', 'idle'];
  const incomplete = BUILT.filter(b => FIELDS.some(f => !b[f]));
  ok(incomplete.length === 0, `bible · all ${BUILT.length} built entries are written out in full`
    + (incomplete.length ? ` — ${incomplete.map(b => b.name).join(', ')}` : ''));
  ok(BUILT.every(b => EL[b.el]), 'bible · every entry names a real element');
  ok(EK.every(a => STRONG[a].every(d => EK.includes(d))), 'bible · type chart references only real elements');
  ok(CAST.every(c => c[1] === '—' || EL[c[1]]), 'bible · cast elements are real');
}

// ---- 4. sprites: connectivity, proportion, turn
{
  const js = scriptOf(LAB);
  const cut = js.indexOf('   UI');
  const gen = js.slice(0, js.lastIndexOf('/*', cut));
  const api = new Function(gen + '\nreturn {CREATURES,VIEWS,animsOf,prep,renderFrame,measure,islandCount,turnFramesOf,baseAnim,W,H};')();
  const { CREATURES, VIEWS, animsOf, prep, renderFrame, measure, islandCount, turnFramesOf, baseAnim, W, H } = api;

  const ids = CREATURES.map(c => c.id);
  ok(new Set(ids).size === ids.length, `lab · ${ids.length} creature ids are unique`);

  for (const cr of CREATURES) {
    prep(cr);
    const AN = animsOf(cr);
    const bad = [];
    let n = 0;
    const scan = (buf, label) => {
      n++;
      if (islandCount(buf) > 1) bad.push(`${label} detached`);
      const m = measure(buf);
      if (m.height === 0) bad.push(`${label} empty`);
      else if (m.left < 0 || m.right >= W || m.top < 0 || m.bottom >= H) bad.push(`${label} out of frame`);
    };
    for (const v of VIEWS) for (const a in AN)
      for (let f = 0; f < AN[a].frames; f++) scan(renderFrame(cr, v, a, f, AN[a].frames, false), `${v}/${a}#${f}`);
    const tn = turnFramesOf(cr);
    const th = [];
    for (let f = 0; f < tn; f++) {
      const b = renderFrame(cr, 'front', 'turn', f, tn, false);
      scan(b, `turn#${f}`); th.push(measure(b).height);
    }
    const rows = VIEWS.map(v => measure(renderFrame(cr, v, 'idle', 0, AN.idle.frames, false)));
    const sp = k => Math.max(...rows.map(r => r[k])) - Math.min(...rows.map(r => r[k]));
    const drift = Math.max(sp('height'), sp('top'), sp('bottom'));
    const tSpread = Math.max(...th) - Math.min(...th);
    ok(bad.length === 0 && drift <= 1 && tSpread <= 2,
      `lab · ${cr.name.padEnd(11)} ${String(n).padStart(3)} frames · ${cr.parts.length} parts · view drift ${drift}px · turn ${tSpread}px`
      + (bad.length ? `\n      ${bad.slice(0, 5).join(', ')}${bad.length > 5 ? ` +${bad.length - 5}` : ''}` : ''));
  }

  // the yaw path must land exactly on the authored views at the cardinals
  let diffs = 0;
  for (const cr of CREATURES) {
    cr.turn = (c, p) => baseAnim(c, p, 'idle', 0, 6);
    for (const [step, view] of [[4, 'right'], [8, 'back'], [12, 'left']]) {
      const a = renderFrame(cr, 'front', 'turn', step, 16, false);
      const b = renderFrame(cr, view, 'idle', 0, 6, false);
      for (let i = 0; i < W * H * 4; i++) if (a[i] !== b[i]) { diffs++; break; }
    }
    delete cr.turn;
  }
  ok(diffs === 0, `lab · turn passes exactly through all four authored views (${CREATURES.length * 3} comparisons)`);
}

console.log(fails === 0 ? '\nall checks pass' : `\n${fails} check(s) failed`);
process.exit(fails ? 1 : 0);
