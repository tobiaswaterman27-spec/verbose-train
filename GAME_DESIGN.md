# KITHBOUND — Game Design Document

> *A land of wild spirits, a fading doorway, and a kid who still knows how to listen.*

**Status:** Concept — v0.1
**Genre:** Creature-bonding RPG (exploration · turn-based tactical battles · party building)
**Platform:** Browser (Vite + TypeScript)

---

## 1. Elevator pitch

In the sunlit land of **Ellumen**, wild spirits called **Kith** are born out of places — a Kith of the tide pools, a Kith of the old orchard, a Kith of a lightning-struck spire. They're not pets and they're not tools. They're pieces of the land walking around with opinions about you.

You play a young **Kithward**: one of the few who can still hear them clearly. The **Verge** — the shimmering doorway where Kith cross into the world — has begun to thin, and Kith are arriving lost or slipping home before their time. The Great Crossing is one season away. You have until then to set it right.

You won't catch a single Kith. You'll earn every one.

---

## 2. Tone & art direction

**Bright, warm, and adventurous.** This is a story about wonder and friendship, not decay.

- **Feeling:** a summer you remember for the rest of your life. Long golden afternoons, market days, campfires, running downhill.
- **Palette:** saturated and sunlit — meadow greens, warm sandstone, sky blues, peach-and-gold dusk. Even the "dark" Aspect (Gloom) is *cozy dusk*, not horror: fireflies, lantern-light, the blue hour.
- **Stakes are hopeful:** the Verge is *thinning*, not dying. Nobody is doomed. The question is whether the Crossing becomes a celebration or a goodbye — and the answer is up to you.
- **Antagonists are people with a point.** No cackling. The people making things worse are trying to help, and can be won over.
- **Humor is welcome.** Kith are funny. They sulk, show off, steal your breakfast, and get overly proud of minor achievements.

---

## 3. The world of Ellumen

A generous, well-travelled land of coast roads, terraced farms, and market towns, where partnership with Kith is ordinary and beloved. Every town has a Kith that unofficially runs it. Children grow up learning Rites the way kids learn songs.

**The Verge** is the boundary the Kith cross from — visible on clear evenings as a seam of light over the horizon. It's held open by six **Verge-anchors**, wild sites where an **Elder Kith** has settled and put down roots deep enough to hold the door.

**The Great Crossing** happens once a generation: the Verge opens wide, and for one night people and Kith cross freely in both directions. It's the biggest festival Ellumen has. The next one is in a season — and for the first time in recorded history, the Verge is too thin to survive it.

---

## 4. The six Aspects

Six Aspects, not eighteen types. Readable in thirty seconds, deep enough for real team-building.

**Ember · Gale · Gloom · Tide · Stone · Lumen**

Arranged in a ring. **Each Aspect is strong against the next two, weak against the previous two, and neutral against its opposite.**

```
              EMBER
        LUMEN       GALE
        STONE       GLOOM
              TIDE
```

| Aspect | Strong against | Flavour |
|---|---|---|
| **Ember** | Gale, Gloom | A fire feeds on wind; warmth pushes back the dusk |
| **Gale** | Gloom, Tide | Wind scatters what dusk gathers; wind breaks the water |
| **Gloom** | Tide, Stone | Still dusk calms the tide; shadow finds every crack |
| **Tide** | Stone, Lumen | Water wears stone down; water bends and scatters light |
| **Stone** | Lumen, Ember | Stone casts the shadow light can't cross; earth smothers flame |
| **Lumen** | Ember, Gale | Steady light outlasts a flicker; no wind puts out the sun |

Strong = ×1.5 damage. Weak = ×0.67. Opposite pairs (Ember/Tide, Gale/Stone, Gloom/Lumen) are neutral both ways.

---

## 5. Core systems — what makes this its own game

### 5.1 You don't capture. You earn. — **Rites**

No balls, no throwing, no luck rolls. Every Kith species has a **Rite**: a short interactive challenge that reflects its nature.

- **Sparrowick** (skittish) — hold still and match its hopping rhythm without startling it.
- **Gravelope** (proud) — weather three of its charges without retreating a single step.
- **Inkbud** (shy) — find it. It's hiding in its own shadow, and it moved when you blinked.
- **Hushmoth** (playful) — a call-and-response of sounds, getting longer each round.

Succeed and the Kith chooses to come with you — a real scene, with a real reaction. Fail and it flees *warier*: its Rite gets harder the next time you find one of its kind. Bonding is something you get better at, not something you grind.

### 5.2 Trust is a resource — and you can lose it

Every Kith on your team has a **Trust** meter (0–100).

- **Trust rises** from winning together, using it in situations it enjoys, resting at campfires, feeding it things it likes, and taking it to places it's connected to.
- **Trust falls** from being knocked out repeatedly, being pushed into fights far above its level, being benched for a very long time, or being used against its own Aspect-kin.
- **High Trust** (75+) unlocks a Kith's **Deep Ability** — its signature move, only available to a partner it believes in.
- **Low Trust** (below 15) and it starts refusing orders. At zero, it leaves — walks off in a scene you will feel bad about.

This is the emotional spine of the game. Your team is a set of relationships you can genuinely damage. Nothing else in the genre lets a creature quit on you.

### 5.3 Growth is shaped by play, not thresholds — **Paths**

Kith don't evolve at level 30. They grow toward **what you actually use them for**.

Each Kith tracks hidden **Path points** across a few axes (e.g. *Ferocity*, *Guardianship*, *Cunning*, *Harmony*). When it has enough total experience, it matures along whichever Path it's leaned into.

The same **Sparrowick** becomes:
- **Blazewing** (Ferocity) — a fast, fragile striker
- **Beaconwick** (Guardianship) — a slower Kith that shields allies and lights the field
- **Tindertrick** (Cunning) — a status-and-misdirection specialist

Two players with the same starter end up with genuinely different Kith. No guide can tell you "the right one" — there isn't one.

### 5.4 Battles are 3v3 with rows

Tighter and more tactical than a six-slot bench.

- **Three Kith on the field**, arranged **front row / back row**.
- **Front row** takes and deals more physical damage; **back row** is protected but limited in what it can reach.
- **Swapping rows** is a free action once per turn — positioning is a real lever.
- Turn order by **Swiftness**, with moves that can shove, pull, or lock a Kith into a row.

Every pick matters, battles resolve in a couple of minutes, and it's far more achievable to balance well.

---

## 6. Starter roster (v1 — 18 Kith, 3 per Aspect)

Every Kith is a spirit *of a place or a thing*. Names lean invented and evocative.

### Ember — *hearths, kilns, sun-baked stone*
- **Sparrowick** — a palm-sized bird whose tail feather burns like a candlewick. Nervous, devoted, sleeps in your hood. **(Starter)**
- **Kilnmole** — a burrowing Kith with a pottery kiln for a shell. Bakes small clay trinkets and presents them to you, very seriously.
- **Hearthox** ★ — *Elder.* A great ox with a living hearthfire caught between its horns. Warms an entire valley.

### Gale — *ridgelines, high passes, open sky*
- **Whistlekit** — a fox-like Kith with ears that catch the wind and whistle tunes. Learns songs it hears and plays them back badly. **(Starter)**
- **Whirlseed** — a maple-seed Kith that spins endlessly and cannot, constitutionally, land.
- **The Longbreeze** ★ — *Elder.* An enormous drifting ray that rides the high winds and has not touched ground in four hundred years.

### Gloom — *dusk, lantern-light, quiet places*
- **Inkbud** — a shy flower-cat that hides inside its own shadow. Emerges only when it decides you're safe.
- **Hushmoth** — a moth with muffling wings. Sound goes quiet around it. Uses this almost entirely for pranks.
- **The Long Evening** ★ — *Elder.* A great stag of dusk with a scatter of early stars in its antlers.

### Tide — *streams, tide pools, rain*
- **Rillow** — a plump otter of running stream-water. Cheerfully soaks everything it touches. **(Starter)**
- **Kelpin** — a turtle with a full tide-pool garden growing on its back. Hosts smaller Kith as tenants.
- **Shoalmother** ★ — *Elder.* A whale made entirely of moving water, swimming through the coastal air at dawn.

### Stone — *cairns, quarries, old roads*
- **Pebbleknot** — a small stack of river stones that rearranges itself when it thinks you aren't looking.
- **Gravelope** — an antelope plated in slate. Extremely proud. Poses on outcrops.
- **Old Cairnwright** ★ — *Elder.* A walking cairn the size of a hill, who has been carefully stacking the same valley for millennia.

### Lumen — *dawn, prisms, clear water*
- **Sunnip** — a hare that stores daylight in its ears and glows faintly after dark. Runs out around midnight.
- **Prismfin** — a fish that swims through air, refracting light into rainbows behind it.
- **Dayspring Aurel** ★ — *Elder.* A vast crane of dawnlight who lands only at the exact moment of sunrise.

★ = Elder Kith, one per Verge-anchor.

---

## 7. Progression

No gyms, no badges, no eight-then-four ladder.

You travel to the six **Verge-anchors**. At each one, an **Elder Kith** holds the door open — and each is weakening. You don't defeat an Elder. You must be **acknowledged** by one, and each Elder cares about something different:

| Elder | Wants to see |
|---|---|
| **Hearthox** | That you'll stand your ground for a Kith that's struggling |
| **The Longbreeze** | That you can let something go when it wants to leave |
| **The Long Evening** | That you've listened — it asks about your Kith, and you have to know the answers |
| **Shoalmother** | That your team can work as one, not as three |
| **Old Cairnwright** | Patience. Genuinely: it takes a while |
| **Dayspring Aurel** | That you started something and finished it |

Each acknowledgment **re-anchors** part of the Verge and opens more of the map. The game is structured as six chapters that can be tackled in a mostly open order, gated by traversal abilities your Kith provide (Whirlseed catches updrafts, Kelpin ferries you across water, Sunnip lights caves).

**Endgame:** the **Great Crossing**. With the Verge restored, it's the festival of a generation — and the final sequence is a celebration, not a boss fight. What your Kith do that night depends on the Trust you built with each of them. Some cross home. Some stay. That's the ending.

---

## 8. The Tethered

Not villains. A guild of brilliant, well-meaning artificers who watched Kith fade and decided to do something about it.

They invented the **Tether**: a beautifully-made device that binds a Kith so it *can't* slip back through the Verge. It works perfectly. Tethered Kith never fade, never leave, never disobey.

It's also exactly what's thinning the Verge — every tether is a snagged thread in the door.

They don't know. Or the leadership suspects and can't face it, because the alternative is admitting that the thing they built to save Kith is what's driving them away. Their leader, **Warden Sable**, lost a partner Kith to the fade years ago and built the whole guild around making sure it never happened to anyone else.

You can't beat the Tethered by fighting. You beat them by **showing them** — with a team so obviously, visibly bonded that the argument makes itself. They're the dark mirror of the Trust system, and they can be won over.

---

## 9. Build roadmap

Vertical slice first — a playable loop before content.

**Phase 1 — Core loop (playable)**
1. Project scaffold (Vite + TS + Canvas), game loop, input
2. Tile map + player movement + collision
3. Battle engine: 3v3, rows, turn order, Aspect multipliers
4. 6 Kith, ~12 moves, data-driven from JSON/TS definitions

**Phase 2 — The hooks**
5. Rites (start with 2–3 minigame shapes, reused across species)
6. Trust meter + Deep Abilities + Trust-loss consequences
7. Paths / branching maturation

**Phase 3 — Content & shape**
8. Full 18-Kith roster
9. First two regions + two Elders, dialogue system
10. Save/load (localStorage)

**Phase 4 — Polish**
11. Audio, transitions, juice
12. Remaining regions, Tethered arc, Great Crossing finale

---

## 10. Tech

- **Vite + TypeScript**, HTML5 Canvas (2D)
- No engine dependency to start — keeps the build small and the code readable
- All creature/move/region data as typed data files, so content is editable without touching engine code
- Placeholder art first (colored shapes + labels); art passes come later

---

*Working title. Everything here is v0.1 and open to change.*
