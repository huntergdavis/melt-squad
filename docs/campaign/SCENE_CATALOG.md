# Melt Squad — the next 380 scenes

> Authored design baseline. See the [release ledger](../RELEASES.md) for implementation and deployment status.
> Level 01 is the existing 20-scene collection. Levels 02–20 below add 380 scenes, for 400 total.

Each campaign level is a themed 20-scene pack. Runtime code still calls individual scenes levels; this document does not rename shipped save IDs.

**Design-time readiness:** 343 scenes fit the original target rules; 37 were designed with additional-system dependencies. These classifications are not live release status. Every scene needs authored layouts, artwork, scripted payoffs, integration, and playtesting before release.

Start with the [campaign plan](../CAMPAIGN_BACKLOG.md). Source cards are the numbered JSON files in this directory; regenerate/check with node docs/campaign/build-catalog.mjs or its --check flag.

## Campaign index

| Level | Theme | Scenes | Current rules | Future systems |
| --- | --- | ---: | ---: | ---: |
| 02 | [The Midnight Sock Exchange](#level-02) | 20 | 18 | 2 |
| 03 | [Brine & Parcel](#level-03) | 20 | 18 | 2 |
| 04 | [The Mostly Clockwork Circus](#level-04) | 20 | 18 | 2 |
| 05 | [Borough of Very Small Affairs](#level-05) | 20 | 18 | 2 |
| 06 | [The Great Pudding Republic](#level-06) | 20 | 18 | 2 |
| 07 | [Fossilbean Preschool](#level-07) | 20 | 18 | 2 |
| 08 | [Emberborough Town Hall](#level-08) | 20 | 18 | 2 |
| 09 | [The Runaway Ending Library](#level-09) | 20 | 18 | 2 |
| 10 | [Mount Oops Sports Club](#level-10) | 20 | 18 | 2 |
| 11 | [Ever After, Everywhere](#level-11) | 20 | 18 | 2 |
| 12 | [The Somnolent Seamworks](#level-12) | 20 | 18 | 2 |
| 13 | [The Forecast Conservatory](#level-13) | 20 | 18 | 2 |
| 14 | [The Mycelium Local](#level-14) | 20 | 18 | 2 |
| 15 | [The Institute of Almost Possible](#level-15) | 20 | 18 | 2 |
| 16 | [Last Exit Before Breakfast](#level-16) | 20 | 18 | 2 |
| 17 | [Toybox After Bedtime](#level-17) | 20 | 18 | 2 |
| 18 | [Apocalypse, Rescheduled](#level-18) | 20 | 17 | 3 |
| 19 | [The Hotel Between Tuesdays](#level-19) | 20 | 18 | 2 |
| 20 | [The Great Thaw Festival](#level-20) | 20 | 20 | 0 |

## Future-system registry

- **FLOW** — Persistent water flow and connected channels/basins.
- **MOTION** — Moving target zones and deterministic mechanical motion.
- **BALANCE** — Mass, buoyancy, weights, and physical supports.
- **OPTICS** — Beam reflection/refraction and detectors.
- **PHASE** — Reversible completed structures and coupled temperature states.
- **PULSE** — Timed or rhythmic gates, with an untimed accessibility mode.

These tags name engineering dependencies at design time; the release ledger records which have since been implemented. Unbuilt scenes must not block a playable pack. Completed constructions stay stable unless a scene explicitly uses PHASE; target prerequisites do not act as physical barriers.

<a id="level-02"></a>

## Level 02 — The Midnight Sock Exchange

**Premise.** Pearl, a ghost laundromat keeper, runs a midnight exchange for socks whose partners disappeared. Lefty the detective sock and Pip the lint moth help her discover that the lonely laundry wants new friends, not necessarily identical partners.

**Story arc.** Scenes 01–04 reopen basic service; 05–08 remix mismatched loads; 09–12 welcome kitchen, garden, cave, and cosmic customers; 13–16 prepare public exchange night; 17–19 assemble its stations; 20 lets everyone choose an improbable partner. Optional machine experiments in 14 and 16 are independent side calls.

**Signature.** Amber ghost silhouettes among indigo washers, rectangular ice panes over round machine art, hanging garment bays, and paired stations with conspicuously different settings. Finished laundry performs its reveal in scripted cutaways.

**Reusable art kit:** Pearl ghost clerk poses and expressions; Lefty sock detective and interchangeable sock costumes; Pip lint moth poses; Washer and dryer shells with rectangular service windows; Laundry baskets, receipt strips, tags, and matching-board tiles; Clothesline sections and rectangular garment display frames; Reusable lint clouds, bubbles, and embroidered patch overlays; Moonlit shopfront and customer silhouette layers.

### 02.01 — A Receipt for Being Here

Scene 021 of 400 · Introduction · CURRENT RULES · Mix: town

**Setup.** Pearl waits behind a frosted counter, trying to hand Lefty a receipt through a rectangular ice patch. Her amber welcome pad sits below and to the right.

**Puzzle.** Start at 50° and 50% pressure to MELT the counter patch from above. Then WARM the enabled welcome pad at 20–35° and 15–30% pressure, reducing both settings.

**Payoff.** Pearl stamps Lefty's receipt 'EXISTS, PROBABLY.' The shop sign brightens and one empty basket becomes the detective's office.

### 02.02 — The Sock Needs a Step

Scene 022 of 400 · Introduction · CURRENT RULES · Mix: town

**Setup.** Lefty's first client occupies a high cubby. A wide dotted platform footprint sits beneath it, beside a small frozen nameplate at comfortable nozzle height.

**Puzzle.** FREEZE the platform at −10° or colder, sweeping across its broad rectangle. Its completion enables the separate nameplate MELT target above; switch to hot water and approach that target from above.

**Payoff.** In the completion cutaway, Lefty climbs the finished step and discovers the client is another left sock. They agree this is excellent professional networking.

### 02.03 — Two Tubs, One Moth

Scene 023 of 400 · Introduction · CURRENT RULES · Mix: kitchen + town

**Setup.** Pip advertises a bubble bath between two marked basins: a narrow, high rinse cup and a broad, low wash tray. Their instruction tag is frozen centrally.

**Puzzle.** MELT the tag to enable both FILL targets. Use liquid water above 0° in either order, repositioning above the narrow cup before sweeping the tray. Both basins must finish; neither feeds the other.

**Payoff.** Pip chooses the tiny cup. Pearl gives the enormous tray to one sock's visiting extended family of mittens.

### 02.04 — Please Hold the Applause Cycle

Scene 024 of 400 · Introduction · CURRENT RULES · Mix: town

**Setup.** A stationary turbine protrudes from the first washer's front. A neighboring padded inspection station displays Pearl's finest ghost sheet, rigid with stage fright.

**Puzzle.** SPIN the exposed turbine with water above 0° and pressure at least 70%. Completion enables the inspection WARM zone: settle at 25–40° and 15–30% pressure without moving the nozzle far.

**Payoff.** The washer performs a scripted celebratory wobble. The sheet unfurls a tiny embroidered curtain call and Pearl takes the bow for it.

### 02.05 — Lint at the End of the Tunnel

Scene 025 of 400 · Remix · CURRENT RULES · Mix: cave + town

**Setup.** Two rectangular MELT panes sit vertically above one another in the lint inspection rack. Pip's magnifying-glass silhouette shows through the lower pane.

**Puzzle.** Begin a central opening in the upper pane so subsequent hot droplets can reach the lower target. Widen the opening, then change nozzle position to finish both panes; a hole alone does not finish the job.

**Payoff.** The cleared rack reveals Pip examining an enormous lint specimen. Lefty pins up the case title: 'My Entire Missing Cousin.'

### 02.06 — A Hat for Three Elbows

Scene 026 of 400 · Remix · CURRENT RULES · Mix: town

**Setup.** A three-elbowed coat requests a display stand. Three rectangular FREEZE footprints rise in a staircase across the counter; its frozen claim tag rests at the right.

**Puzzle.** Complete the low, middle, and high stand blocks in any order using cold water. All three enable the claim-tag MELT target. Reach the highest block from above, then change temperature for the tag.

**Payoff.** A cutaway places the coat across the finished stand. Pearl labels it a hat, and the delighted coat immediately develops a very formal posture.

### 02.07 — Delicates and Indelicacies

Scene 027 of 400 · Remix · CURRENT RULES · Mix: kitchen + town

**Setup.** Two stationary pressing pads face one another: a silk handkerchief on the left and a boisterous oven mitt on the right. Their setting cards disagree conspicuously.

**Puzzle.** WARM silk at 15–25° and 10–25% pressure; WARM the mitt at 40–55° and 35–50%. Either pad can finish first. Both enable a central FILL cup for the final rinse.

**Payoff.** The handkerchief produces an elegant flourish. The oven mitt copies it with immense dignity, accidentally presenting an embroidered picture of toast.

### 02.08 — The Lost Property Property

Scene 028 of 400 · Remix · CURRENT RULES · Mix: town + kitchen

**Setup.** Lefty's basket office has acquired two tenants. Their small frozen lease plaques flank a central dotted shelf, with a dry tea basin underneath.

**Puzzle.** MELT either lease plaque to begin its branch: the left enables the shelf FREEZE target; the right enables the tea FILL basin. Complete both branches in any order, managing cold construction and liquid service separately.

**Payoff.** Pearl reveals that both tenants are the same extremely long scarf. It happily pays rent twice, in compliments, while Lefty opens a second office.

### 02.09 — Apron of the Soup Oracle

Scene 029 of 400 · Crossover · CURRENT RULES · Mix: kitchen + town

**Setup.** A visiting chef's apron hangs behind two side-by-side ice swatches. Beneath them, a stationary soup-testing pad sits beside a shallow wash basin.

**Puzzle.** MELT both swatches to enable the wash basin, then FILL it. Washing enables the testing pad; WARM at 30–45° and 15–30% pressure. The low basin and raised pad encourage two distinct aiming positions.

**Payoff.** The clean apron forecasts tomorrow's lunch in alphabet pasta. Pearl writes down 'SOUP' as though it were an astonishingly specific prophecy.

### 02.10 — Compost Formalwear

Scene 030 of 400 · Crossover · CURRENT RULES · Mix: garden + town

**Setup.** A gardening worm's three tiny waistcoats occupy a low inspection bench. A frozen soil label stands above a broad water basin, and three rectangular drying-rack footprints sit apart on the right.

**Puzzle.** MELT the label, then FILL the enabled basin. Its completion enables all three FREEZE rack blocks. Switch cold and complete each separated rectangle; decorative coat hooks do not act as obstacles.

**Payoff.** The worm models all three waistcoats in a cutaway and returns to composting dressed for an extremely small state dinner.

### 02.11 — Bat Cape, Day Shift

Scene 031 of 400 · Crossover · CURRENT RULES · Mix: cave + town

**Setup.** A cave courier has left a cape on a stationary care pad. Two ice inspection tiles are staggered above it, with plenty of nozzle room over each tile.

**Puzzle.** MELT both staggered tiles before the cape's WARM zone becomes active. Reposition between the tiles, then use 20–30° and 10–20% pressure on the cape. Finish by SPINning the newly enabled low drying turbine.

**Payoff.** The cape's owner arrives wearing sunglasses and thanks Pearl for accommodating the day shift. Pip applies for a job as a very small cape.

### 02.12 — Pocketful of Tuesday

Scene 032 of 400 · Crossover · CURRENT RULES · Mix: cosmos + town

**Setup.** A star traveler's trousers contain three labeled calendar pockets, shown as fixed rectangular stations. Monday is frozen, Tuesday needs warmth, and Wednesday has a dotted storage-box footprint.

**Puzzle.** MELT Monday to enable Tuesday, WARM Tuesday at 25–35° and 20–35% pressure, then FREEZE Wednesday's box. Work left to right across different heights; the calendar changes are presentation, with no time mechanic.

**Payoff.** The traveler retrieves three perfectly folded days. Pearl keeps a spare Thursday in the lost-property basket in case anyone has a difficult week.

### 02.13 — Admission by Odd Number

Scene 033 of 400 · Complication · CURRENT RULES · Mix: town + kitchen

**Setup.** Exchange-night guests line the background while three ticket stations occupy a triangle: a frozen guest list, a blank ice badge footprint, and Pearl's dry welcome-tea basin.

**Puzzle.** MELT the guest list to enable the two lower stations. FREEZE the badge and FILL the basin in either order. Both then enable an upper WARM stamp pad requiring 20–35° and 15–25% pressure.

**Payoff.** Every guest receives a badge reading 'ODD ENOUGH.' A completely ordinary sock is warmly admitted under a temporary exemption.

### 02.14 — The Experimental Rinse River

Scene 034 of 400 · Complication · FUTURE: FLOW · Mix: town + garden

**Setup.** Pearl's optional rinse exhibit has an upper inlet, a Y-junction, and two tubs behind rectangular ice plugs.

**Puzzle.** With FLOW, MELT the left plug and feed the inlet until its basin fills, enabling the right plug. MELT that plug; the fixed Y-split now divides inflow between both open branches. Keep feeding until right fills. Only connected-channel inflow counts; completed basins retain progress.

**Payoff.** Pip christens the miniature river with a paper bathtub. Pearl prints absurdly grand cruise tickets.

### 02.15 — An Audience of Sleeves

Scene 035 of 400 · Complication · CURRENT RULES · Mix: town

**Setup.** The talent-show backdrop has three narrow frozen window panels above an inactive applause turbine. A broad rectangular stage footprint occupies the left foreground.

**Puzzle.** FREEZE the stage and MELT all three backdrop panels as independent preparations. Sweep the thin panels from separate overhead positions. Once all four preparations finish, SPIN the enabled applause turbine with positive-temperature water and at least 70% pressure.

**Payoff.** A cutaway arranges the sleeves around the stage. They applaud one another despite having no hands, and Pearl declares this unusually good attendance.

### 02.16 — Carousel of Unclaimed Cuffs

Scene 036 of 400 · Complication · FUTURE: MOTION · Mix: town

**Setup.** An optional demonstration washer carries two rectangular care pads around a slow oval track. Clear labels distinguish a wool cuff and a cotton cuff throughout their motion.

**Puzzle.** With MOTION enabled, follow the wool pad at 20–30° and 10–25% pressure until its WARM task finishes. Then follow cotton at 35–45° and 25–40%. Motion is deterministic and unhurried, with no time limit.

**Payoff.** The carousel stops for a scripted fashion parade. Lefty awards both cuffs honorary sock status; the main exchange needs no carousel to open.

### 02.17 — The Pairing Committee

Scene 037 of 400 · Synthesis · CURRENT RULES · Mix: town + garden

**Setup.** Pearl lays out two service columns. Each has a frozen biography card above a care pad; a shared dotted photograph plinth sits centrally below them.

**Puzzle.** MELT each biography to enable its own pad. WARM one at 15–25° and 10–25% pressure, the other at 40–50° and 30–45%. Both completed biographies and pads enable the final FREEZE plinth.

**Payoff.** The chosen pair—a bath mat and a bow tie—pose on the plinth in a cutaway. Their biographies agree on an intense enthusiasm for puddles.

### 02.18 — The Neighbors Bring Their Weather

Scene 038 of 400 · Synthesis · CURRENT RULES · Mix: garden + cave + cosmos + town

**Setup.** Customers bring a garden cloak, cave scarf, and cosmic towel. Their fixed stations span the shop: wash basin left, ice display block center, frozen luggage tile right.

**Puzzle.** FILL the basin, FREEZE the display block, and MELT the luggage tile in any order. All three enable Pearl's central WARM hospitality pad at 25–40° and 15–30% pressure; plan the setting changes across the width.

**Payoff.** The guests trade weather stories while Pip nests in the towel's embroidered constellation. Pearl hangs a sign offering free emotional drying.

### 02.19 — Lefty's Last Empty Drawer

Scene 039 of 400 · Synthesis · CURRENT RULES · Mix: town

**Setup.** Lefty's original basket office stands beside a wide frozen drawer front. Two slim ice panes overlap vertically above Pearl's dormant portrait-light turbine.

**Puzzle.** MELT the drawer front independently. Start an opening through the upper pane, use it to reach the lower pane, then finish both. These three cleared targets enable a small FREEZE portrait stand, which enables the final SPIN turbine.

**Payoff.** The drawer contains a letter inviting Lefty to be Pearl's business partner. His detective hat becomes the new shop's smallest lampshade.

### 02.20 — Nobody Leaves Unpaired

Scene 040 of 400 · Finale · CURRENT RULES · Mix: town + kitchen + garden

**Setup.** Exchange night fills the shop. The welcome basin, display plinth, frozen matching board, care pad, and applause turbine form a semicircle around Pearl, Lefty, and Pip.

**Puzzle.** FILL the basin and FREEZE the plinth in either order; both enable the board MELT target. Clearing it enables WARM at 25–35° and 15–30% pressure, followed by the final SPIN turbine. All stations remain fixed and reachable.

**Payoff.** A scripted panorama pairs socks with mittens, capes with curtains, and Pearl with her colleague. Pip receives a matching detective hat.

<a id="level-03"></a>

## Level 03 — Brine & Parcel

**Premise.** Clack the crab postmaster and Nori the anxious eel courier reopen a seabed post office. A shy octopus called Dot keeps mailing invitations to herself because she does not yet know anyone else's address.

**Story arc.** Scenes 01–04 restore the counter; 05–08 distinguish sorting and packing stations; 09–12 connect distant neighborhoods; 13–16 expand delivery, including optional side demonstrations in 14 and 16; 17–19 trace Dot's invitations; 20 hosts the first neighborhood letter picnic.

**Signature.** Coral-pink mail slots in deep teal scenery, rectangular glass-front sorting cells, shell-stamp impressions, and tall address stacks paired with broad parcel basins. The hose keeps ordinary ballistic rules; underwater atmosphere and swimming are artwork or scripted reveals.

**Reusable art kit:** Clack crab postmaster poses and stamp claws; Nori eel courier poses and satchel; Dot octopus poses, ink freckles, and invitation cards; Coral post-office wall and modular counter sections; Rectangular sorting cubbies and parcel service frames; Shell stamps, address plaques, route ribbons, and letter bundles; Seagrass, anemone, cave-mail, and star-mail decorative overlays; Postal bicycle, picnic table, and reusable delivery-cutaway poses.

### 03.01 — Postage Due on a Bubble

Scene 041 of 400 · Introduction · CURRENT RULES · Mix: town

**Setup.** Clack's bubble customer waits above a wide postage basin. A dotted rectangular stamp-display footprint sits higher on the right, with clear nozzle space above it.

**Puzzle.** FILL the postage basin directly with water above 0°. Filling enables FREEZE on the display block; switch to −10° or colder and reposition above its raised outline. The bubble remains decorative throughout.

**Payoff.** Clack stamps the bubble in a cutaway. It contains a thank-you note from someone who appreciated yesterday's bubble.

### 03.02 — Mailbox Below Sea Level

Scene 042 of 400 · Introduction · CURRENT RULES · Mix: town + cave

**Setup.** Nori points to a dotted rectangular mailbox plinth near the bottom of the board. Its frozen address card is higher and well clear of the top edge.

**Puzzle.** FREEZE the broad plinth, then MELT the enabled address card. Reposition above the high card before changing to hot water; the completed plinth remains stable.

**Payoff.** A cutaway installs the mailbox. Clack proudly labels it 'GROUND FLOOR,' provoking a thoughtful glance at all the ocean above.

### 03.03 — The Stamp-Licking Department

Scene 043 of 400 · Introduction · CURRENT RULES · Mix: kitchen + town

**Setup.** Two shallow stamp-moistening basins sit far apart across the counter. A central rectangular ice tile hides their shared instruction card.

**Puzzle.** MELT the instruction tile to enable both basins. FILL each with positive-temperature water in either order, moving between the wide left tray and the narrower raised right tray.

**Payoff.** Dot reveals eight immaculate stamp albums and absolutely no letters to send. Clack appoints her honorary head of enthusiastic preparation.

### 03.04 — Air Mail, Technically

Scene 044 of 400 · Introduction · CURRENT RULES · Mix: town + cosmos

**Setup.** A stationary sorting turbine occupies the left counter. An envelope-resting pad and a rectangular ice display footprint occupy the center and right.

**Puzzle.** SPIN the turbine at 70% pressure or more with liquid water. It enables WARM on the envelope pad at 25–40° and 15–25% pressure; completing that enables the FREEZE display block.

**Payoff.** Nori presents the office's first air-mail letter in a sealed decorative bubble. Clack adds an unnecessarily large umbrella.

### 03.05 — Return to Sandbar

Scene 045 of 400 · Remix · CURRENT RULES · Mix: garden + town

**Setup.** Three frozen address tiles form a descending diagonal. The lowest tile partly sits beneath the middle one, with open nozzle space above each.

**Puzzle.** MELT all three tiles. Start an opening in the middle tile to let droplets reach the lower one, then finish both from suitable positions. All tiles enable a central FILL sorting tray.

**Payoff.** The recovered address reads 'the nice sandbar.' Nori unfolds a map showing that every local sandbar has received this review.

### 03.06 — Fragile, Contains Compliments

Scene 046 of 400 · Remix · CURRENT RULES · Mix: town

**Setup.** Two parcels rest on fixed care pads: a porcelain shell on the left and a heavy brass diving bell on the right. A shared packing-block footprint sits below.

**Puzzle.** WARM the shell at 15–25° and 10–20% pressure; WARM the bell at 40–55° and 35–50%. Either may finish first. Both enable the broad FREEZE packing block.

**Payoff.** Clack reveals both parcels contain compliments, carefully wrapped so they arrive without becoming sarcasm.

### 03.07 — Seven Slots and a Shortcut

Scene 047 of 400 · Remix · CURRENT RULES · Mix: town + kitchen

**Setup.** Seven decorative cubbies frame three actual frozen sorting tiles arranged as an inverted triangle. Beneath each tile is its own marked water tray.

**Puzzle.** MELT each tile to enable its corresponding FILL tray. Complete the three branches in any order, keeping the low central tray distinct from the two higher side trays. Empty decorative cubbies are not targets.

**Payoff.** Nori sorts a mountain of mail into three beautifully organized bundles. Clack uses the four spare cubbies for sandwiches.

### 03.08 — Oversize Personality

Scene 048 of 400 · Remix · CURRENT RULES · Mix: town

**Setup.** Dot's first outgoing envelope is enormous. Two separated rectangular support footprints flank its frozen postage panel; the supports and envelope are stationary.

**Puzzle.** FREEZE both support blocks in either order. They jointly enable the postage-panel MELT task. Clearing that panel enables the upper-right SPIN stamp turbine, demanding a cold-to-hot-to-high-pressure sequence.

**Payoff.** A cutaway reveals the envelope contains one tiny invitation. Dot explains that she wanted to leave plenty of room for a yes.

### 03.09 — Soup by Registered Mail

Scene 049 of 400 · Crossover · CURRENT RULES · Mix: kitchen + town

**Setup.** A kitchen delivery occupies two counter heights: a tall frozen recipe panel above a broad soup-service basin. A thermometer pad stands apart on the right.

**Puzzle.** MELT the recipe panel, FILL the newly enabled basin, then WARM the separate tasting pad at 35–45° and 15–30% pressure. The basin accepts any liquid water; only the pad checks serving settings.

**Payoff.** Clack hands Nori a scripted parcel of soup and a separate registered letter containing the croutons' tracking number.

### 03.10 — Seeds with Forwarding Addresses

Scene 050 of 400 · Crossover · CURRENT RULES · Mix: garden + town

**Setup.** A garden club has mailed seed packets to a wandering-looking but stationary illustrated anemone. Two frozen labels flank a low dotted planter stand.

**Puzzle.** MELT the left label to enable a FILL preparation cup; MELT the right to enable the FREEZE planter stand. Completing both branches enables WARM on a seed-care pad at 20–30° and 15–25% pressure.

**Payoff.** The anemone blossoms in a cutaway, revealing permanent address numbers on every petal. Nori finally crosses out 'probably over there' on the route card.

### 03.11 — Echoes Need Envelopes

Scene 051 of 400 · Crossover · CURRENT RULES · Mix: cave + town

**Setup.** A cave resident has sent an echo for repair. Its illustrated jar sits behind two overlapping rectangular ice panes; a small care pad occupies the lower-left bench.

**Puzzle.** Open a hot-water channel through the upper MELT pane to reach the lower pane, then finish both. Their completion enables the jar's WARM pad at 25–35° and 10–25% pressure.

**Payoff.** The jar opens in a cutaway and says 'thank you' twice. Clack bills only once, on the grounds that the second voice sounded very sincere.

### 03.12 — A Constellation of Postal Codes

Scene 052 of 400 · Crossover · CURRENT RULES · Mix: cosmos + town

**Setup.** A star chart decorates the wall behind four fixed stations: two small frozen address plaques, a broad dotted map stand, and an exposed route turbine.

**Puzzle.** MELT both address plaques in either order, then FREEZE the enabled map stand. Completing the stand enables SPIN on the route turbine. Reposition across the board between the separated plaques instead of aiming at decorative stars.

**Payoff.** Nori's delivery map reveals a constellation shaped like an envelope. Clack worries that the universe has forgotten to include a return address.

### 03.13 — The Address Correction Bureau

Scene 053 of 400 · Complication · CURRENT RULES · Mix: town

**Setup.** Dot's repeated invitations fill three counter stations. A frozen addressee panel sits above a label-care pad, with a separate rectangular display footprint beside them.

**Puzzle.** MELT the panel to enable the pad. WARM the label at 20–30° and 15–25% pressure, then FREEZE the enabled display block. The puzzle alternates a small high target with two broader low targets.

**Payoff.** The corrected label reveals Dot has been inviting herself. Nori quietly replaces the office's 'unknown address' box with one reading 'let us help.'

### 03.14 — Pneumatic, Except Wet

Scene 054 of 400 · Complication · FUTURE: FLOW · Mix: town + cave

**Setup.** An optional delivery bench has a fixed Y-split feeding a long far channel and a shorter near channel closed by a rectangular ice plug.

**Puzzle.** With FLOW, feed the upper inlet until the far basin fills, enabling the near plug's MELT task. Clear it; the splitter now supplies both open channels. Continue until the near basin fills. Only connected-channel inflow counts, and filled basins retain progress.

**Payoff.** Clack delivers two waterproof postcards a magnificent twelve inches. Nori applauds the shorter postcard's extremely scenic detour.

### 03.15 — Eight Arms, Three Appointments

Scene 055 of 400 · Complication · CURRENT RULES · Mix: town + kitchen

**Setup.** Dot volunteers at three stationary counters forming a broad triangle: stamp pad above, packing basin lower left, and frozen collection tile lower right. Each wears a distinct pictogram.

**Puzzle.** WARM the stamp pad at 15–30° and 10–25% pressure, FILL the basin, and MELT the collection tile in any order. All three enable a central FREEZE noticeboard base.

**Payoff.** A cutaway shows Dot serving all three desks while holding five cups of tea. She posts her first invitation addressed to 'my new coworkers.'

### 03.16 — Express Snail Demonstration

Scene 056 of 400 · Complication · FUTURE: MOTION · Mix: garden + town

**Setup.** On an optional test track, a very solemn sea snail carries a rectangular warming cradle around a slow loop. A stationary dispatch turbine waits beside the track.

**Puzzle.** With MOTION enabled, follow the cradle and WARM it at 20–35° and 15–30% pressure; the cradle's full rectangle is the moving target. Then SPIN the enabled stationary dispatch turbine. No deadline applies.

**Payoff.** The snail receives an 'EXPRESS, EMOTIONALLY' sash. Nori keeps the ordinary satchel route open, so subsequent deliveries do not depend on the prototype.

### 03.17 — Care of Everyone

Scene 057 of 400 · Synthesis · CURRENT RULES · Mix: garden + cave + cosmos

**Setup.** Three fixed invitation stations represent the garden club, cave resident, and star traveler. Each has a frozen name plaque above its own smaller stamp-care pad.

**Puzzle.** MELT each plaque to enable its pad. WARM garden at 20–30° and 15–25% pressure, cave at 30–40° and 20–35%, and star at 40–50° and 35–50%. Branches can finish in any order.

**Payoff.** Each invitation gains a visible stamped portrait of its recipient. Dot adds a fourth card addressed to the squad, with the return address finally filled in.

### 03.18 — Parcel Picnic Preparations

Scene 058 of 400 · Synthesis · CURRENT RULES · Mix: kitchen + garden + town

**Setup.** Clack's picnic service forms two columns: a frozen menu over a broad serving basin, and two dotted rectangular table blocks beside a dormant lantern turbine.

**Puzzle.** MELT the menu, then FILL its enabled basin. Independently FREEZE both table blocks. Finishing both branches enables the lantern SPIN target; switch to positive water and high pressure for the final station.

**Payoff.** A scripted table-setting reveals that Clack has packed a separate fork for each of Dot's arms. Nori contributes eight tiny napkin rings.

### 03.19 — The Letter with No Destination

Scene 059 of 400 · Synthesis · CURRENT RULES · Mix: town

**Setup.** One final envelope rests behind a broad ice panel at center. Two care pads flank it, labeled handwriting and seal; a small display-block footprint sits below.

**Puzzle.** MELT the central panel to enable both pads. WARM handwriting at 15–25° and 10–25% pressure, seal at 35–45° and 30–45%. Both enable the final FREEZE display block.

**Payoff.** The envelope contains Dot's unsent thank-you to whoever might become her friend. Clack marks its delivery status 'already here' and places it on the counter.

### 03.20 — Signed for by the Whole Reef

Scene 060 of 400 · Finale · CURRENT RULES · Mix: town + garden + cosmos

**Setup.** The picnic tableau frames five fixed service stations: guest-list ice panel, wide welcome basin, dotted postcard stand, address-care pad, and celebration turbine. The three postal friends watch from the background.

**Puzzle.** MELT the guest list; then FILL the basin and FREEZE the stand in either order. Both enable WARM on the address pad at 25–40° and 15–30% pressure, followed by the final SPIN turbine.

**Payoff.** Neighbors arrive in a scripted panorama. Dot receives a mailbox overflowing with replies, and Nori has an address labeled 'our picnic.'

<a id="level-04"></a>

## Level 04 — The Mostly Clockwork Circus

**Premise.** Tick, a clock-headed ringmaster, wants every act to run precisely on schedule. Bea the brass giraffe and Tock the metronome beetle help the squad discover that the circus works best when its performers have room to be themselves.

**Story arc.** Scenes 01–04 open the tent; 05–08 rehearse contrasting acts; 09–12 host visiting performers; 13–16 stretch the program, with independent optional motion and rhythm demonstrations; 17–19 replace Tick's rigid schedule with a welcoming show; 20 gives Bea the unhurried encore she wanted.

**Signature.** Striped canvas, brass instruments, large readable preparation rectangles around decorative clockwork circles, and repeated switches between powerful drive turbines and gentle performer-care pads. Performance motion is scripted after completion except where explicitly gated.

**Reusable art kit:** Tick clock-headed ringmaster expressions and cane poses; Bea brass giraffe standing, bowing, and scarf poses; Tock metronome beetle and small percussion accessories; Modular striped tent, curtain, bleacher, and ticket-booth sections; Brass turbine housings, fixed rehearsal pads, and display plinth frames; Juggling cups, flower collars, echo drums, and star scarves; Program cards, applause placards, and gear-shaped decorative borders; Reusable scripted bow, spotlight, confetti, and audience-reaction layers.

### 04.01 — The Ringmaster Is Six Minutes Tall

Scene 061 of 400 · Introduction · CURRENT RULES · Mix: town

**Setup.** Tick's enormous clock-face hat is covered by a rectangular ice panel. His microphone-care pad sits lower on the opposite side of the entrance.

**Puzzle.** MELT the hat panel to enable the microphone WARM zone. Move across the entrance and settle at 25–35° and 15–30% pressure; the clock hands are decorative, with no deadline.

**Payoff.** Tick announces that the performance begins at 'tall past six.' Tock quietly turns the printed schedule sideways to make it fit.

### 04.02 — A Giraffe-Sized Entrance

Scene 062 of 400 · Introduction · CURRENT RULES · Mix: town

**Setup.** Bea waits behind the painted entrance arch. Two dotted rectangular presentation blocks sit side by side below her frozen name plaque, with clear aiming space above all three.

**Puzzle.** FREEZE both blocks in any order. Their completion enables the name-plaque MELT target. Switch hot and clear the plaque; the arch is scenery and does not block the nozzle or stream.

**Payoff.** Bea steps onto the finished blocks in a cutaway. The unveiled sign reads 'INTRODUCING BEA,' then unfolds several extra feet of polite qualifications.

### 04.03 — The Smallest Splash Spectacular

Scene 063 of 400 · Introduction · CURRENT RULES · Mix: kitchen + town

**Setup.** Tock has booked two splash basins for his water act: a wide low trough and a very narrow raised cup. A frozen act card stands between them.

**Puzzle.** MELT the act card to enable both FILL basins. Supply liquid water to each, moving close above the raised cup for a clear downward stream. Neither basin automatically fills the other.

**Payoff.** Tock performs a scripted splash in the tiny cup. The enormous trough is reserved for the equally dramatic towel service.

### 04.04 — Round of Applause, Square of Care

Scene 064 of 400 · Introduction · CURRENT RULES · Mix: town

**Setup.** A stationary wheel-drive turbine sits beside a square costume-care pad. Bea's folded scarf waits on the pad, and the decorative applause wheel hangs behind both.

**Puzzle.** SPIN the turbine with positive-temperature water and at least 70% pressure. Completion enables WARM on the scarf pad at 20–35° and 10–25% pressure; reduce pressure before tending the scarf.

**Payoff.** The wheel turns only in the completion animation, revealing applause cards in eight languages. Bea chooses the one that simply shows a happy sandwich.

### 04.05 — Peeking Through the Program

Scene 065 of 400 · Remix · CURRENT RULES · Mix: town + kitchen

**Setup.** Two tall MELT panels overlap vertically in Tick's frozen program stand. A small illuminated rehearsal pad sits off to the right, initially inactive.

**Puzzle.** Open a central channel through the upper panel to reach the lower one, then finish clearing both. This enables the rehearsal pad; WARM it at 25–40° and 20–35% pressure.

**Payoff.** The program reveals that Bea has been scheduled to juggle the intermission. She requests a slightly more tangible prop and is handed a biscuit.

### 04.06 — Polish for a Nervous Neck

Scene 066 of 400 · Remix · CURRENT RULES · Mix: town

**Setup.** Bea's rehearsal bench holds a low scarf-care pad and a higher brass-collar pad. A broad rectangular portrait-base footprint waits below the gap between them.

**Puzzle.** WARM the scarf at 15–25° and 10–25% pressure, and the collar at 40–55° and 30–45%. Complete either first; both enable the FREEZE portrait base. Shift aim and settings between the separated pads.

**Payoff.** Bea poses in the completion cutaway, scarf comfortably crooked. Tick updates her program portrait to include the crooked bit.

### 04.07 — Two Acts Enter, Both Get Tea

Scene 067 of 400 · Remix · CURRENT RULES · Mix: kitchen + town

**Setup.** Two rehearsal columns face each other. Tock's frozen cue card sits above a drum turbine; Bea's frozen prop card sits above a shallow tea basin.

**Puzzle.** MELT either card to activate its own branch. SPIN Tock's turbine with high-pressure liquid water and FILL Bea's basin with liquid water. Both branches must finish, but their order is open.

**Payoff.** The cutaway reveals Tock performing a drumroll while Bea takes an elaborate sip. The audience applauds the remarkable coordination of refreshments.

### 04.08 — The Dramatically Level Table

Scene 068 of 400 · Remix · CURRENT RULES · Mix: town

**Setup.** Three rectangular FREEZE footprints form the illustrated bases of a circus table. A small frozen ribbon plaque hangs above the center, separate from the blocks.

**Puzzle.** Complete all three cold construction targets, moving along their staggered heights. Their completion enables MELT on the ribbon plaque. The finished blocks remain stable; there is no balance or support simulation.

**Payoff.** A scripted reveal places a perfectly ordinary table on the bases. Tick bills it as 'a breathtaking absence of wobble,' and Bea looks deeply relieved.

### 04.09 — The Teacup Juggler's Day Off

Scene 069 of 400 · Crossover · CURRENT RULES · Mix: kitchen + town

**Setup.** A visiting kitchen performer has three stationary tea-service cups arranged diagonally. A frozen recipe tile enables them; a large care pad waits at the bottom.

**Puzzle.** MELT the recipe, then FILL all three cups with liquid water, repositioning above each raised basin. The completed cups enable WARM at 30–40° and 15–25% pressure on the bottom pad.

**Payoff.** The performer juggles the prepared cups only in the cutaway. Bea holds the biscuits in a much less aerial supporting role.

### 04.10 — A Bouquet with Stage Directions

Scene 070 of 400 · Crossover · CURRENT RULES · Mix: garden + town

**Setup.** A garden clown's flower collar decorates a central care pad. Two small rectangular vase-stand footprints flank a broad watering basin along the lower bench.

**Puzzle.** FILL the watering basin and FREEZE both vase stands in any order. All three enable WARM on the collar pad at 20–30° and 10–25% pressure. Target outlines remain clear of decorative stems.

**Payoff.** The collar blooms in a cutaway, each flower bowing in a different direction. Tock calls it the first act with its own enthusiastic audience.

### 04.11 — An Echo with Top Billing

Scene 071 of 400 · Crossover · CURRENT RULES · Mix: cave + town

**Setup.** A cave performer's drum sits on a stationary care pad beneath two narrow frozen sound-check tiles. An exposed accompaniment turbine stands well to the left.

**Puzzle.** MELT both tiles to enable the drum pad. WARM it at 25–40° and 15–30% pressure, then SPIN the enabled accompaniment turbine. The sound effects follow completion and require no acoustic simulation.

**Payoff.** The echo repeats Tick's introduction and receives its own curtain call. Tock writes 'plus one' on the dressing-room door.

### 04.12 — Orbiting the Snack Break

Scene 072 of 400 · Crossover · CURRENT RULES · Mix: cosmos + kitchen

**Setup.** A cosmic scarf performer rests on a fixed preparation pad. Three rectangular star-display footprints form a gentle arc above a frozen act placard.

**Puzzle.** FREEZE the three display blocks in any order, then MELT the enabled placard. Clearing it enables WARM on the scarf pad at 30–45° and 20–35% pressure. Ordinary water gravity applies throughout preparation.

**Payoff.** In the cutaway, the scarf's painted planets orbit a biscuit. Bea asks whether astronomy has always been this relatable.

### 04.13 — Too Many Things at Eight O'Clock

Scene 073 of 400 · Complication · CURRENT RULES · Mix: town

**Setup.** Tick's program board has three frozen appointment strips in a vertical staircase. Each strip sits beside its own small fixed care pad; distinct clock icons connect the pairs.

**Puzzle.** MELT each strip to enable its paired WARM pad. The pads require 20–30°/10–25% pressure, 30–40°/20–35%, and 40–50°/30–45%. Complete the three branches in any order; clock art imposes no timing requirement.

**Payoff.** The restored schedule reveals three simultaneous solos. Tick changes the heading to 'a friendly trio' and visibly relaxes one clock hand.

### 04.14 — The Rehearsal Wheel Rehearses

Scene 074 of 400 · Complication · FUTURE: MOTION · Mix: town

**Setup.** An optional rehearsal wheel carries one rectangular brass-care pad around a slow tall oval. Two stationary ribbon-care pads sit beyond opposite sides of its route.

**Puzzle.** With MOTION, track and WARM brass at 45–60° and 35–50% pressure. WARM both fixed ribbons at 15–25° and 10–20% pressure. All three tasks start active; choose between finishing gentle stationary work first or following the moving brass. No deadline applies.

**Payoff.** The wheel stops for a scripted bow between its two ribbons. Bea solemnly introduces it as a surprisingly well-dressed colleague.

### 04.15 — Landing on a Compliment

Scene 075 of 400 · Complication · CURRENT RULES · Mix: town + garden

**Setup.** Bea's next act has three low rectangular stage footprints and two frozen compliment cards above them. The cards and outlines are separated across a broad open rehearsal floor.

**Puzzle.** FREEZE all three stage blocks in any order, then MELT the two enabled compliment cards. Both cards enable a small FILL refreshment cup. The act begins only in the completion cutaway, with no live landing physics.

**Payoff.** Bea makes one modest scripted hop onto the finished stage. The cards unfold to read 'LOVELY HOP' and 'EXCELLENT ARRIVAL.'

### 04.16 — Tock Takes a Breath

Scene 076 of 400 · Complication · FUTURE: PULSE · Mix: town

**Setup.** An optional percussion desk presents two stationary turbine targets with large beat indicators. A fixed rehearsal-care pad sits between them and lights after both beats register.

**Puzzle.** With PULSE enabled, apply high-pressure liquid water to each SPIN turbine during its visibly open beat window, then WARM the pad at 25–35° and 15–30% pressure. Untimed accessibility mode keeps both beat gates open until completed.

**Payoff.** Tock performs a drumroll with a conspicuously satisfying pause. Tick writes the pause into the music; all subsequent scenes work without rhythmic gates.

### 04.17 — The Quietest Drumroll

Scene 077 of 400 · Synthesis · CURRENT RULES · Mix: garden + town

**Setup.** Tock's fixed percussion turbine stands between Bea's scarf-care pad and a guest's flower-care pad. The two gentle pads are inactive until the turbine has been serviced.

**Puzzle.** SPIN the turbine at 70% pressure or more. Then WARM scarf at 20–30° and 10–25% pressure and flowers at 30–40° and 15–30%, in either order. Completed turbine progress remains complete after pressure drops.

**Payoff.** The reveal replaces the thunderous drumroll with delicate fingertip taps. Bea begins her introduction without hurrying, while the flowers politely stop bowing for a moment.

### 04.18 — Every Seat Is the Good Seat

Scene 078 of 400 · Synthesis · CURRENT RULES · Mix: kitchen + cave + garden + town

**Setup.** The audience entrance has two rectangular seating-block footprints, a frozen hospitality sign, a drink basin, and a house-light turbine. The stations form two side-by-side columns.

**Puzzle.** FREEZE both seating blocks independently of MELTing the sign. The sign enables FILL on the basin; completed seating and refreshments jointly enable the final SPIN turbine. Plan cold construction and liquid service across the two columns.

**Payoff.** A cutaway fills the seats with kitchen, cave, and garden visitors. Tick personally labels every chair 'BEST VIEW,' and somehow means it.

### 04.19 — The Encore in the Coat Pocket

Scene 079 of 400 · Synthesis · CURRENT RULES · Mix: town

**Setup.** Bea's coat hangs behind a tall ice panel above a shorter pocket panel. A small note-care pad rests to the right, beside a dotted display-block footprint.

**Puzzle.** Channel through the upper MELT panel to reach the pocket panel, then finish both. WARM the enabled note pad at 20–35° and 10–25% pressure; that enables the FREEZE display block.

**Payoff.** The pocket note asks for one more bow with all her friends. Tick tears a blank page from the schedule and writes 'as long as you like.'

### 04.20 — The Show Goes On When Ready

Scene 080 of 400 · Finale · CURRENT RULES · Mix: town + garden + cave + cosmos

**Setup.** The ring frames a curtain ice panel, stage footprint, two performer-care pads, and the applause turbine. Tick, Bea, and Tock wait in the backdrop.

**Puzzle.** MELT the curtain panel and FREEZE the stage in either order. Both enable WARM on Bea's pad at 20–30°/10–25% pressure and Tock's at 35–45°/25–40%. Both pads enable the final SPIN applause turbine.

**Payoff.** A scripted ensemble bow includes the echo, flowers, scarf, and proud rehearsal wheel. Tick's clock face replaces its numbers with little pictures of everyone who came.

<a id="level-05"></a>

## Level 05 — Borough of Very Small Affairs

**Premise.** A miniature town occupies a desktop organizer. Mayor Midge, Clerk Quill the hedgehog, and Inspector Pin the beetle enlist the squad to thaw its civic services, then discover that their smallest residents need a welcoming common square more than additional paperwork.

**Story arc.** Scenes 01–04 reopen basic services; 05–08 untangle parallel applications; 09–12 welcome unusual residents; 13–16 reconsider civic habits, with optional measurement demonstrations in 14 and 16; 17–19 prepare a commons and charter; 20 replaces the final permit queue with a neighborhood gathering.

**Signature.** Giant stationery establishes the tiny scale, while rectangular application trays and approval pads make prerequisites visible as annotated diagrams. Two-column services, stacked archive panes, and gentle stamp calibration distinguish administrative puzzles from mechanical repair.

**Reusable art kit:** Mayor Midge seed-sized mouse poses and ceremonial sash; Clerk Quill miniature hedgehog poses and pen accessories; Inspector Pin beetle poses and magnifying-lens badge; Desktop-organizer streets, corkboard skyline, and modular counter windows; Application cards, accessible pictogram stamps, queue signs, and approval ribbons; Rectangular archive boxes, basin ink trays, and ice display footprints; Giant pencil, eraser, paperclip, and ruler background props; Commons furniture and reusable resident portrait tokens.

### 05.01 — Window One Is Having a Day

Scene 081 of 400 · Introduction · CURRENT RULES · Mix: town

**Setup.** Clerk Quill sits behind a frozen rectangular service window. A small stamp-conditioning pad stands below it, while the giant pencil skyline establishes the borough's scale.

**Puzzle.** MELT the window to enable the stamp WARM target. Reposition above the lower pad and use 20–35° and 15–30% pressure; the painted counter does not physically block water.

**Payoff.** Quill raises a sign reading 'OPEN TO REASON.' Mayor Midge celebrates by being the first resident to ask where the queue begins.

### 05.02 — A Permit to Reach the Counter

Scene 082 of 400 · Introduction · CURRENT RULES · Mix: town

**Setup.** A tiny resident waits in the background beside two dotted rectangular access-platform footprints. A frozen accessibility notice is mounted separately above the right block.

**Puzzle.** FREEZE the two broad platform blocks in either order, then MELT the enabled notice. Keep the nozzle above each footprint while building; hot water on the notice cannot undo completed construction.

**Payoff.** A cutaway shows residents using the finished platform. Quill immediately abolishes the application fee for reaching the application window.

### 05.03 — Public Fountain, Private Teacup

Scene 083 of 400 · Introduction · CURRENT RULES · Mix: kitchen + town

**Setup.** Separate rectangular ice covers hang above a broad low fountain basin and a narrow raised testing cup. Both basins have open side access.

**Puzzle.** Both FILL basins start active. Use hot water to MELT openings through their covers, letting later droplets fill below; direct pouring from the open sides also works. Finish both covers and both basins, choosing local pairs or alternating across the counter.

**Payoff.** The teacup fountain starts in a scripted reveal. Inspector Pin declares it publicly refreshing and requests a biscuit-testing department.

### 05.04 — The Official Opening of the Fan

Scene 084 of 400 · Introduction · CURRENT RULES · Mix: town

**Setup.** A stationary ventilation turbine sits beside an inactive ceremonial-ribbon care pad. Mayor Midge's ribbon is visibly enormous compared with the tiny reception desk.

**Puzzle.** SPIN the turbine with liquid water and pressure at least 70%. This enables the ribbon WARM target; lower settings to 25–40° and 15–25% pressure before tending the nearby pad.

**Payoff.** The fan turns in the completion cutaway and flutters the ribbon beautifully. Midge opens the office by politely untying its bow.

### 05.05 — Triplicate, but Make It Legible

Scene 085 of 400 · Remix · CURRENT RULES · Mix: town + cave

**Setup.** Three frozen archive panels form a descending stack down the left wall. The middle and bottom rectangles overlap vertically; a clean-document pad waits on the right.

**Puzzle.** MELT all three panels, using an opening through the middle pane to send later droplets toward the bottom one. Finish each panel; then WARM the enabled document pad at 20–30° and 10–25% pressure.

**Payoff.** The recovered triplicate forms all say 'PLEASE USE ONE COPY.' Quill places two in the borough museum of very recent history.

### 05.06 — License to Be a Puddle

Scene 086 of 400 · Remix · CURRENT RULES · Mix: garden + town

**Setup.** A puddle applicant is represented by a smiling portrait card. Its frozen location plaque stands beside a low water basin and a dotted rectangular name-sign base.

**Puzzle.** MELT the plaque to enable two branches: FILL the basin for the puddle's approved address, and FREEZE the sign base. Complete those branches in either order, changing temperature between water service and construction.

**Payoff.** The cutaway places a tiny 'RESIDENT' sign beside the puddle. Inspector Pin immediately becomes its first reflection and receives a friendly wave.

### 05.07 — The Department of Warm Regards

Scene 087 of 400 · Remix · CURRENT RULES · Mix: town

**Setup.** Two stamp-care pads occupy opposite ends of the desk. The condolence stamp has a soft blue label; the celebratory stamp has a bright brass label. A shared ink basin sits centrally.

**Puzzle.** WARM blue at 15–25° and 10–20% pressure, brass at 40–50° and 30–45%. Both completed pads enable FILL on the central basin. Choose either pad first and read each label before changing settings.

**Payoff.** Quill reveals both stamps print 'WE'RE HERE FOR YOU,' with different amounts of confetti. Midge requests a sensible middle amount.

### 05.08 — Queue for the Queue-Free Window

Scene 088 of 400 · Remix · CURRENT RULES · Mix: town + kitchen

**Setup.** Two service windows each display a frozen appointment card. The left card connects visibly to a rectangular seating footprint; the right connects to a refreshment basin.

**Puzzle.** MELT each card to enable its branch, then FREEZE the seat block and FILL the basin in either order. Both branches enable an upper WARM information pad at 25–35° and 15–30% pressure.

**Payoff.** The final sign invites residents to sit anywhere while Quill brings the paperwork to them. The old queue rope becomes an extremely dignified washing line.

### 05.09 — Café Zoning for One Crumb

Scene 089 of 400 · Crossover · CURRENT RULES · Mix: kitchen + town

**Setup.** A kitchen entrepreneur proposes a café beneath a giant biscuit. A frozen site-plan panel sits above a broad preparation basin; two small rectangular table-block footprints stand on the right.

**Puzzle.** MELT the site plan and FILL its enabled basin. Independently FREEZE both table blocks. All preparations enable a WARM menu pad at 30–40° and 15–25% pressure.

**Payoff.** The café opens in a cutaway with one crumb divided into a tasting menu. Inspector Pin awards it three enthusiastic magnifying glasses.

### 05.10 — The Walking Leaf Applies to Stay

Scene 090 of 400 · Crossover · CURRENT RULES · Mix: garden + town

**Setup.** An illustrated leaf insect waits beside a garden-registration desk. Two frozen address plaques flank a central plant-care pad, with a broad watering basin below.

**Puzzle.** MELT both plaques to enable the FILL basin. Filling enables WARM on the care pad at 20–30° and 10–25% pressure. Reposition between the high plaques before tending the two low stations.

**Payoff.** Quill registers the leaf insect as both resident and welcome shade provider. The insect accepts the address but politely declines weekly pruning.

### 05.11 — Permission to Echo Politely

Scene 091 of 400 · Crossover · CURRENT RULES · Mix: cave + town

**Setup.** A cave resident's sound permit is frozen into two vertically overlapping archive panes. A fixed microphone-care pad and an inactive announcement turbine sit separately on the right.

**Puzzle.** Begin a channel through the upper MELT pane to reach the lower one, then finish both. WARM the enabled microphone at 20–35° and 15–25% pressure, followed by SPIN on the announcement turbine.

**Payoff.** A scripted announcement welcomes the echo as a resident. It repeats the welcome, prompting Midge to create a deputy mayor of making people feel included.

### 05.12 — A Postal Code for a Moonbeam

Scene 092 of 400 · Crossover · CURRENT RULES · Mix: cosmos + town

**Setup.** A cosmic visitor needs an address. Three dotted rectangular map-marker footprints sit at different heights beside a frozen registration panel; star paths behind them are decorative.

**Puzzle.** FREEZE all three markers, then MELT the enabled registration panel. Clearing it enables a fixed WARM signature pad at 30–45° and 20–35% pressure. Move above each marker; no beam routing is involved.

**Payoff.** The registered address reads 'third sparkle after the pencil.' Inspector Pin stamps the visitor's reflected portrait and admires the exceptionally tidy handwriting.

### 05.13 — The Exception Has an Appointment

Scene 093 of 400 · Complication · CURRENT RULES · Mix: garden + cosmos + town

**Setup.** Three frozen application cards form a triangle around a central care pad. They belong to the puddle, leaf insect, and moonbeam, none of whom fits the office's old residency form.

**Puzzle.** MELT all three separated cards in any order to enable the central WARM pad. Hold 25–35° and 15–30% pressure there, then FREEZE the enabled broad charter-display base beneath it.

**Payoff.** Quill replaces the form's species boxes with a blank line reading 'tell us about yourself.' The stack of exception paperwork becomes significantly shorter.

### 05.14 — Weights and Measures and Biscuits

Scene 094 of 400 · Complication · FUTURE: BALANCE · Mix: kitchen + town

**Setup.** An optional inspection bench has a fixed water-collection pan left and a rectangular ice-counterweight footprint right. A scale indicator compares their masses.

**Puzzle.** With BALANCE enabled, FREEZE the counterweight, then FILL the opposite pan to its calibrated capacity. Matching masses activates a separate stationary certification pad; WARM it at 20–35° and 15–25% pressure. No target rides a moving pan.

**Payoff.** Inspector Pin certifies one municipal biscuit as 'fairly shared.' The ordinary café and all later services remain open without the experimental scale.

### 05.15 — A Meeting with Enough Chairs

Scene 095 of 400 · Complication · CURRENT RULES · Mix: garden + cosmos + town

**Setup.** The proposed commons has three separated rectangular seat-block footprints along the lower board. Two frozen welcome plaques sit above them, showing a leaf and a small star.

**Puzzle.** FREEZE the three seat blocks before MELTing the enabled welcome plaques. Both plaques enable a broad FILL refreshment basin. Reposition above the narrow plaques, then change to a comfortable basin-filling stream.

**Payoff.** Residents gather in a scripted meeting. The puddle receives a seat reserved for its reflection, and Midge admits this was missing from the original seating plan.

### 05.16 — Sunshine Occupancy Inspection

Scene 096 of 400 · Complication · FUTURE: OPTICS · Mix: cosmos + garden + town

**Setup.** An optional daylight desk has a fixed rightward lamp, two rectangular mirror sockets, a frozen lamp aperture, and a detector beside Midge's signature pad.

**Puzzle.** With OPTICS, FREEZE both preoriented mirrors: upper-right at 45° backslash, lower-right at 45° slash. Light travels right, down, then left to the detector. MELT the aperture; actual detection enables WARM at 25–35° and 15–30% pressure.

**Payoff.** Sunshine lands on Midge's picnic napkin. Inspector Pin certifies an excellent place for lunch.

### 05.17 — The Public Notice Is Good News

Scene 097 of 400 · Synthesis · CURRENT RULES · Mix: garden + kitchen + cave + town

**Setup.** Three frozen notice strips span the wall over three corresponding care pads. Their pictograms represent garden hours, café service, and quiet cave visits, with each branch clearly connected by a printed line.

**Puzzle.** MELT each strip, then WARM its enabled pad: garden 20–30°/10–25% pressure, café 35–45°/20–35%, cave 25–35°/15–30%. Complete the branches in any order, moving across the three distinct station heights.

**Payoff.** The notices announce free shade, shared crumbs, and welcome echoes. Quill adds a fourth handwritten notice: 'It is fine to ask us things.'

### 05.18 — One Square, Several Kinds of Neighbor

Scene 098 of 400 · Synthesis · CURRENT RULES · Mix: garden + cosmos + town

**Setup.** The commons bench holds a watering basin, two rectangular table-block footprints, a frozen route plaque, and a stationary house-light turbine. The plaque stands above the other stations.

**Puzzle.** FILL the basin, FREEZE both table blocks, and MELT the route plaque in any order. All four preparations enable the final SPIN turbine. Plan the temperature changes and keep access above the high plaque.

**Payoff.** A scripted reveal turns the organizer into a shared square. The leaf insect supplies shade while the moonbeam volunteers for the evening shift.

### 05.19 — The Last Unnecessary Form

Scene 099 of 400 · Synthesis · CURRENT RULES · Mix: town

**Setup.** Quill's document has two overlapping ice panels above an active basin. An archive-box footprint stands left of this stack; a document-care pad waits on the right.

**Puzzle.** FREEZE the archive independently. In the other branch, MELT openings through both panels so later droplets FILL the basin, or pour from its open side. Finish both panels and basin; these plus the archive enable WARM at 20–30° and 10–25% pressure.

**Payoff.** The form requests permission to enjoy the square. Quill files it under 'ideas we have kindly outgrown.'

### 05.20 — Citizens of the Welcome Mat

Scene 100 of 400 · Finale · CURRENT RULES · Mix: town + garden + kitchen + cosmos

**Setup.** Midge, Quill, and Pin frame the new commons. A frozen charter panel stands above a welcome basin and display-block footprint; two signature-care pads flank the group.

**Puzzle.** MELT the charter, then FILL the basin and FREEZE the display block in either order. Both enable WARM on Quill's pad at 20–30°/10–25% pressure and Midge's at 35–45°/25–40%. Complete both signatures.

**Payoff.** The charter unfolds: 'If you are here, pull up a chair.' Neighbors sign with footprints, leaves, reflections, and one very carefully measured biscuit crumb.

<a id="level-06"></a>

## Level 06 — The Great Pudding Republic

**Premise.** President Wobble the pudding, Captain Crumb the biscuit, and Sprinkle the jellybean organizer want desserts to choose their own place on the menu. The squad helps their tiny pantry republic invite every course to a shared breakfast.

**Story arc.** Scenes 01–04 establish the assembly kitchen; 05–08 reconcile different dessert needs; 09–12 welcome savory, garden, cave, and cosmic guests; 13–16 prepare the meal, with independent optional mold and syrup experiments; 17–19 write an inclusive menu; 20 serves breakfast together.

**Signature.** Custard yellow, berry red, and toasted biscuit brown; big legible recipe cards above fixed service rectangles; visibly contrasting care temperatures; layered ice windows over cake illustrations; and rectangular construction blocks decorated as serving furniture. Edible characters change pose only in scripted presentation.

**Reusable art kit:** President Wobble pudding expressions, sash, and plate poses; Captain Crumb biscuit poses and crumb moustache; Sprinkle jellybean organizer poses and ribbon accessories; Modular pantry shelves, assembly counter, and breakfast-table scenery; Recipe placards, course badges, invitation cards, and dessert portrait tokens; Rectangular mold frames, preparation basins, platter blocks, and whisk-turbine shells; Reusable berry, wafer, icing, cocoa, and sugar-crystal overlays; Savory guest silhouettes, breakfast crockery, and scripted wobble and serving animations.

### 06.01 — Pudding Files a Petition

Scene 101 of 400 · Introduction · CURRENT RULES · Mix: kitchen + town

**Setup.** President Wobble's petition is trapped behind a rectangular frost panel on the pantry noticeboard. A caramel-signature care pad sits low to the right.

**Puzzle.** MELT the petition panel to enable the signature WARM target. Reposition above the pad and hold 25–40° and 15–30% pressure; the pudding himself is an illustrated witness, not a temperature target.

**Payoff.** The petition reads 'BREAKFAST IS ALSO A TIME.' Captain Crumb signs with a neatly detached crumb and immediately asks whether that counts as punctuation.

### 06.02 — A Platform for the Wobble

Scene 102 of 400 · Introduction · CURRENT RULES · Mix: kitchen + town

**Setup.** Two broad rectangular serving-plinth footprints occupy the assembly counter. Wobble's frozen speaking-card plaque sits higher between them, with open nozzle room above it.

**Puzzle.** FREEZE both serving blocks in either order, then MELT the enabled speaking-card plaque. Completed blocks stay stable when the hose turns hot; the president's climb happens afterward in presentation.

**Payoff.** Wobble takes the finished podium in a cutaway and delivers a powerful opening wobble. Sprinkle records it in the minutes as unanimous enthusiasm.

### 06.03 — Jelly in the Public Interest

Scene 103 of 400 · Introduction · CURRENT RULES · Mix: kitchen

**Setup.** Sprinkle has prepared two marked liquid-service basins: a broad jelly tray and a tall narrow tasting cup. A frozen recipe tile sits between them.

**Puzzle.** MELT the recipe to enable both FILL targets. Supply positive-temperature water in either order, moving above the tall cup for an easy downward stream. The finished dessert colors appear as scripted dressing on completed basins.

**Payoff.** The reveal presents one enormous public jelly and a tiny quality-control portion. Captain Crumb gives both a solemn thumbs-up with the same very small thumb.

### 06.04 — Whisking Up a Majority

Scene 104 of 400 · Introduction · CURRENT RULES · Mix: kitchen + town

**Setup.** A stationary whisk-drive turbine and custard-care pad occupy opposite counter ends. Wobble's assembly spoon hangs between them, ready for the shared presentation.

**Puzzle.** Both branches start active. SPIN the turbine with water above 0° and pressure at least 70%; WARM custard at 30–45° and 15–30% pressure. Choose either first, then cross the counter and retune. Both completions trigger the reveal.

**Payoff.** The whisk performs a scripted flourish. Sprinkle announces that the custard has reached consensus on being pleasantly smooth.

### 06.05 — Minutes Between Cake Layers

Scene 105 of 400 · Remix · CURRENT RULES · Mix: kitchen + cave

**Setup.** Two rectangular ice panels overlap vertically over a layer-cake archive. A small document-care pad waits below and to the left, framed by decorative wafer shelves.

**Puzzle.** Begin a central opening in the upper MELT panel to reach the lower one with later droplets. Finish clearing both, then WARM the enabled archive pad at 20–30° and 10–25% pressure.

**Payoff.** The recovered founding minutes consist mostly of a drawing of a spoon. Wobble proposes adding a fork so future historians can see the range of debate.

### 06.06 — Custard and Cocoa Agree to Disagree

Scene 106 of 400 · Remix · CURRENT RULES · Mix: kitchen + town

**Setup.** A custard-care pad sits low on the left; a cocoa-service pad sits higher on the right. Their recipe cards show clearly different ranges, with a shared platter footprint below.

**Puzzle.** WARM custard at 20–30° and 10–25% pressure, cocoa at 45–60° and 30–45%. Either can finish first. Both enable FREEZE on the broad platter block, adding a final cold-setting change.

**Payoff.** The two representatives receive separate cups on one shared platter. Sprinkle writes 'agreement does not require identical toppings' into the breakfast proposal.

### 06.07 — The Biscuit Accessibility Amendment

Scene 107 of 400 · Remix · CURRENT RULES · Mix: kitchen + town

**Setup.** Captain Crumb's crumbly invitation sits behind a frozen label above a preparation basin. Across the counter, another frozen label sits above a rectangular seating-block footprint.

**Puzzle.** MELT each label to enable its branch. FILL the preparation basin and FREEZE the seating block in either order. Both enable a fixed invitation-care pad requiring WARM at 20–35° and 10–25% pressure.

**Payoff.** The invitation gains a large, easy-to-read crumb symbol. Captain Crumb approves a seat that does not require climbing a fork to reach it.

### 06.08 — Three Seats for One Éclair

Scene 108 of 400 · Remix · CURRENT RULES · Mix: kitchen + town

**Setup.** An extremely long éclair is painted behind three separated rectangular seat-block footprints at ascending heights. A frozen nameplate panel sits at the far right.

**Puzzle.** FREEZE all three blocks, moving above each outline to cover its rectangle. Their completion enables MELT on the nameplate. The assembled seating is a stable authored construction, with the éclair's placement reserved for the cutaway.

**Payoff.** The éclair settles across all three seats and introduces three equally polite opinions about napkins. Wobble grants it one name tag with unusually generous margins.

### 06.09 — The Savory Ambassador

Scene 109 of 400 · Crossover · CURRENT RULES · Mix: kitchen + town

**Setup.** A soup dumpling arrives at the dessert assembly. A frozen guest card stands above a broad rinse basin, beside two fixed care pads labeled wrapper and welcome tea.

**Puzzle.** MELT the guest card, then FILL the enabled basin. This enables WARM on wrapper at 25–35°/15–25% pressure and tea at 40–50°/25–40%. Complete those two pads in either order.

**Payoff.** The dumpling is delighted to discover breakfast need not be sweet. Captain Crumb offers an honorary sprinkle, which is graciously worn as a hat.

### 06.10 — Strawberries on the Steering Committee

Scene 110 of 400 · Crossover · CURRENT RULES · Mix: garden + kitchen

**Setup.** Three frozen garden-delegation name tiles form a diagonal above a watering basin. A berry-care pad waits right, outlined separately from decorative leaves.

**Puzzle.** MELT all three tiles in any order, then FILL the enabled basin. Filling enables WARM on the berry-care pad at 20–30° and 10–25% pressure. Move above the higher tiles instead of aiming through the leaf artwork.

**Payoff.** Three strawberry delegates appear in a scripted reveal, each wearing the same enormous sunhat. Sprinkle assigns them the sensible task of choosing a picnic spot.

### 06.11 — Sugar Crystals Join the Chorus

Scene 111 of 400 · Crossover · CURRENT RULES · Mix: cave + kitchen

**Setup.** A cave sugar-crystal choir occupies the backdrop. Two broad frozen score tiles flank a narrow central turbine; beneath them, three rectangular music-stand footprints sit in a shallow staircase.

**Puzzle.** MELT both score tiles to enable the FREEZE stands. Complete the stands, then SPIN the central turbine with positive-temperature water and high pressure. The central target contrasts with the widely separated preparations.

**Payoff.** The choir sings only in the reveal, producing a wonderfully crunchy harmony. Captain Crumb volunteers for the percussion section and is issued a napkin.

### 06.12 — Sprinkles from the Outer Pantry

Scene 112 of 400 · Crossover · CURRENT RULES · Mix: cosmos + kitchen

**Setup.** A cosmic parcel presents two thin frozen strips above an active wide collection basin. A fixed starlight-label care pad waits separately on the right.

**Puzzle.** Use hot water to start openings in the two MELT strips, allowing subsequent droplets to reach the FILL basin beneath them. Finish both strips and the basin; together they enable WARM at 30–40° and 15–30% pressure.

**Payoff.** The parcel opens in a cutaway to reveal star-shaped sprinkles and a note requesting directions to breakfast. Sprinkle practices a suitably cosmopolitan wave.

### 06.13 — A Spoonful of Everybody

Scene 113 of 400 · Complication · CURRENT RULES · Mix: kitchen + town

**Setup.** Three fixed tasting pads make a tall zigzag: jelly at upper left, cocoa at center right, custard at lower left. A blank menu-display footprint sits along the bottom.

**Puzzle.** WARM jelly at 15–25°/10–20% pressure, cocoa at 45–60°/35–50%, and custard at 25–35°/15–30%. Choose an order that makes the setting changes comfortable. All three enable FREEZE on the long menu-display block.

**Payoff.** The tasting notes disagree completely, so Wobble places all three dishes on the menu. The blank display now has enough room for every opinion.

### 06.14 — The Mold Learns to Let Go

Scene 114 of 400 · Complication · FUTURE: PHASE · Mix: kitchen

**Setup.** An optional recipe bench holds a reversible rectangular ice-mold footprint around a fixed preparation basin. An unmolding-care pad waits beside three state pictograms.

**Puzzle.** With PHASE enabled, FREEZE the mold, FILL its enabled basin, then MELT that same completed mold back open. Reversing the construction state enables the separate WARM release pad at 25–35° and 15–25% pressure.

**Payoff.** A perfectly formed pudding slides onto a plate in the cutaway and thanks the mold for its personal growth. Ordinary serving blocks support every later meal.

### 06.15 — The Icing Is a Public Service

Scene 115 of 400 · Complication · CURRENT RULES · Mix: kitchen + town

**Setup.** Three independent icing basins form a descending staircase, each beside a frozen recipe strip. A shared stationary whisk turbine sits bottom right.

**Puzzle.** MELT each recipe strip to enable only its neighboring FILL basin. Complete the three branches in any order, moving above each basin instead of assuming liquid flows between them. All three filled basins enable the final SPIN turbine.

**Payoff.** The reveal presents three icing colors with equal-sized serving spoons. Captain Crumb wears all three and calls his design 'a very inclusive moustache.'

### 06.16 — The Syrup Scenic Route

Scene 116 of 400 · Complication · FUTURE: FLOW · Mix: kitchen + garden

**Setup.** An optional syrup-colored water channel winds to a far upper basin. A plugged overflow spillway returns toward a nearer lower basin.

**Puzzle.** With FLOW, feed the inlet until the far basin fills, enabling MELT on its spillway plug. Open it and keep feeding: surplus inflow now crosses the fixed spillway into the near basin. Only connected-channel inflow counts; filled basins retain progress and the far route stays open.

**Payoff.** Two pancakes receive syrup and a tiny route map. Mallow's diner receives an invitation to compare breakfast plumbing.

### 06.17 — A Menu Without a Border

Scene 117 of 400 · Synthesis · CURRENT RULES · Mix: kitchen + town

**Setup.** The menu is illustrated as three columns. Each contains a frozen heading above its own care pad: sweet on the left, savory in the middle, and undecided on the right.

**Puzzle.** MELT each heading, then WARM its pad: sweet 20–30°/10–25% pressure, savory 40–50°/25–40%, undecided 30–40°/15–30%. Complete branches in any order. All six targets are required; no food preference is treated as the correct choice.

**Payoff.** The headings become 'try this,' 'or this,' and 'take your time.' Sprinkle awards the undecided column a particularly comfortable chair.

### 06.18 — The Breakfast Table Has Extensions

Scene 118 of 400 · Synthesis · CURRENT RULES · Mix: garden + cave + cosmos + kitchen

**Setup.** Two rectangular table-extension footprints sit at opposite ends of the counter. A frozen guest-list strip hangs above an active narrow water-service basin in the central gap.

**Puzzle.** FREEZE both extensions. Switch hot to open the MELT guest-list strip, letting droplets reach the central FILL basin; finish both. All preparations enable WARM on the table-service pad at 25–40° and 15–30% pressure.

**Payoff.** The scripted table expands to seat the dumpling, strawberries, crystal choir, and star visitors. Wobble realizes the republic is now larger than its original shelf.

### 06.19 — The Old Menu Gets a Day Off

Scene 119 of 400 · Synthesis · CURRENT RULES · Mix: kitchen + town

**Setup.** The old 'DESSERT LAST' menu stands behind three slim frozen panels side by side. A wide invitation-care pad below them shares a printed arrow with a small display-block footprint.

**Puzzle.** MELT all three panels from their separated tops, finishing each completely. This enables WARM on the invitation pad at 20–35° and 10–25% pressure; then FREEZE the display block.

**Payoff.** Wobble turns the old menu over and writes a breakfast invitation on its blank back. Captain Crumb suggests keeping the useful paper and retiring only the bossy sentence.

### 06.20 — Breakfast Belongs to the Table

Scene 120 of 400 · Finale · CURRENT RULES · Mix: kitchen + garden + town + cosmos

**Setup.** Wobble, Crumb, and Sprinkle wait behind a full-width breakfast counter. Two water-service basins flank a frozen welcome panel; a dotted centerpiece footprint and a stationary whisk turbine occupy the upper stations.

**Puzzle.** FILL both basins and MELT the welcome panel in any order. These enable FREEZE on the centerpiece, then the final SPIN turbine. Reposition above the high stations while changing settings.

**Payoff.** The scripted breakfast welcomes every course. Wobble's sash becomes a shared table runner, leaving enough room for Captain Crumb's beautifully punctuated signature.

<a id="level-07"></a>

## Level 07 — Fossilbean Preschool

**Premise.** Principal Fern, a triceratops in reading glasses, runs a nursery for very small dinosaurs with very large feelings. Pebble the ankylosaur and Dapple the diplodocus are preparing their first family open day.

**Story arc.** Learn the nursery's care stations, help the children become classroom helpers, visit neighboring kitchens and caves, rehearse together, and assemble an open-day portrait that welcomes every shape of family. Optional playground experiments enrich the day without gating the finale.

**Signature.** Pastel fossil blocks, huge dotted construction outlines beside tiny belongings, contrasting care temperatures, and children's increasingly elaborate attempts to help. Dinosaur actions and classroom transformations are scripted completion presentations unless a scene declares a system dependency.

**Reusable art kit:** Triceratops principal kit: glasses, cardigan, clipboard, proud and puzzled poses; Small dinosaur cast kit: ankylosaur Pebble, diplodocus Dapple, pterosaur classmates, interchangeable expression and parent variants; Nursery furniture kit: low cubbies, giant coat hooks, washable mats, cots, padded fossil blocks; Care-station kit: leaf bowls, thermometers, milk cups, warming pads, labeled turbine fans; Playground kit: nest outlines, footprints, sand-table fossils, mobile arms, balance beam; Open-day decoration kit: crayon portraits, handmade badges, leaf bunting, family-photo backdrop.

### 07.01 — A Name Tag for a Neck

Scene 121 of 400 · Introduction · CURRENT RULES · Mix: town

**Setup.** Dapple's scarf hangs over an iced name badge in the right cubbies. Principal Fern waits beside a cold badge stamper at upper left.

**Puzzle.** MELT the badge ice at 40°. Its completion enables the left stamper; WARM that station within 30–40° and 20–40% pressure. Reposition between the low badge and the higher stamper instead of aiming through the decorative scarf.

**Payoff.** Fern stamps Dapple's badge and attaches it halfway up her neck. Dapple proudly bends into the attendance photograph.

### 07.02 — Three Leaves, One Lunch

Scene 122 of 400 · Introduction · CURRENT RULES · Mix: kitchen + garden

**Setup.** Pebble has arranged three leaf bowls in a broad triangle. The central lunch warmer carries a sleepy leaf icon, while the two side bowls show simple water-drop marks.

**Puzzle.** FILL both side basins with 20° water in either order. Together they enable the center WARM target, requiring 35–45° and 20–35% pressure. Shift the nozzle above each basin; decorative stems do not route water between them.

**Payoff.** The bowls gain bright little leaf lunches. Pebble serves Fern a single leaf on an absurdly large plate.

### 07.03 — The Nap Nest Committee

Scene 123 of 400 · Introduction · CURRENT RULES · Mix: cave

**Setup.** Two dotted nest pads lie beneath a sleeping-volcano mural: Dapple's long rectangle and Pebble's compact square. A blanket warmer stands between them.

**Puzzle.** FREEZE both nest footprints at −20°, choosing either order and moving along Dapple's wider outline. Completing both enables the blanket WARM target at 25–35° and 20–40% pressure. The finished pads remain stable during warming.

**Payoff.** A cutaway adds cushions to the pads. Both children curl up; Fern falls asleep holding the official nap agenda.

### 07.04 — An Extremely Small Breeze

Scene 124 of 400 · Introduction · CURRENT RULES · Mix: town

**Setup.** A giant fan overlooks Pebble's paper windmill. Ice covers its service label low left; its exposed turbine sits high right with clear aiming space above.

**Puzzle.** MELT the label patch at 40° to enable the turbine. SPIN it with 20° water at 80% pressure. The change from clearing ice to driving the marked turbine is the lesson; the paper windmill is completion animation.

**Payoff.** The giant fan turns lazily. Pebble's paper windmill makes one triumphant revolution and receives a classroom-helper badge.

### 07.05 — Drips for the Class Fern

Scene 125 of 400 · Remix · CURRENT RULES · Mix: garden

**Setup.** The class fern's basin sits below a wide suspended ice rectangle. Dapple has drawn a raincloud around the ice for an indoor weather lesson.

**Puzzle.** Use 40° water to MELT a narrow opening over the basin, letting later drops FILL it through the opening. These targets have no prerequisite link: real droplet access creates the connection. Finish clearing the remaining marked ice to complete the scene.

**Payoff.** The watered plant unfolds a leaf shaped like Principal Fern's glasses. Dapple records the forecast as 'teacher-shaped.'

### 07.06 — Mittens for a Tail Club

Scene 126 of 400 · Remix · CURRENT RULES · Mix: town

**Setup.** Pebble's mitten is iced into the left cubby above a drying pad. Dapple's dotted boot rack and sock warmer occupy the right cubby.

**Puzzle.** Complete either branch first: MELT the left mitten ice at 40°, then WARM its drying pad at 30–40°/20–35%; or FREEZE the right rack at −20°, then WARM its sock pad at 40–50°/35–50%. Each pad requires only its own branch's first target.

**Payoff.** Everyone gains cozy accessories. Pebble solemnly puts the oversized mitten on his tail, exactly as intended.

### 07.07 — One Step per Little Foot

Scene 127 of 400 · Remix · CURRENT RULES · Mix: town + kitchen

**Setup.** Three dotted step blocks rise toward a marked handwashing basin on the right. The children wait beneath a handwashing mural throughout play.

**Puzzle.** FREEZE the low, middle, then high footprint at −20°, with each block requiring the previous one. All three enable the sink FILL target at 20°. Move the nozzle directly between rectangles; the stairs do not redirect the stream.

**Payoff.** In a cutaway, the children climb their new steps to wash. Dapple uses the entire staircase to wash one foot.

### 07.08 — The Blanket Is a Map

Scene 128 of 400 · Remix · CURRENT RULES · Mix: garden + kitchen

**Setup.** Four care pads occupy a blanket backdrop's corners: Pebble's sunny patch, Dapple's shady patch, an egg pillow, and Fern's tea corner, linked by crayon arrows.

**Puzzle.** WARM Pebble's pad at 40–50°/40–55% and Dapple's at 25–35°/20–35% in either order. Both enable the egg pillow FREEZE footprint at −20°. That enables Fern's tea-basin FILL at 20°; the drawn lines are prerequisite cues, not channels.

**Payoff.** The blanket becomes a classroom picnic map. Fern discovers the children have reserved the biggest square for her teacup.

### 07.09 — Pancake with a Passport

Scene 129 of 400 · Crossover · CURRENT RULES · Mix: kitchen + town

**Setup.** The kitchen cart holds an iced pancake upper left, dotted serving plinth lower right, and cold griddle between. Dapple has made breakfast a passport.

**Puzzle.** MELT the pancake's ice rectangle at 40° and FREEZE the plinth footprint at −20° in either order. Both enable the griddle WARM target at 50–60° and 25–40% pressure. Reposition to keep the independent cold and warm tasks visually distinct.

**Payoff.** A scripted serving reveals a leaf pancake on its plinth. Fern stamps its passport 'admitted to tummy.'

### 07.10 — Bedtime Under the Stalactites

Scene 130 of 400 · Crossover · CURRENT RULES · Mix: cave

**Setup.** The cave reading nook has an iced book panel above a lantern warmer, plus dotted seat cushions in both lower corners. Stalactites decorate the backdrop.

**Puzzle.** MELT the book panel at 40° to enable the lantern WARM target at 35–45°/20–35%. Independently FREEZE both seat footprints at −20°. Completing the lantern and both seats ends the scene; cave scenery neither blocks droplets nor threatens the class.

**Payoff.** Fern opens the book in a cutaway. The cave's illustrated bats turn out to be attending the same bedtime story.

### 07.11 — The Moon Needs a Booster Seat

Scene 131 of 400 · Crossover · CURRENT RULES · Mix: cosmos + town

**Setup.** A visiting moon mascot waits beside a squat planetarium projector. Its dotted booster-seat footprint lies low left; the projector turbine sits high right, above a star-shaped water basin.

**Puzzle.** FREEZE the booster footprint at −20°, then FILL the independent star basin with 20° water. Both enable the projector SPIN target at 20° and 80% pressure. Reach the turbine from above its own rectangle; the displayed orbit is decorative.

**Payoff.** The seated moon receives a paper crown. The projector shows Pebble's constellation: six stars connected into a potato.

### 07.12 — A Garden for Imaginary Teeth

Scene 132 of 400 · Crossover · CURRENT RULES · Mix: garden

**Setup.** Three pretend-tooth pots line the garden bench. Ice covers the central basin; outer basins remain exposed. Pebble holds a cardboard seed packet.

**Puzzle.** FILL the exposed basins at 20° in either order. MELT the central slab at 40°, then FILL the center basin; it is enabled from the start, so an early hole can admit useful drops. Complete all three basins and the slab.

**Payoff.** Three tooth-shaped flowers pop up in the ending animation. Pebble beams; Fern labels them 'definitely not for biting.'

### 07.13 — Parents of Several Sizes

Scene 133 of 400 · Complication · CURRENT RULES · Mix: town

**Setup.** An iced invitation stack sits between two dotted portrait stands: Pebble's broad low stand and Dapple's tall narrow one. A welcome warmer occupies the center.

**Puzzle.** MELT the invitations at 40° to enable both stand footprints. FREEZE each at −20° in either order, distributing spray across the wide stand and repositioning for the tall one. Both stands enable a welcome WARM pad at 30–40°/20–40%.

**Payoff.** The invitations unfold into different-sized welcome signs. Fern discovers that every family has drawn itself with the same enormous smile.

### 07.14 — Inside Voices, Outside Fan

Scene 134 of 400 · Complication · CURRENT RULES · Mix: town + garden

**Setup.** The rehearsal corner has a large turbine left, a delicate microphone warmer right, and a dotted music stand below. Crayon arrows show preparation branches.

**Puzzle.** SPIN the fan at 20°/80% and FREEZE the stand at −20° in either order. Both enable the microphone WARM target at 30–40° and 15–30% pressure. Lower pressure deliberately before servicing the microphone; no sound-level simulation is involved.

**Payoff.** The fan flutters leaf sheet music while the microphone lights. Pebble whispers a speech so proudly that Fern applauds before it starts.

### 07.15 — A Fair Share of Seesaw

Scene 135 of 400 · Complication · FUTURE: BALANCE · Mix: garden

**Setup.** An optional playground beam has a fixed three-unit dinosaur one arm-length left of its pivot. A one-unit ice-seat footprint sits three arm-lengths right.

**Puzzle.** FREEZE the right seat at −20°. BALANCE must give the completed ice actual mass and let its equal opposing torque level the beam. The success condition is a resting level beam, with no deadline; this experiment needs physical supports and weights.

**Payoff.** Fern explains fairness with a picture card. The smallest dinosaur gets the grandest seat and offers the model dinosaur a biscuit.

### 07.16 — The Dress Rehearsal Has Socks

Scene 136 of 400 · Complication · CURRENT RULES · Mix: town

**Setup.** Three costume cubbies pair iced sock patches with warming pads. Pebble's pad shows sun, Dapple's shade, and Fern's a teacup.

**Puzzle.** MELT all three sock patches at 40°, in any order; each enables only its own pad. WARM Pebble's at 40–50°/30–45%, Dapple's at 25–35°/20–35%, and Fern's at 35–45°/20–35%. Group similar settings or finish each cubby before moving on.

**Payoff.** The costumes gain clean warm socks. Fern wears hers over her horns because the children insist that is formal dress.

### 07.17 — The Leaf Orchestra Tuning

Scene 137 of 400 · Synthesis · CURRENT RULES · Mix: garden + town

**Setup.** Dapple's stage has an iced song card at center, instrument basin low left, dotted music stand low right, and fan turbine beside the curtain.

**Puzzle.** MELT the song card at 40° to enable the bowl FILL and stand FREEZE targets. Complete those branches at 20° and −20° respectively; together they enable the fan SPIN at 20°/80%. All performers remain scripted presentation.

**Payoff.** The completed stage plays a gentle leaf-rustling flourish. Dapple bows so deeply that her paper conductor hat lands on Pebble.

### 07.18 — The Mobile Makes the Rounds

Scene 138 of 400 · Synthesis · FUTURE: MOTION · Mix: cosmos + town

**Setup.** An optional mobile carries three blanket-warmer targets on a slowly rotating arm. All targets remain reachable; an iced start plaque sits below.

**Puzzle.** MELT the plaque at 40° to start deterministic MOTION. WARM each circulating target within 30–40°/20–40%, following it with the nozzle. There is no deadline or reset between revolutions; completed targets stay complete while the remaining targets keep moving.

**Payoff.** The mobile stops for a cutaway showing three tiny plush dinosaurs tucked into blanket hammocks. Fern awards it an honorary nap diploma.

### 07.19 — Helper Badges for the Helpers

Scene 139 of 400 · Synthesis · CURRENT RULES · Mix: kitchen + town

**Setup.** Fern's thank-you desk has an iced badge sheet above a basin left, plus a dotted display frame and cold ribbon warmer right.

**Puzzle.** MELT a hole through the badge sheet at 40° to begin FILLING the enabled basin below, then finish both targets. Separately FREEZE the frame at −20°. The basin and frame together enable the ribbon WARM target at 30–40°/20–35%.

**Payoff.** Fern receives a gigantic 'excellent grown-up' badge. Its ribbon was measured by Dapple, so the children wrap it around the whole classroom.

### 07.20 — Everybody Fits in the Picture

Scene 140 of 400 · Finale · CURRENT RULES · Mix: town + garden

**Setup.** An iced welcome plaque overlooks two dotted risers, a flower basin, and a camera pad. Nursery families wait in the portrait backdrop.

**Puzzle.** MELT the plaque at 40°. It enables riser FREEZE at −20° and flower-basin FILL at 20°; complete those three targets in any order. They enable the camera's WARM pad at 30–40°/15–30%, finishing with a gentle setting. Optional playground exhibits are unnecessary.

**Payoff.** Families pose comfortably on the risers. Dapple curls around the frame as a living border; Fern's huge helper badge completes the picture.

<a id="level-08"></a>

## Level 08 — Emberborough Town Hall

**Premise.** Mayor Cinder has promised a town hall welcoming residents of every size and temperature. Flint, a tiny wyvern clerk, needs the squad to turn a frozen civic fortress into a place where asking for help feels easy.

**Story arc.** Open the service desks, discover incompatible residents can be accommodated together, welcome visitors from neighboring worlds, prepare the council chamber, and celebrate a public building sized for everyone. Experimental drainage and daylight services are optional side rooms.

**Signature.** Dragon-scale brass fittings, bureaucratic objects made comically enormous, paired service stations with readable thermal needs, and visible prerequisite diagrams drawn as official paperwork. Civic machinery and residents animate in scripted payoffs unless a dependency is declared.

**Reusable art kit:** Dragon official kit: Mayor Cinder's sash, Flint's sleeve garters, modular horns, wings, scales, and citizen expressions; Municipal desk kit: queue cards, forms, stamp pads, counters, service windows, bell turrets; Dragon infrastructure kit: oversized radiators, brass turbine vents, nest inspection stamps, chimney-shaped basins; Council chamber kit: podium footprints, reversible-looking decorative signs, scaled seating, ribbon posts; Public-service experiment kit: visible drainage troughs, source basin, prism sockets, sunbeam detector plaques; Community notice kit: cave addresses, garden permits, visitor badges, hand-drawn thank-you notices.

### 08.01 — Ring for a Reasonable Dragon

Scene 141 of 400 · Introduction · CURRENT RULES · Mix: town

**Setup.** An ice-covered help bell sits on the low reception counter. Flint's cold desk pad occupies a separate rectangle above the counter's right end, beneath a sign reading 'All Questions Welcome.'

**Puzzle.** MELT the bell's ice at 40°. Completion enables Flint's WARM pad at 35–45° and 20–40% pressure. Move above the second rectangle; the counter is background art, not an obstacle.

**Payoff.** The bell gives a friendly ding. Flint climbs a scripted stack of forms and opens the enormous service window.

### 08.02 — Application for One Puddle

Scene 142 of 400 · Introduction · CURRENT RULES · Mix: town + garden

**Setup.** Mayor Cinder's first applicant is a duck dragon carrying a tiny umbrella. Two permit basins sit left and right of a cold approval stamp, each labeled with a different droplet icon.

**Puzzle.** FILL both independent basins with 20° water, in either order. Their combined completion enables the stamp WARM target at 40–50°/25–45%. Aim into each basin directly; their illustrated paperwork connection carries no liquid.

**Payoff.** Flint stamps a puddle permit. The duck dragon opens the umbrella over the paperwork and proudly stands in the pictured puddle.

### 08.03 — A Ramp for the Rump

Scene 143 of 400 · Introduction · CURRENT RULES · Mix: town

**Setup.** A dragon waits beside two dotted landing footprints: broad and low left, narrow and tall right. A desk warmer and iced chair plaque mark separate branch endings.

**Puzzle.** FREEZE either landing at −20°. The broad landing enables desk WARM at 35–45°/20–40%; the tall landing enables chair-plaque MELT at 40°. Finish local branches or group cold construction first. The finished landings form the entrance route only in the cutaway.

**Payoff.** The dragon ascends in a cutaway, sits comfortably, and reveals that the consultation concerns a very small chair.

### 08.04 — Your Number Is Quite Large

Scene 144 of 400 · Introduction · CURRENT RULES · Mix: town

**Setup.** The queue machine has a frozen number placard low left and an exposed turbine high right. A dragon family waits beneath a huge roll of ticket paper suspended in the background.

**Puzzle.** MELT the placard at 40°, then SPIN the enabled turbine at 20° and 80% pressure. Reposition above the turbine rather than treating the illustrated paper roll as a hose channel.

**Payoff.** A scripted ticket unfurls across the room. It reads '1'; the family is delighted to be first and offers everyone spare paper.

### 08.05 — The Fountain Has Office Hours

Scene 145 of 400 · Remix · CURRENT RULES · Mix: town + garden

**Setup.** The lobby's moustache fountain has two exposed basins separated horizontally beneath a dormant turbine. A frozen municipal-hours plaque sits well off to the right.

**Puzzle.** FILL the left basin at 20° to enable the turbine; SPIN it at 20°/80%. Independently MELT the hours plaque at 40° to enable the right basin's FILL target. Choose which branch to finish first; both preparations trigger the scripted fountain.

**Payoff.** The ending animates a moustache-shaped fountain spray. Flint updates the sign to 'Back, With Moustache.'

### 08.06 — Nest Permit, Guest Permit

Scene 146 of 400 · Remix · CURRENT RULES · Mix: town + cave

**Setup.** The left applicant has a dotted nest model and stamp pad; the right has an iced visitor badge and separate pad. Both wait politely.

**Puzzle.** Left branch: FREEZE the nest at −20°, then WARM its stamp at 25–35°/20–35%. Right branch: MELT badge ice at 40°, then WARM its stamp at 50–60°/35–50%. Each stamp depends only on its own preparation; choose branch order.

**Payoff.** Both receive approvals simultaneously. They exchange enthusiastic recommendations for homes with exactly opposite weather.

### 08.07 — The Three Official Teas

Scene 147 of 400 · Remix · CURRENT RULES · Mix: kitchen + town

**Setup.** A diagonal row of labeled warming stations serves Flint, Cinder, and the frost archivist. Their cups vary from thimble to bucket, but every target rectangle has clear access from above.

**Puzzle.** WARM Flint's pad at 30–40°/20–35%, Cinder's at 55–65°/40–55%, and the archivist's at 15–25°/15–30%. All three are independent. Choose an efficient temperature progression or finish by position; pressure must also match each station.

**Payoff.** A cutaway fills the cups with tea. The archivist offers Cinder a tiny biscuit balanced on an enormous saucer.

### 08.08 — Balcony for the Short Speech

Scene 148 of 400 · Remix · CURRENT RULES · Mix: town

**Setup.** A frozen speech card hangs at upper center. Two dotted podium blocks sit below, one wide and one narrow, beside the warming pad for Flint's miniature speaking trumpet.

**Puzzle.** MELT the card at 40° to enable both podium FREEZE footprints. Complete those at −20° in either order; both enable the trumpet WARM target at 35–45°/20–35%. Completed podiums remain stable while the trumpet is warmed.

**Payoff.** Flint delivers the shortest possible welcome from the tallest podium. Mayor Cinder holds up a card saying 'Excellent Length.'

### 08.09 — Records from Before Carpets

Scene 149 of 400 · Crossover · CURRENT RULES · Mix: cave + town

**Setup.** The cave archive stores two frozen address tablets at different heights. A central reading-lamp warmer lies below them. Flint has brought a feather duster larger than the entire archive doorway.

**Puzzle.** MELT both tablet rectangles at 40°, choosing either first. Together they enable the reading lamp's WARM target at 30–40°/20–35%. Reposition above each tablet; decorative cave formations do not collide with droplets.

**Payoff.** The tablets reveal ancient residents requesting softer floors. Cinder unrolls the archive's first rug, patterned with approving little dragons.

### 08.10 — Soup at the Service Window

Scene 150 of 400 · Crossover · CURRENT RULES · Mix: kitchen + town

**Setup.** The community kitchen trolley parks beneath two service windows. A common soup basin is low center; an adult-dragon warming pad sits left and a hatchling pad sits right, with clearly different thermometer cards.

**Puzzle.** FILL the common basin with 20° water. It enables both independent WARM pads: adult at 50–60°/35–50%, hatchling at 30–40°/20–35%. The basin has no narrow temperature requirement; serving temperatures belong to the pads.

**Payoff.** The cutaway serves comforting soup. Flint receives a ladle-sized bowl and uses a paperclip as a spoon.

### 08.11 — Rooftop Rights for Bees

Scene 151 of 400 · Crossover · CURRENT RULES · Mix: garden + town

**Setup.** The bee dragon's rooftop plan places a planter basin left, dotted shade shelter right, and nectar warmer centrally above the bench.

**Puzzle.** FILL the planter at 20° and FREEZE the shelter at −20° in either order. Both enable the nectar WARM target at 30–40°/20–35%. Plants, bees, and shade are presented in the completion animation, with no pollination or temperature-field simulation.

**Payoff.** Flowers open around the shelter. The bee dragon posts a tiny notice welcoming visitors who can fit through a sunflower.

### 08.12 — Visitor Parking for a Comet

Scene 152 of 400 · Crossover · CURRENT RULES · Mix: cosmos + town

**Setup.** A comet dragon waits outside the observatory annex. A dotted visitor-seat footprint lies lower left; an ice-covered sky chart lies right, beneath a separate telescope turbine target.

**Puzzle.** FREEZE the seat at −20° and MELT the chart at 40°, in either order. Both enable the telescope SPIN at 20°/80%. The telescope turns only as scripted presentation after completion; no target follows its rotation.

**Payoff.** Flint issues a visitor badge the comet wears like a tiny moon. Cinder adds a very long tail space to the parking illustration.

### 08.13 — A Desk That Asks for Help

Scene 153 of 400 · Complication · CURRENT RULES · Mix: town + kitchen

**Setup.** An iced form stack buries Flint's desk. Flanking assistant counters each pair a dotted shelf with a stamp pad; Flint's tea warmer sits below.

**Puzzle.** MELT the forms at 40°, enabling both shelves. FREEZE them at −20°; each shelf enables its own stamp WARM target at 35–45°/20–40%. Both completed stamps unlock Flint's tea WARM pad at 30–40°/20–35%.

**Payoff.** Volunteer dragons take the counters in a cutaway. Flint finally sits down, astonished that asking for help has a simple form.

### 08.14 — The Whispering Complaint Horn

Scene 154 of 400 · Complication · CURRENT RULES · Mix: town

**Setup.** An enormous ventilation turbine stands beside the public suggestion horn's small warming pad. Between them, an iced instruction card shows a large breeze arrow followed by a tiny speaking bubble.

**Puzzle.** MELT the instruction card at 40°, SPIN the enabled vent at 20°/80%, then WARM the enabled horn at 25–35°/15–30%. The final pressure drop is essential. No microphone input or sound-based objective is required.

**Payoff.** The horn opens with a polite chime. Its first suggestion is a request for a smaller suggestion horn, which Flint records enthusiastically.

### 08.15 — Rainwater on the Proper Form

Scene 155 of 400 · Complication · FUTURE: FLOW · Mix: garden + town

**Setup.** An optional source basin feeds a visible fork: left trough toward decorative paperwork, right trough toward a garden reservoir. A plug outline spans the left trough.

**Puzzle.** FREEZE the permanent left plug at −20°, then FILL the source at 20°. FLOW must route persistent overflow along the remaining connected trough into the destination reservoir. The destination completes only from connected flow, requiring new channel and basin logic.

**Payoff.** The reservoir waters a scripted rooftop flower display. Flint stamps the dry forms 'successfully not a pond.'

### 08.16 — Chairs for Every Opinion

Scene 156 of 400 · Complication · CURRENT RULES · Mix: town + cave

**Setup.** The council chamber has three dotted seat-platform footprints arranged in a shallow arc. Above each is a labeled speaking-pad target; Cinder's empty mayoral chair is conspicuously the same size as everyone else's.

**Puzzle.** FREEZE all three platforms at −20° in any order. Each enables its corresponding WARM speaking pad: frost resident 20–30°/15–30%, Flint 30–40°/20–35%, Cinder 50–60°/35–50%. The three branches stay independent and require no speaking schedule.

**Payoff.** Residents take their seats in a cutaway. The tiniest speaker receives the largest round of illustrated applause.

### 08.17 — Minutes with Tiny Footprints

Scene 157 of 400 · Synthesis · CURRENT RULES · Mix: town + kitchen

**Setup.** Flint's transcription warmer sits high left, a notice-board footprint stands center, and iced meeting notes occupy the right above a wash basin.

**Puzzle.** WARM the transcription pad at 30–40°/20–35% to enable board FREEZE at −20°. The board enables notes MELT at 40°; clearing those enables basin FILL at 20°. Follow the four-stage ladder across the desk, adjusting temperature between every stage.

**Payoff.** The board displays the minutes as friendly pictograms. A hatchling adds a careful footprint signature, and Cinder adds one matching stamp.

### 08.18 — Sunshine by Appointment

Scene 158 of 400 · Synthesis · FUTURE: OPTICS · Mix: cosmos + town

**Setup.** An optional daylight exhibit has a beam source, iced shutter, two descending prism footprints, and a sunshine detector beside the bench.

**Puzzle.** MELT the shutter at 40°, then FREEZE both fixed-angle prism footprints at −20°. OPTICS must refract the actual beam through both completed prisms onto the detector; detector illumination completes the exhibit. Prisms remain fixed and do not need to melt again.

**Payoff.** A real illuminated patch reaches the bench. In the cutaway, Cinder and Flint share it with a sleepy municipal cat dragon.

### 08.19 — The Department of Thank You

Scene 159 of 400 · Synthesis · CURRENT RULES · Mix: town + garden

**Setup.** Thank-you stations form a triangle: iced citizen letter above, flower basin low left, dotted pedestal low right. A separate applause turbine stands beside them.

**Puzzle.** MELT the letter at 40° to enable FILL on the flower basin at 20° and FREEZE on the pedestal at −20°. Both enable the applause SPIN target at 20°/80%. Nothing must physically balance on the pedestal during play.

**Payoff.** The turbine triggers gentle mechanical clapping. Flint discovers the letter thanks the whole office, including the cat dragon and the help bell.

### 08.20 — Town Hall, Open Wings

Scene 160 of 400 · Finale · CURRENT RULES · Mix: town + kitchen + garden

**Setup.** An iced welcome plaque overlooks two ribbon-post footprints, guest-tea warmer, and celebration turbine. Cinder and Flint wait beside the illustrated doorway.

**Puzzle.** MELT the plaque at 40°, enabling both posts. FREEZE the posts at −20°; together they enable guest-tea WARM at 30–40°/20–35%, then celebration SPIN at 20°/80%. Drainage and optics exhibits are optional and never prerequisites for this scene.

**Payoff.** The doorway unfolds into a welcoming panorama in the ending. Cinder holds one ribbon end; Flint holds the other from atop the municipal cat.

<a id="level-09"></a>

## Level 09 — The Runaway Ending Library

**Premise.** Page, a moth librarian, discovers that the library's endings have left their frozen books to look for new jobs. Endy, a walking full stop, helps the squad prepare comfortable homes for stories that no longer want the usual ending.

**Story arc.** Restore basic book care, meet misplaced endings, visit genre annexes, let characters exchange roles, build an inclusive reading room, and bind a communal book in which everyone chooses to stay. Optional reversible-page and moving-cart exhibits are side stories.

**Signature.** Warm lamplight against oversized icy pages, punctuation-shaped characters, ice windows above ink basins, and branching restoration desks. Written choices and character decisions are scripted story presentation; playable requirements remain visible target settings and prerequisites.

**Reusable art kit:** Moth librarian Page kit: spectacles, cardigan, lantern, wing poses, reading expressions; Living punctuation kit: full stop Endy, comma family, question-mark scholar, exclamation-mark usher; Story-character kit: retired paper wolf, cardboard knight, sleeping moon, folded-paper gardener; Library furniture kit: oversized open books, book carts, ladders as scenery, desks, lamps, bookplate plaques; Book-care station kit: ink basins, dotted spine molds, page-ice panels, binding turbines, labeled drying pads; Genre annex kit: cookbook trays, cave-story shelves, star atlases, seed catalogs, paper scenery inserts; Ending-room kit: modular printed ending cards, giant communal book, bookmark bunting, reversible page exhibit.

### 09.01 — The Full Stop Calls in Sick

Scene 161 of 400 · Introduction · CURRENT RULES · Mix: town

**Setup.** Endy sits beside a frozen returns label at the low desk. Page's reading-lamp warmer is higher on the right; the open book behind them ends in an embarrassingly long blank line.

**Puzzle.** MELT the returns label at 40° to enable the lamp WARM target at 30–40°/20–35%. Move to the lamp's own rectangle; the book and punctuation character are illustrated props during play.

**Payoff.** The lamp lights. Endy puts up a 'brief pause' sign, and Page offers a tiny chair rather than sending him back to work.

### 09.02 — Ink for a Fresh Beginning

Scene 162 of 400 · Introduction · CURRENT RULES · Mix: town + kitchen

**Setup.** Two dry ink basins occupy opposite ends of the repair desk. A dotted book-spine mold lies between them, with a printed diagram connecting both basins to the mold.

**Puzzle.** FILL the left and right basins with 20° water, choosing either order. Both enable the spine FREEZE footprint at −20°. The finishing animation colors the basin water as ink; neither basin physically transfers water into the mold.

**Payoff.** Page binds a blank notebook around the new spine in a cutaway. Endy writes its first word: 'Perhaps.'

### 09.03 — A Bookmark with Boundaries

Scene 163 of 400 · Introduction · CURRENT RULES · Mix: town

**Setup.** Three bookmark-stand footprints differ: wide left, tall right, short center. Each points to a local finishing station: ink cup, bookplate warmer, or iced label.

**Puzzle.** FREEZE each stand at −20° to enable its own ending: left cup FILL at 20°, right bookplate WARM at 30–40°/20–35%, center label MELT at 40°. Branches are independent; choose a local route or group matching settings across the varied rectangles.

**Payoff.** Bookmarks take their places in the ending. One reads 'You may stop here,' which Endy immediately recommends to the entire library.

### 09.04 — Please Turn the Page Politely

Scene 164 of 400 · Introduction · CURRENT RULES · Mix: town

**Setup.** The page-turning machine has an ice-covered instruction panel below an exposed turbine. Page holds a paper fan beside an enormous book whose corners have frozen into decorative curls.

**Puzzle.** MELT the instruction panel at 40°, then SPIN the enabled turbine at 20°/80%. The turbine is stationary throughout play. Page turning happens only after completion, so no moving target or paper simulation is required.

**Payoff.** The machine turns one page with exaggerated care. Underneath is a smaller book asking to be turned equally politely.

### 09.05 — A Window in Chapter Twelve

Scene 165 of 400 · Remix · CURRENT RULES · Mix: cosmos + town

**Setup.** A page-shaped ice rectangle hangs above a basin labeled 'new possibilities.' Endy points to a vertical carving guide framed by curled-paper scenery.

**Puzzle.** MELT a window along the guide at 40°, allowing later drops to FILL the already-enabled basin. Complete the rest of the marked ice as well. The useful opening comes from local erosion, with no hidden page-choice input.

**Payoff.** The basin becomes a painted ocean in the ending. A paper boat carries the former final sentence off for a well-earned holiday.

### 09.06 — The Wolf Applies for Gardening

Scene 166 of 400 · Remix · CURRENT RULES · Mix: garden + town

**Setup.** A retired paper wolf waits between a frozen gardening certificate on the left and a dotted potting-bench footprint on the right. A seedling basin sits low center beneath a watering-can illustration.

**Puzzle.** MELT the certificate at 40° and FREEZE the bench at −20° in either order. Together they enable the seedling FILL target at 20°. The wolf changes occupations only in the payoff; it is never a moving goal.

**Payoff.** The wolf puts on flower-print gloves. Page changes its shelf card from 'terrifying' to 'excellent with begonias.'

### 09.07 — Warm Regards, Different Degrees

Scene 167 of 400 · Remix · CURRENT RULES · Mix: town

**Setup.** Three letter-ending pads line the desk: a shy 'best wishes,' a cheerful 'see you soon,' and a grand 'forever yours.' Their thermometer and pressure cards differ visibly.

**Puzzle.** WARM the shy pad at 25–35°/15–30%, cheerful at 35–45°/25–40%, and grand at 50–60°/40–55%. All are independent. Choose spatial order or progress from cooler to warmer, matching pressure as well as temperature.

**Payoff.** The restored endings sign three friendly letters. The grand one addresses its extravagant declaration to the library's reliably comfortable armchair.

### 09.08 — The Knight Returns the Ladder

Scene 168 of 400 · Remix · CURRENT RULES · Mix: town + cave

**Setup.** The paper knight waits beside an iced return slip. Dotted display shelves sit left and right, with a thank-you stamp below the right shelf.

**Puzzle.** MELT the slip at 40° to enable both shelves; FREEZE them at −20° in either order. Both enable stamp WARM at 30–40°/20–35%. Aim directly at each target; the decorative ladder provides neither access nor collision.

**Payoff.** The knight returns a borrowed ladder and joins the shelving team. Endy adds 'helped tidy up' as an entirely respectable heroic ending.

### 09.09 — Dessert on the Last Page

Scene 169 of 400 · Crossover · CURRENT RULES · Mix: kitchen + garden

**Setup.** The cookbook annex pairs two iced recipes with separate basins below. An oven-pad warmer sits right; the wolf holds a basket of herbs.

**Puzzle.** For each branch, MELT its recipe ice at 40° and FILL the basin below with positive-temperature water; both basins start enabled. Complete all ice and basins, then WARM the enabled oven pad at 50–60°/25–40%.

**Payoff.** The cookbook's closing illustration becomes a shared pudding. The wolf supplies mint and receives the first entirely non-alarming review of its career.

### 09.10 — The Cave Echo Wants an Epilogue

Scene 170 of 400 · Crossover · CURRENT RULES · Mix: cave + kitchen

**Setup.** A cave-story shelf holds a frozen echo caption at upper left, a dotted reading-seat outline lower right, and a cold lantern pad at center. Repeated speech bubbles decorate the walls.

**Puzzle.** MELT the caption at 40° and FREEZE the seat at −20° in either order. Both enable lantern WARM at 35–45°/20–35%. The echoes are visual dialogue in the ending, not sound-sensitive targets or timed responses.

**Payoff.** The cave's final echo adds 'and they stayed for tea.' Page sets out an extra cup for the very good listener.

### 09.11 — An Atlas for a Homesick Moon

Scene 171 of 400 · Crossover · CURRENT RULES · Mix: cosmos

**Setup.** A sleepy paper moon waits beside an iced atlas left. Its dotted pillow lies low right beneath a separate, stationary constellation-projector turbine.

**Puzzle.** MELT the atlas panel at 40° and FREEZE the pillow footprint at −20° in either order. Together they enable the projector SPIN at 20°/80%. Star patterns appear in a scripted projection; there are no optical paths or beam detectors.

**Payoff.** The atlas displays the moon's favorite constellation: a rocking chair. Endy changes the ending from 'vanished' to 'went home for a nap.'

### 09.12 — The Seed Catalog Sprouts Hope

Scene 172 of 400 · Crossover · CURRENT RULES · Mix: garden

**Setup.** The seed-catalog annex has an iced page above a central planter basin, plus exposed basins on both sides. Paper flowers curl around the backdrop.

**Puzzle.** FILL both exposed basins with 20° water. MELT a hole through the middle ice at 40° to FILL its already-enabled basin, then finish clearing the page. Basin order is free; the page physically interrupts droplets until locally eroded.

**Payoff.** The finishing animation grows flowers printed with the word 'again.' The wolf gives Page a bouquet that is also a very optimistic index.

### 09.13 — A Career Fair for Endings

Scene 173 of 400 · Complication · CURRENT RULES · Mix: town + garden

**Setup.** The wolf's iced diploma sits above a warmer left; the knight's dotted bookstand and separate warmer stand right. Endy offers encouragement between them.

**Puzzle.** Wolf branch: MELT diploma ice at 40°, then WARM its pad at 30–40°/20–35%. Knight branch: FREEZE the bookstand at −20°, then WARM its pad at 45–55°/35–50%. Complete branches in either order; each pad requires only its own preparation.

**Payoff.** The two swap cheerful recommendation letters. The wolf suggests the knight try storytime; the knight requests beginner-level gardening gloves.

### 09.14 — Exclamation Marks Learn to Whisper

Scene 174 of 400 · Complication · CURRENT RULES · Mix: town

**Setup.** A large turbine overlooks two punctuation-choir warmers: exclamation mark left, question mark right. Their different settings cards remain clearly visible.

**Puzzle.** SPIN the turbine at 20°/80% to enable both WARM pads. Service the exclamation pad at 35–45°/15–30% and the question pad at 25–35°/20–35%, in either order. Pressure changes are target conditions; choir volume is scripted presentation.

**Payoff.** The choir performs an almost silent flourish. Page applauds with her wings while Endy holds up an approving, appropriately small dot.

### 09.15 — The Page That Wants a Second Draft

Scene 175 of 400 · Complication · FUTURE: PHASE · Mix: town + kitchen

**Setup.** An optional reusable ice-page mold sits above an enabled ink basin. Pictograms show that same page being formed, opened, then formed again.

**Puzzle.** FREEZE the page at −20° to register its first imprint. PHASE then permits MELTING that completed construction at 40° so droplets can FILL the basin below. Re-FREEZE the same mold after basin completion; success requires the recorded cycle and final frozen page.

**Payoff.** The second draft replaces a lonely ending with a picnic invitation. Page files the eraser under 'useful second chances.'

### 09.16 — Long Stories Need Small Chairs

Scene 176 of 400 · Complication · CURRENT RULES · Mix: town + cave

**Setup.** Three dotted reading seats alternate wide, narrow, wide across the foreground. Two cold lamps above mark separate short-story and long-story corners.

**Puzzle.** FREEZE all three seats at −20° in any order. They jointly enable both WARM lamps: short-story corner at 30–40°/20–35%, long-story corner at 40–50°/30–45%. Finish either lamp first; neither depends on elapsed reading time.

**Payoff.** The knight reads aloud in a cutaway. Every listener finds a comfortable chair, including a very long dragon made from a single paper sentence.

### 09.17 — The Plot Thickens Comfortably

Scene 177 of 400 · Synthesis · CURRENT RULES · Mix: town + garden + cosmos

**Setup.** An iced chapter card hangs above an ink basin. A dotted binding frame sits left and cover-press warmer right, surrounded by the cast's contributed pictures.

**Puzzle.** MELT the chapter ice at 40° and FILL the already-enabled basin through the opening. Complete both, and separately FREEZE the frame at −20°. Basin and frame enable cover-press WARM at 45–55°/25–40%; finish all remaining ice as well.

**Payoff.** The shared book gains a cover showing everyone's favorite place. Endy chooses the comfortably blank space where another friend can be drawn later.

### 09.18 — The Book Cart Takes the Scenic Route

Scene 178 of 400 · Synthesis · FUTURE: MOTION · Mix: town + cosmos

**Setup.** Two optional delivery carts carry warming targets along separate horizontal tracks. A fixed turbine starts their slow movement; both tracks remain fully reachable.

**Puzzle.** SPIN the turbine at 20°/80% to activate deterministic MOTION. Follow and WARM the left cart at 30–40°/20–35% and the right at 45–55°/30–45%, in either order. There is no deadline; completed cart targets stay complete on later passes.

**Payoff.** The carts park in a scripted cutaway with everyone's book delivered. Endy's tiny pamphlet arrives ceremoniously on the largest cart.

### 09.19 — Permission to Leave a Blank

Scene 179 of 400 · Synthesis · CURRENT RULES · Mix: town

**Setup.** Two iced contributor cards flank a broad guest-book stand footprint. A dedication warmer sits below; Page intentionally left the illustrated last page partly blank.

**Puzzle.** MELT both contributor-card ice patches at 40° in either order, enabling the stand. FREEZE its broad footprint at −20°, then WARM the enabled dedication pad at 25–35°/15–30%. The blank illustration is not a missing target.

**Payoff.** Page writes 'room for whoever arrives next' beneath the blank. Endy sits beside it, pleased that finishing a book need not close its welcome.

### 09.20 — And They All Had Library Cards

Scene 180 of 400 · Finale · CURRENT RULES · Mix: town + garden + kitchen

**Setup.** The communal book has two dedication warmers, two dotted display feet, and an iced title plaque. Page's story cast gathers around the backdrop table.

**Puzzle.** WARM Page's dedication at 30–40°/20–35% and Endy's at 20–30°/15–25%, in either order. Each enables one display-foot FREEZE target at −20°. Both feet enable the title-plaque MELT at 40°; completed feet remain stable. Optional exhibits are not prerequisites.

**Payoff.** The book opens to a shared picnic. Endy places the final full stop, then scoots aside for a small 'welcome back.'

<a id="level-10"></a>

## Level 10 — Mount Oops Sports Club

**Premise.** Coach Nika, a retired sphinx, hosts a mythological sports day for Gus the minotaur, Iris the harpy, and friends who have never fitted standard sporting equipment. The squad helps turn awkward preparations into games everyone can enjoy.

**Story arc.** Teach equipment care, adapt familiar events to unusual bodies, borrow ideas from neighboring venues, rehearse cooperation, and stage a closing ceremony celebrating useful kindness. Optional rhythm lanes and a buoyancy demonstration do not gate the sports day.

**Signature.** Classical columns wrapped in gym mats, comically mismatched equipment, bold lane colors and measurable thermal stations, with friendly sports action reserved for scripted payoffs. Scores, races, and athlete movement are not live mechanics unless explicitly declared.

**Reusable art kit:** Myth athlete kit: sphinx coach Nika, minotaur Gus, harpy Iris, modular centaur and cyclops teammates; Athletic outfit kit: sweatbands, numbered bibs, wing sleeves, horn caps, oversized sneakers; Sports venue kit: padded columns, lane stripes, spectator benches, podium outlines, giant chalkboards; Equipment kit: hurdle frames, discus displays, starting blocks, landing pads, relay batons, score placards; Hydration and care kit: trough basins, warming pads, towel molds, turbine fans, equipment ice panels; Festival prize kit: pasta wreaths, vegetable medals, helper badges, wing-shaped ribbons; Optional exhibit kit: rhythm lane lights, untimed-mode placard, buoyant platform mold, water-height and load markers.

### 10.01 — The Sphinx Asks for a Stretch

Scene 181 of 400 · Introduction · CURRENT RULES · Mix: town

**Setup.** Nika's whistle warmer sits left of Gus's broad stretching-mat pad. Different settings cards label each; Gus already wears sweatbands on both horns.

**Puzzle.** WARM the whistle pad at 30–40°/20–35% to enable the mat. WARM the mat at 40–50°/30–45%, moving across its wider rectangle. Both temperature and pressure change between targets; solving a verbal riddle is not required.

**Payoff.** Nika sounds a tiny whistle. Gus demonstrates a splendid stretch that ends with him gently straightening a bent decorative column.

### 10.02 — Eight Cups for Four Hooves

Scene 182 of 400 · Introduction · CURRENT RULES · Mix: kitchen + town

**Setup.** Two long hydration troughs sit on opposite sides of a low drink station. A centaur teammate has brought eight cups because they were unsure whether the team counts hands or hooves.

**Puzzle.** FILL both independent trough basins with 20° water. Together they enable the central drink-pad WARM target at 25–35°/20–35%. Each trough collects direct nozzle droplets; there is no simulated connection or spill penalty between them.

**Payoff.** A cutaway distributes the cups to athletes and spectators alike. Nika declares the extra cups excellent advance planning.

### 10.03 — Starting Blocks for Sideways Feet

Scene 183 of 400 · Introduction · CURRENT RULES · Mix: town

**Setup.** Iris's narrow starting-block footprint sits high left, Gus's broad block low right. An iced lane-name plaque occupies a separate rectangle between them.

**Puzzle.** FREEZE both footprints at −20° in either order, spreading droplets across Gus's wider block. Together they enable the plaque MELT target at 40°. Completed blocks remain stable; the later hot stream cannot undo the finished equipment.

**Payoff.** The athletes take their places in a cutaway. Iris stands sideways on purpose, and Nika redraws the lane arrow to match.

### 10.04 — A Tailwind with Manners

Scene 184 of 400 · Introduction · CURRENT RULES · Mix: garden + town

**Setup.** The club's large turbine fan stands at upper right, with a frozen instruction placard lower left. Iris holds a ribbon that droops sadly beneath a backdrop of entirely decorative wind swirls.

**Puzzle.** MELT the placard at 40°, then SPIN the enabled stationary turbine at 20°/80%. The fan's wind and the ribbon's movement appear only in the completion animation; live droplets are not blown sideways.

**Payoff.** The fan gives one dignified flutter. Iris's ribbon traces a flourish that accidentally ties a bow around Nika's whistle.

### 10.05 — The Hurdle Prefers a Doorway

Scene 185 of 400 · Remix · CURRENT RULES · Mix: town + garden

**Setup.** Gus's hurdle-doorway display has two dotted padded-post footprints flanking an iced sign. A small ribbon warmer stands separately at upper right.

**Puzzle.** FREEZE the left post at −20° to enable sign MELT at 40°. Independently FREEZE the right post to enable ribbon WARM at 25–35°/15–30%. Complete either branch first or group cold work; both branches prepare the scripted doorway demonstration.

**Payoff.** The ending installs a friendly padded doorway. Gus walks through with a theatrical bow, and Iris goes around to demonstrate another excellent option.

### 10.06 — Long Jump, Longer Welcome

Scene 186 of 400 · Remix · CURRENT RULES · Mix: garden

**Setup.** Two dotted landing pads sit side by side: short and broad, long and narrow. A cold launch-board warmer stands separately at the left.

**Puzzle.** FREEZE either landing pad first at −20°, then complete the other. Together they enable launch-board WARM at 35–45°/20–40%. Choose nozzle positions for different footprint proportions; landing stability and jump distance are not simulated.

**Payoff.** A cutaway shows Gus taking a modest hop and Iris a graceful glide. Nika gives both chalk marks shaped like enthusiastic stars.

### 10.07 — Discus or Dinner Plate

Scene 187 of 400 · Remix · CURRENT RULES · Mix: kitchen + town

**Setup.** Two ice-covered equipment labels flank a dotted display-rack footprint. One label shows a discus, the other a picnic plate. Gus has thoughtfully packed sandwiches in the sporting-equipment basket.

**Puzzle.** MELT both label rectangles at 40° in either order to enable rack FREEZE at −20°. The rack then enables a towel-pad WARM target at 30–40°/20–35%. Sorting happens in the scripted reveal rather than through object dragging.

**Payoff.** Nika places the discus on its rack and the sandwiches on the plate. Gus is appointed assistant coach for refreshments.

### 10.08 — Cool Heads, Cozy Knees

Scene 188 of 400 · Remix · CURRENT RULES · Mix: kitchen + town

**Setup.** Three care pads form a triangle around the team bench: Iris's wing towel above, Gus's knee wrap lower left, and Nika's tea warmer lower right. Each has its own pressure-and-temperature card.

**Puzzle.** WARM Iris's pad at 25–35°/15–30%, Gus's at 40–50°/30–45%, and Nika's at 35–45°/20–35%. All targets are independent. Choose position order or group nearby settings; no target demands a simultaneous hold with another.

**Payoff.** The athletes settle comfortably on the bench. Nika's teacup wears a tiny team sweatband and receives an honorary roster number.

### 10.09 — Pasta Laurels for Everyone

Scene 189 of 400 · Crossover · CURRENT RULES · Mix: kitchen

**Setup.** The visiting kitchen cart has an iced wreath recipe above a water basin, a dotted medal-tray footprint on the right, and a cooking-pad warmer on the left. Gus is official noodle inspector.

**Puzzle.** MELT the recipe at 40° and FILL the enabled basin beneath through the opening, completing both. Independently FREEZE the tray at −20°. Basin and tray enable cooking-pad WARM at 50–60°/25–40%.

**Payoff.** The cutaway assembles pasta laurels with generous bow ties. Gus proudly wears his wreath slightly off-center to leave room for both horns.

### 10.10 — The Echo Relay Takes a Breath

Scene 190 of 400 · Crossover · CURRENT RULES · Mix: cave

**Setup.** Three cold baton pads descend across the cave's echo mural. A separate stationary bell turbine stands far right beneath decorative stalactites.

**Puzzle.** WARM the three baton pads left to right at 30–40°/20–35%, with each requiring the previous one. All three enable bell SPIN at 20°/80%. The relay order uses target prerequisites, not timed handoffs or sound detection.

**Payoff.** The ending shows a gentle baton exchange. The cave echo finishes its own cheer late, and Nika applauds its commitment.

### 10.11 — The Flowerbed Gets a Lane

Scene 191 of 400 · Crossover · CURRENT RULES · Mix: garden

**Setup.** Two garden planter basins flank a dotted spectator-shade footprint. A scoring-placard warmer sits above center. Iris reserved the front row for pollinators.

**Puzzle.** FILL both planters at 20° and FREEZE the shade footprint at −20° in any order. Those three targets enable placard WARM at 30–40°/20–35%. Flowers and visiting insects appear in a scripted reveal, with no live pollination objective.

**Payoff.** The flowerbed gains its own spectator sign. A bee lands on Gus's laurel in the cutaway and receives a tiny complimentary ticket.

### 10.12 — A Comet Joins the Relay

Scene 192 of 400 · Crossover · CURRENT RULES · Mix: cosmos

**Setup.** The cosmic guest station pairs an iced badge left with a dotted baton cradle low right. A stationary projector turbine overlooks the waiting comet.

**Puzzle.** MELT the badge at 40° and FREEZE the cradle at −20° in either order. Both enable projector SPIN at 20°/80%. The comet and projected stars move only in the ending; all playable target zones stay stationary.

**Payoff.** The welcome projection shows a very long relay lane. The comet hands over a tiny baton with an enormous, carefully folded ribbon tail.

### 10.13 — Equipment Exchange of the Gods

Scene 193 of 400 · Complication · CURRENT RULES · Mix: town

**Setup.** Gus's iced horn-cap label sits above his warmer left. Iris's dotted wing-sleeve rack stands beside her warmer right, each branch marked separately.

**Puzzle.** Gus branch: MELT the label at 40°, then WARM his pad at 40–50°/30–45%. Iris branch: FREEZE the rack at −20°, then WARM her pad at 25–35°/15–30%. Choose branch order; each warmer requires only its own preparation.

**Payoff.** The repaired equipment fits properly. Gus's spare horn cap becomes an excellent megaphone for Iris, who announces the snack break.

### 10.14 — The Cheer Goes Through Training

Scene 194 of 400 · Complication · CURRENT RULES · Mix: town + garden

**Setup.** Upper-corner fan turbines each overlook a smaller warming pad: ribbon handles left, Nika's whistle right. Large arrows connect each turbine to its own pad.

**Puzzle.** SPIN both turbines at 20°/80%, or finish one branch first. Each enables its own WARM pad: ribbon handles at 30–40°/20–35%, whistle at 25–35°/15–30%. The challenge is deliberately lowering pressure after each turbine, with no rhythm requirement.

**Payoff.** The ending produces a coordinated ribbon flourish. Nika's quiet whistle receives the most attentive response of the entire rehearsal.

### 10.15 — The Rhythm Lane Has Patience

Scene 195 of 400 · Complication · FUTURE: PULSE · Mix: town + cosmos

**Setup.** An optional board has three stationary baton warmers with lamps cycling left to right. An accessibility placard shows each lamp staying lit until completion.

**Puzzle.** Under PULSE, WARM each lane at 30–40°/20–35% during its lit phase; dark phases preserve progress. In untimed mode, the current lamp stays lit until that target completes, then advances. No deadline, lost lives, or extra action input is required.

**Payoff.** The lamps form a friendly applause wave. Iris and Gus perform a relay at their own pace, with Nika matching their rhythm.

### 10.16 — The Podium Refuses to Rank

Scene 196 of 400 · Complication · CURRENT RULES · Mix: town

**Setup.** Three equal-height podium footprints vary in width for different athletes. Each has a separate medal warmer above; the backdrop omits ranking numbers.

**Puzzle.** FREEZE each podium at −20° to enable its corresponding WARM pad: Gus at 40–50°/30–45%, Iris at 25–35°/15–30%, Nika at 35–45°/20–35%. Complete whole branches or group the cold work before warming; finished podiums remain stable.

**Payoff.** The cast steps up in a cutaway. Every medal reads 'made it nicer for someone,' and Gus immediately points at Iris's medal approvingly.

### 10.17 — Five Events, One Helpful Hose

Scene 197 of 400 · Synthesis · CURRENT RULES · Mix: town + kitchen + garden

**Setup.** Three rehearsal bays stay separate: iced event card and drink basin left, dotted landing mat and towel warmer center, stationary flag turbine right.

**Puzzle.** Left bay: MELT the card at 40°, enabling basin FILL at 20°. Center: FREEZE the mat at −20°, enabling towel WARM at 30–40°/20–35%. Right: SPIN the turbine at 20°/80%, enabled from the start. All three bays must finish; choose their order.

**Payoff.** The ending runs a gentle five-event montage. Gus wins a huge chalk star for remembering to bring everyone a towel.

### 10.18 — The Floating Podium Experiment

Scene 198 of 400 · Synthesis · FUTURE: BALANCE · Mix: garden + town

**Setup.** An optional basin contains a pontoon footprint with preset model-athlete load. Filling to its calibrated full-water mark floats the deck level with the dock.

**Puzzle.** FREEZE the pontoon at −20°, then FILL the basin at 20°. BALANCE must simulate the completed ice's buoyancy, fixed load, and deck height. Success requires a stable floating deck at the dock mark after filling; no connected water channels are involved.

**Payoff.** The model athletes float together. Nika labels the exhibit 'everyone rises with the occasion,' and Gus supplies model-sized towels.

### 10.19 — A Medal for the Bench

Scene 199 of 400 · Synthesis · CURRENT RULES · Mix: town + garden

**Setup.** An iced thank-you plaque hangs above the illustrated team bench. Two dotted badge stands flank it; a gentle ribbon warmer sits low center.

**Puzzle.** MELT the plaque at 40°, enabling both badge stands. FREEZE the wide and narrow footprints at −20° in either order, then WARM the jointly enabled ribbon pad at 25–35°/15–30%. The bench itself is scenery throughout play.

**Payoff.** Gus drapes a medal over the bench in a cutaway. Everyone sits down together, which Nika calls the bench's best event.

### 10.20 — The Games End with a Group Hug

Scene 200 of 400 · Finale · CURRENT RULES · Mix: town + garden + kitchen

**Setup.** Closing-ceremony equipment includes an iced team banner, two wreath-stand footprints, shared drink basin, and celebration turbine. Athletes wait around the open foreground.

**Puzzle.** MELT the banner at 40° to enable the two stands' FREEZE targets at −20° and basin FILL at 20°. Complete those in any order, then SPIN the enabled celebration turbine at 20°/80%. Neither optional experiment is a prerequisite.

**Payoff.** The ending showers paper laurels over a carefully arranged group hug. Nika's final scoreboard reads 'Everybody Helped,' including the bench.

<a id="level-11"></a>

## Level 11 — Ever After, Everywhere

**Premise.** Ada, an octopus wedding planner, and Bell, a small sentient service bell, are arranging a ceremony for Rill the cloud sprite and Moss the garden golem. Their families arrive from incompatible climates through illustrated dimensional doorways, and everyone deserves a comfortable seat.

**Story arc.** Learn the couple's wishes, build a welcoming guest plan, borrow food and decorations from neighboring worlds, resolve affectionate misunderstandings, rehearse the shared ceremony, and open a reception with room for everyone. Optional prism and reversible-ring exhibits remain separate from ceremony readiness.

**Signature.** Elegant paper place cards beside impossible guest silhouettes, paired warm and cold preparation branches, frozen lace panels above basins, and eight-armed planning diagrams. Doorways, guest travel, weather, and romantic transformations are scripted presentation unless a future dependency is stated.

**Reusable art kit:** Planner cast kit: octopus Ada with clipboard and ribbon variants, expressive sentient Bell with bow ties; Couple kit: cloud sprite Rill and garden golem Moss with joyful, shy, and ceremonial poses; Guest silhouette kit: cave crystal aunt, moon grandparent, flower cousins, steam uncle, miniature cloud family; Wedding furniture kit: variable-size seats, place-card desks, dotted ring cushions, aisle markers, arch sections; Service kit: cake trays, drink basins, warming pads, fan turbines, invitation printer, lace-ice panels; Dimensional backdrop kit: modular cave, kitchen, garden, town, and star-window frames without live portals; Celebration kit: leaf confetti, rings, ribbon spools, communal portrait frame, reusable handwritten dedication cards; Optional exhibit kit: paired fixed-angle prism sockets, beam detector place cards, reusable phase-ring molds.

### 11.01 — Two Names, One Very Long Table

Scene 201 of 400 · Introduction · CURRENT RULES · Mix: town

**Setup.** Rill's and Moss's iced name cards occupy opposite ends of the welcome desk. Bell's announcement warmer sits between them, beneath Ada's eight-arrow seating sketch.

**Puzzle.** MELT both name-card patches at 40°, choosing either order. Together they enable Bell's WARM pad at 30–40°/20–35%. Move above each ice rectangle; the drawn table and arrows are visual organization, not stream obstacles.

**Payoff.** Bell announces the couple with a gentle ding. Ada unfolds the seating sketch and reveals that both names were always meant for the same table.

### 11.02 — Something Borrowed, Something Dewy

Scene 202 of 400 · Introduction · CURRENT RULES · Mix: kitchen + garden

**Setup.** Two refreshment basins sit beneath Rill's illustrated relatives. Moss's larger hand-warmer pad stands right; place cards show cups on one side, mittens on the other.

**Puzzle.** FILL both basins with 20° water in either order. Their completion enables Moss's WARM pad at 40–50°/25–40%. Basin water needs only a positive temperature; the precise comfort range applies to the separate warmer.

**Payoff.** Rill's relatives receive dew cups in the cutaway. Moss offers a warmed stone hand to Bell, who gives it a grateful ceremonial polish.

### 11.03 — A Cushion for a Very Serious Ring

Scene 203 of 400 · Introduction · CURRENT RULES · Mix: town + cave

**Setup.** A narrow ring-cushion footprint lies left of a broad one. An iced ribbon label sits above; the real rings remain on Ada's clipboard.

**Puzzle.** FREEZE both cushion footprints at −20°, choosing order and distributing droplets across their different shapes. Together they enable the ribbon-label MELT target at 40°. The completed cushions remain stable under later warming; rings are positioned only during the payoff.

**Payoff.** Ada presents the rings on their new cushions. Bell solemnly approves both and wears the smaller one as a temporary crown.

### 11.04 — Invitations at Eight Hands per Minute

Scene 204 of 400 · Introduction · CURRENT RULES · Mix: town

**Setup.** Ada's printer has a stationary turbine high left, seal warmer low right, and iced address plaque between. Envelopes fan across the backdrop.

**Puzzle.** MELT the address plaque at 40°, then SPIN the enabled printer at 20°/80%. Printer completion enables seal WARM at 30–40°/15–30%. Reduce pressure for the last target; the title describes Ada's enthusiasm, not a timed objective.

**Payoff.** The printer produces invitations in a scripted flourish. Ada signs eight at once, including a tiny invitation addressed to Bell's spare bow tie.

### 11.05 — Check-In for Rain and Granite

Scene 205 of 400 · Remix · CURRENT RULES · Mix: town + garden

**Setup.** Cloud guests have an umbrella-stand footprint and warmer left. Stone guests have an iced luggage label and separate warmer right, with clear branch icons.

**Puzzle.** Cloud branch: FREEZE the stand at −20°, then WARM its pad at 25–35°/15–30%. Stone branch: MELT the label at 40°, then WARM its pad at 45–55°/30–45%. Each warmer depends only on its own preparation; choose branch order.

**Payoff.** The families settle in comfortably. The cloud aunt checks an umbrella; the stone uncle checks a suitcase containing one carefully folded fern.

### 11.06 — Lace with Useful Little Holes

Scene 206 of 400 · Remix · CURRENT RULES · Mix: garden + town

**Setup.** A lace-ice rectangle hangs above two flower basins. Each has a carving guide above it; all remaining ice also needs clearing.

**Puzzle.** At 40°, MELT an opening above either basin and FILL it with later droplets; repeat for the other. Both basins start enabled. Finish the remaining marked ice to complete the panel. Lace decoration itself imposes no precision-preservation or spill penalty.

**Payoff.** The ending hangs paper lace above two bright bouquets. Moss notices that Rill has folded one flower into the shape of Ada's clipboard.

### 11.07 — Flowers with Conflicting Forecasts

Scene 207 of 400 · Remix · CURRENT RULES · Mix: cave + garden + cosmos

**Setup.** Three bouquet-preparation pads rise diagonally from the desk: cave blossoms, garden roses, and star lilies. Each shows its own clear temperature and pressure card; the flowers themselves remain illustrated props.

**Puzzle.** WARM cave blossoms at 20–30°/15–30%, roses at 35–45°/25–40%, and star lilies at 45–55°/35–50%. All targets are independent. Choose a sensible setting progression while repositioning for each pad; no climate simulation couples the stations.

**Payoff.** The completed bouquets open in three distinct colors. Ada braids them together, delighted that a mixed forecast can make an excellent centerpiece.

### 11.08 — The Aisle Is a Friendly Suggestion

Scene 208 of 400 · Remix · CURRENT RULES · Mix: town

**Setup.** A broad dais footprint sits left, a tall narrow marker center, and a shallow mat right. Welcome-light warmer and flower basin occupy separate upper corners.

**Puzzle.** FREEZE all three footprints at −20°. Left dais plus right mat enable light WARM at 30–40°/20–35%; center marker independently enables flower-basin FILL at 20°. Finish either branch first. The couple follows the aisle only in the cutaway.

**Payoff.** The couple rehearses at an unhurried pace in the cutaway. Rill drifts beside the aisle, and Moss happily shifts over to join them.

### 11.09 — Cake for the Cloud Side

Scene 209 of 400 · Crossover · CURRENT RULES · Mix: kitchen + garden

**Setup.** The kitchen display has an iced recipe above a mixing basin. Two separate icing warmers stand right, labeled with Rill's cloud and Moss's leaf.

**Puzzle.** MELT the recipe at 40° and FILL the enabled basin below, finishing both targets. Basin completion enables both WARM pads: cloud icing at 25–35°/15–30%, leaf icing at 40–50°/25–40%. Complete either pad first without affecting the other.

**Payoff.** A two-sided cake appears in the ending: fluffy clouds on one face, fondant ferns on the other. Bell requests the corner where both meet.

### 11.10 — The Cave Aunt Brings an Echo

Scene 210 of 400 · Crossover · CURRENT RULES · Mix: cave + town

**Setup.** The cave window frames an iced greeting card left, dotted chime stand low right, and chime warmer above. Rill's crystal aunt holds an illustrated echo.

**Puzzle.** MELT the greeting-card ice at 40° and FREEZE the chime stand at −20°, in either order. Together they enable chime WARM at 30–40°/15–30%. Echoes and ringing occur only in the scripted ending; no sound detection is required.

**Payoff.** The aunt's gift repeats 'happy for you' in a little speech bubble. Bell discovers a new friend with a similarly resonant conversational style.

### 11.11 — Grandmother Moon Needs a Shawl

Scene 211 of 400 · Crossover · CURRENT RULES · Mix: cosmos + town

**Setup.** Grandmother Moon's star window overlooks a dotted shawl stand. An iced family photo sits low left; a shawl warmer stands right.

**Puzzle.** FREEZE the stand at −20° and MELT the photo ice at 40°, choosing either order. Together they enable shawl WARM at 25–35°/15–30%. Grandmother stays in the backdrop during play; her orbit is an ending animation.

**Payoff.** Grandmother receives a shawl decorated with tiny stars. She spots baby Rill in the family photo and immediately requests another copy for her crater shelf.

### 11.12 — The Garden Signs the Guest Book

Scene 212 of 400 · Crossover · CURRENT RULES · Mix: garden + town

**Setup.** Flower cousins surround a desk with two ink basins, a central writing-stand footprint, and a drying warmer above. Leaf signatures decorate the bench.

**Puzzle.** FILL both basins with 20° water to enable stand FREEZE at −20°. Stand completion enables drying-pad WARM at 30–40°/20–35%. The water becomes illustrated plant ink in the payoff; no liquid transfer or handwriting recognition is needed.

**Payoff.** The cousins sign with leaf prints. Ada finds a particularly small print from the fern that arrived in the stone uncle's suitcase.

### 11.13 — A Seating Plan with Weather

Scene 213 of 400 · Complication · CURRENT RULES · Mix: garden + cosmos + town

**Setup.** Cloud, stone, and star guest warmers form a broad triangle. Each has a dotted seat-platform footprint below, linked by matching family icons.

**Puzzle.** FREEZE each platform at −20° to enable its own WARM pad: cloud 25–35°/15–30%, stone 45–55°/30–45%, stars 35–45°/20–35%. Branches are independent. Group the cold work or complete guests individually; their climates do not alter neighboring targets.

**Payoff.** A cutaway seats the families comfortably together. The stone uncle shares his fern with Grandmother Moon, who offers it some excellent illustrated moonlight.

### 11.14 — Bell Practices the Quiet Ding

Scene 214 of 400 · Complication · CURRENT RULES · Mix: town

**Setup.** A large turbine stands beside Bell's tiny announcement warmer. An iced speech card sits lower left; Ada's eight pencils point to 'gentle.'

**Puzzle.** MELT the speech card at 40°, SPIN the enabled fan at 20°/80%, then WARM Bell's enabled pad at 25–35°/15–30%. The pressure drop is the challenge. Bell's volume and the fan's air movement are scripted completion presentation.

**Payoff.** Bell produces a perfectly polite ding. Rill and Moss lean closer together to listen, which Ada records as an unexpected success in rehearsal.

### 11.15 — Place Cards Catch a Rainbow

Scene 215 of 400 · Complication · FUTURE: OPTICS · Mix: cosmos + garden

**Setup.** An optional beam source and iced shutter overlook a splitter-prism footprint. Two fixed-angle lens sockets point toward separate detector place cards for Rill and Moss.

**Puzzle.** FREEZE the splitter and both fixed-angle lenses at −20°, then MELT the shutter at 40°. OPTICS must split and refract the actual beam onto both name-card detectors; illuminating both completes the exhibit. Nothing moves or needs refreezing.

**Payoff.** A rainbow reaches both names. Bell positions its bow tie in the colorful light and calls the result formal enough.

### 11.16 — Favors for Extra Hands

Scene 216 of 400 · Complication · CURRENT RULES · Mix: kitchen + garden

**Setup.** Two favor desks pair tray footprints with iced thank-you tags. A shared ribbon warmer sits between them; Ada's tray holds eight packages.

**Puzzle.** FREEZE either tray at −20° to enable its own tag MELT at 40°; repeat for the other desk. Both tags enable ribbon WARM at 30–40°/20–35%. Choose grouped cold and hot work or finish one branch at a time.

**Payoff.** The finished favors contain tiny seed packets and cloud-shaped biscuits. Ada discovers eight thank-you packages addressed to her, one for each helpful hand.

### 11.17 — The Rehearsal Has a Rehearsal

Scene 217 of 400 · Synthesis · CURRENT RULES · Mix: town + garden + kitchen

**Setup.** Bell supervises a ceremony model: iced instructions above a flower basin, dotted arch right, vows warmer left, stationary ribbon turbine far right.

**Puzzle.** MELT the card at 40° and FILL the enabled basin below, completing both. Independently FREEZE the arch at −20°. Arch and basin enable vows WARM at 30–40°/20–35%, then ribbon SPIN at 20°/80%.

**Payoff.** Paper stand-ins perform a miniature ceremony in the ending. Ada is moved to discover Bell has drawn all eight of her arms in the model audience.

### 11.18 — A Ring with a Second First Draft

Scene 218 of 400 · Synthesis · FUTURE: PHASE · Mix: cave + town

**Setup.** An optional ice-band footprint sits beside an engraving warmer. Pictograms show leaf and cloud proofs; practice casts stay separate from the real rings.

**Puzzle.** FREEZE the band at −20° to record the leaf proof. WARM the enabled engraver at 30–40°/20–35% to select the cloud proof. PHASE permits MELTING the completed band at 40° and re-FREEZING the same footprint; success requires the second completed cast.

**Payoff.** The second proof shows leaf and cloud together in its engraving. Moss and Rill keep both drafts in their memory book.

### 11.19 — Vows for a Cloudy Day

Scene 219 of 400 · Synthesis · CURRENT RULES · Mix: town + garden

**Setup.** Rill's iced vow card hangs above a basin left; Moss's keepsake-box footprint sits right. Each branch ends in a gentle ribbon warmer.

**Puzzle.** Left: MELT the card at 40° and FILL its enabled basin, then WARM its ribbon at 25–35°/15–30%. Right: FREEZE the box at −20°, then WARM its ribbon at 35–45°/20–35%. Choose branch order; finish all marked card ice.

**Payoff.** The cards promise ordinary kindness through every forecast. Bell carefully adds a tiny bookmark so the couple can find their favorite sentence again.

### 11.20 — You May Now Welcome Everybody

Scene 220 of 400 · Finale · CURRENT RULES · Mix: town + garden + kitchen + cosmos + cave

**Setup.** Two vows warmers flank an arch footprint. A toast basin sits below; an iced portrait window stands right, framed by guest silhouettes.

**Puzzle.** WARM Rill's pad at 25–35°/15–30% and Moss's at 40–50°/25–40%. Both enable arch FREEZE at −20°, then toast-basin FILL at 20°, then portrait-panel MELT at 40°. Optional prism and ring-proof exhibits are never prerequisites.

**Payoff.** The cleared portrait reveals the ceremony and a generous reception panorama. Ada holds eight bouquets while Bell quietly rings; the newlyweds save the best corner of cake for them.

<a id="level-12"></a>

## Level 12 — The Somnolent Seamworks

**Premise.** Stitch the moth tailor and Dozy the delivery pillow mend damaged dreams in a workshop hanging beneath a sleeping moon. Their newest customer, Bramble, is a nightmare who would rather be somebody's comforting forest. Cast actions and dream transformations are scripted completion vignettes, not simulated characters.

**Story arc.** Learn the repair bench, discover that useful dreams need different treatments, then help Bramble rehearse a gentler role. Finished repairs furnish a shared bedtime collection. Two optional experimental benches do not gate the final collection or its release.

**Signature.** Patchwork silhouettes, oversized thread spools, dotted rectangular ice stitches, and stacked dream-window targets. Ordinary scenes use stationary targets and visible prerequisite stitching; completed patches remain stable during later warm tasks. All active work sits below the reachable upper margin.

**Reusable art kit:** Stitch moth tailor with folded-wing, inspecting, and delighted poses; Dozy pillow courier with envelope pocket and squash poses; Bramble soft antlered nightmare with nervous and leafy variants; Modular sewing benches, bobbin turbines, rectangular quilt frames, and dream-window borders; Reusable dream props: cloud hems, moon buttons, paper forests, pocket teapots, and floating-looking shelves; Completion transitions for stitched patterns, sleeping postcards, and dream delivery.

### 12.01 — A Yawn in the Works

Scene 221 of 400 · Introduction · CURRENT RULES · Mix: town + cosmos

**Setup.** Stitch's welcome sign is trapped inside a broad ice rectangle above the repair bench. Dozy waits beside an empty outgoing tray, already wearing a delivery stamp.

**Puzzle.** Use MELT at 10 degrees or warmer, moving across the sign's full width rather than drilling one narrow hole. The reachable upper edge teaches sweeping a wide target.

**Payoff.** The sign unfolds into an enormous yawn. Dozy stamps it RECEIVED and yawns back, starting the workshop's first repaired dream.

### 12.02 — Pillow with Altitude

Scene 222 of 400 · Introduction · CURRENT RULES · Mix: cave + cosmos

**Setup.** Dozy's spare pillow hangs in frozen packing above a dotted cushion footprint. Stitch has placed a tiny Please Land Here card beside it.

**Puzzle.** FREEZE the wide lower footprint with water at minus 10 degrees or colder, then reposition above the smaller packing rectangle and MELT it. The packing target requires the completed cushion.

**Payoff.** A completion vignette drops the pillow onto the cushion. It bounces once, lands upright, and applies for a less exciting postal route.

### 12.03 — The Shy Goodnight

Scene 223 of 400 · Introduction · CURRENT RULES · Mix: town + garden

**Setup.** A speech-shaped brooch sits low on Stitch's bench. Its GOODNIGHT lettering is faint, and Dozy is leaning in with an unnecessarily large listening funnel.

**Puzzle.** WARM the brooch at 25–40 degrees and 15–35 percent pressure. Its broad target makes setting the hose, not pinpoint accuracy, the lesson; wrong settings visibly reverse warmth progress.

**Payoff.** The lettering glows and a small goodnight bubble appears. Dozy lowers the funnel and answers with a bubble even smaller.

### 12.04 — Spool of Tomorrow

Scene 224 of 400 · Introduction · CURRENT RULES · Mix: kitchen + cosmos

**Setup.** A frozen thread cassette occupies the left bench; its separate bobbin turbine stands to the right. Three blank dream postcards hang underneath, comfortably below both targets.

**Puzzle.** MELT the cassette, then SPIN the unlocked bobbin using liquid water and at least 70 percent pressure. Move between the offset stations; the thread illustration does not route water.

**Payoff.** The bobbin winds a sunrise across all three postcards. Stitch gives Dozy the first one: tomorrow, with a properly sewn edge.

### 12.05 — Two Sides of the Blanket

Scene 225 of 400 · Remix · CURRENT RULES · Mix: town + garden

**Setup.** A quilt frame has two separated dotted patches, one high on the left and one low on the right. Its central comfort badge remains dark.

**Puzzle.** FREEZE both rectangular patches in either order, repositioning to reach their exposed tops. Both are prerequisites for the central WARM badge, which needs 30–45 degrees and 20–40 percent pressure.

**Payoff.** The finished quilt gains two mismatched but equally proud squares. Dozy wraps up in it with the shipping label still outside.

### 12.06 — Snore and Whisper

Scene 226 of 400 · Remix · CURRENT RULES · Mix: town + kitchen

**Setup.** Two dream customers occupy opposite ends of a shelf: a brass snore trumpet with a turbine, and a small whisper brooch with a warmth meter.

**Puzzle.** Service the independent stations in either order. SPIN the trumpet above 70 percent pressure; WARM the brooch at 20–35 degrees and 10–25 percent. Completed targets stay finished while settings change.

**Payoff.** The trumpet produces a politely illustrated puff while the brooch lights up. Stitch labels the pair duet, then issues the trumpet a tiny handkerchief.

### 12.07 — A Window for Rain

Scene 227 of 400 · Remix · CURRENT RULES · Mix: garden + kitchen

**Setup.** A rectangular pane of dream ice hangs above a marked rain-cup basin. The cup is slightly right of center, beneath a visible patch of blue sky.

**Puzzle.** MELT the pane locally, widening an opening above the cup. After the pane target completes, FILL the basin with liquid water through the cleared space; droplets elsewhere earn no basin progress.

**Payoff.** The cup reveals a miniature rainy afternoon under its handle. Dozy opens a postage-stamp umbrella and declares the weather excellent for naps.

### 12.08 — Bramble's Audition

Scene 228 of 400 · Remix · CURRENT RULES · Mix: cave + garden

**Setup.** Bramble waits beside a tall dotted backdrop and two little lantern badges. The current stage illustration contains rather more teeth than the invitation promised.

**Puzzle.** FREEZE the backdrop footprint first. Then WARM the two separated lantern badges at 25–45 degrees and 15–35 percent pressure, visiting both without needing simultaneous progress.

**Payoff.** The scripted backdrop becomes a quiet forest and Bramble's teeth become welcoming leaves. Stitch offers an audition card reading Comforting, With Potential.

### 12.09 — Teapot with a Horizon

Scene 229 of 400 · Crossover · CURRENT RULES · Mix: kitchen + garden + cosmos

**Setup.** A teapot dream has a frozen rectangular lid and a separate empty cup basin below its spout illustration. Bramble brings a napkin the size of a meadow.

**Puzzle.** MELT the lid, then FILL the cup directly from the nozzle; the illustrated spout is not a channel. Finish by WARMing the unlocked teapot badge at 35–50 degrees and 20–40 percent pressure.

**Payoff.** The cup's surface becomes a painted sunset. Bramble folds the meadow napkin down to a single considerate hill.

### 12.10 — Cave of Lost Endings

Scene 230 of 400 · Crossover · CURRENT RULES · Mix: cave + town

**Setup.** Three frozen book-end rectangles form staggered shelves in a dream cave. Each reveals one part of a bedtime ending; a central reading badge waits below.

**Puzzle.** MELT all three blocks in any order, moving above each shelf rather than relying on decorative cave walls. Their completion unlocks a WARM reading badge at 20–40 degrees and 10–30 percent pressure.

**Payoff.** The three endings become and everyone, found a blanket, including the cave. Bramble looks especially pleased about the last part.

### 12.11 — The Dream that Grew Tomatoes

Scene 231 of 400 · Crossover · CURRENT RULES · Mix: garden + cosmos

**Setup.** Two empty watering basins flank a dotted trellis patch. Stitch's dream tomatoes are drawn as tiny red planets, each with an anxious little orbit.

**Puzzle.** FILL both basins independently with water above zero. Together they unlock the trellis FREEZE footprint. Reposition before changing to cold water so the stream reaches the trellis's exposed upper edge.

**Payoff.** In the completion illustration, the tomatoes settle onto the finished trellis. One keeps a single moon, which Stitch agrees is within the gardening allowance.

### 12.12 — Crosswalk for Sleepwalkers

Scene 232 of 400 · Crossover · CURRENT RULES · Mix: town + kitchen

**Setup.** A toy town dream lacks two rectangular crosswalk sections. A sleepy streetlamp badge stands on the far right; its empty tea basin sits on the left.

**Puzzle.** FREEZE both crossing footprints, FILL the tea basin, then WARM the streetlamp at 30–45 degrees and 15–30 percent pressure. The lamp requires all three preparations; no character moves during the work.

**Payoff.** Dozy and Bramble cross in a short vignette. The streetlamp bends to illuminate their slippers rather than interrogate their destination.

### 12.13 — Inside-Out Apology

Scene 233 of 400 · Complication · CURRENT RULES · Mix: cave + garden

**Setup.** Bramble's old frightening mask hangs between two repair stations: frozen outer packaging on the left and an exposed reassurance badge on the right.

**Puzzle.** MELT the packaging and WARM the badge at 20–35 degrees and 10–25 percent in either order. Both unlock a lower FREEZE footprint for a new mask lining; no finished warmth needs maintenance.

**Payoff.** The mask turns over in the reveal, showing a soft smile on its former inside. Bramble keeps the dramatic antlers for hanging guests' coats.

### 12.14 — Moonlight Alterations

Scene 234 of 400 · Complication · FUTURE: OPTICS · Mix: cosmos + cave

**Setup.** At an optional optical bench, a fixed moonbeam misses two stitched-eye detectors. Two dotted ice-prism sockets lie between the beam source and the sleepy mask.

**Puzzle.** With OPTICS, FREEZE the two marked prism footprints and use their authored reflection paths to light both detectors. MELT a separate frost patch from the second detector before checking its actual beam signal.

**Payoff.** The mask projects matching moons onto its eyelids. Stitch calls it a minor alteration and quietly wears safety spectacles shaped like stars.

### 12.15 — The Very Large Small Worry

Scene 235 of 400 · Complication · CURRENT RULES · Mix: town + garden

**Setup.** A huge frozen worry envelope fills the center bench. Its reassuring reply is represented by three tiny warmth badges spread along an open lower shelf.

**Puzzle.** MELT the wide envelope before the three reply badges become active. Then WARM them at 25–40 degrees and 15–35 percent pressure, choosing an efficient left-to-right route instead of trying to spray all three together.

**Payoff.** The enormous worry unfolds into a small note asking whether moss counts as a pillow. Bramble demonstrates that it very much does.

### 12.16 — A Queue of Different Nights

Scene 236 of 400 · Complication · CURRENT RULES · Mix: town + kitchen + cave

**Setup.** Four repair trays form a staircase: a basin, an ice block, a dotted patch, and a warmth badge. Dozy's labels show four customers, not four grades of urgency.

**Puzzle.** Choose the order for FILL, MELT, and FREEZE at three separate stations. Their completion unlocks WARM at 30–45 degrees and 20–40 percent pressure. Move the nozzle to each exposed top; nothing must be completed quickly.

**Payoff.** Four different dreams receive matching finished stamps. Dozy adds a fifth stamp to Bramble: Helpful, Which Is Not the Same as Harmless-Looking.

### 12.17 — The Bedtime Binding

Scene 237 of 400 · Synthesis · CURRENT RULES · Mix: town + cosmos + garden

**Setup.** The repaired postcards surround a large book frame. Two dotted spine patches sit above a central turbine, with a comfort badge offset to the lower right.

**Puzzle.** FREEZE both spine patches, then SPIN the binding turbine with liquid water above 70 percent pressure. Finally WARM the unlocked comfort badge at 25–40 degrees and 10–30 percent pressure, making the sharp setting change deliberate.

**Payoff.** The collection closes around all the postcards. Bramble appears on the cover carrying a lantern, no longer hiding behind somebody else's scary title.

### 12.18 — A Seam that Can Reconsider

Scene 238 of 400 · Synthesis · FUTURE: PHASE · Mix: garden + cosmos

**Setup.** An optional experimental quilt has one reusable rectangular ice seam between two dream panels. Stitch wants to demonstrate that changing one's mind can be an honest repair.

**Puzzle.** With PHASE, FREEZE the seam to complete the first panel's support state, deliberately MELT that same finished seam, then FREEZE it again after the second panel becomes available. Each state change must be visibly acknowledged; ordinary completed targets remain irreversible elsewhere.

**Payoff.** The quilt ends with a reversible-looking decorative fold. Bramble signs the experiment Changed My Mind, Still Me.

### 12.19 — Last Collection

Scene 239 of 400 · Synthesis · CURRENT RULES · Mix: town + kitchen + garden

**Setup.** Dozy's delivery satchel has a frozen clasp above two dotted packing cradles. An independent turbine station powers the illustrated address stamper at the far left.

**Puzzle.** FREEZE both cradles before MELTing the clasp; separately SPIN the stamper with liquid water above 70 percent pressure. The completed clasp and stamper together unlock WARM on the departure seal at 30–45 degrees and 15–35 percent pressure.

**Payoff.** The satchel receives a stack of dream-books in a completion vignette. Dozy discovers a pocket-sized forest reserved for breaks between deliveries.

### 12.20 — Everybody Gets a Goodnight

Scene 240 of 400 · Finale · CURRENT RULES · Mix: cosmos + town + garden + kitchen

**Setup.** Stitch, Dozy, and Bramble gather around three dark bedside badges beneath the finished dream collection. Their fourth, empty chair holds the squad's folded work towel.

**Puzzle.** FILL the central bedtime cup, then WARM three separated badges at 25–40 degrees and 10–30 percent pressure. All three unlock a small SPIN lullaby turbine; completed warmth remains safe during the final strong jet.

**Payoff.** Windows across the sleeping moon light with repaired dreams. Bramble opens the forest dream's door, and the last goodnight bubble is addressed to the squad.

<a id="level-13"></a>

## Level 13 — The Forecast Conservatory

**Premise.** Nimbus the cloud gardener, Bree the barometer beetle, and a stubborn seedling called Sleet grow pocket-sized weather for communities with very specific needs. A cold snap has mixed up their nursery. Growth, cloud travel, and weather releases are scripted reveals except where a scene explicitly requires a future system.

**Story arc.** Restore nursery stations, learn that different weather deserves different care, and prepare a traveling collection that includes Sleet rather than pruning away their oddness. Optional channel and moving-planter experiments are side exhibits; the seed collection can graduate without them.

**Signature.** Glasshouse arches frame reachable stationary rectangular seed beds, ice panes, rain basins, and climate badges. Contrasting WARM ranges create genuine tuning puzzles; clouds and foliage decorate the spaces between targets rather than pretending to collide with water.

**Reusable art kit:** Nimbus cloud gardener with watering-apron and umbrella poses; Bree barometer beetle with readable expression dial; Sleet seedling with boot-shaped leaves and later mixed-weather blossoms; Modular greenhouse benches, glass arches, seed packets, canopy ice panes, and rain basins; Weather plants: sunflowers with little suns, snow peas, fog mushrooms, thunder gourds, and rainbow vines; Reusable sprouting, cloud-release, rain-curtain, and seed-exchange completion overlays.

### 13.01 — The Frozen Forecast

Scene 241 of 400 · Introduction · CURRENT RULES · Mix: garden + town

**Setup.** Nimbus stands beside a nursery sign sealed in a tall ice rectangle. Three illustrated forecast pots sit underneath, their labels all reading Brisk, Possibly Very Brisk.

**Puzzle.** MELT the sign with water at 10 degrees or warmer, tracing its height from a nozzle position above the exposed top. Clearing one corner is not enough to restore the whole label.

**Payoff.** The sign reveals a cheerful forecast for Indoor Gardening. Bree turns her expression dial from worried to a cautiously botanical smile.

### 13.02 — A Bed for Snow Peas

Scene 242 of 400 · Introduction · CURRENT RULES · Mix: garden + kitchen

**Setup.** A frozen snow-pea packet hangs above an empty dotted planting bed. Nimbus has provided a miniature scarf and, less helpfully, an enormous soup spoon.

**Puzzle.** FREEZE the broad bed footprint at minus 10 degrees or colder before MELTing the packet's smaller ice target above it. The planting animation waits for both completed targets; no loose seeds need to be caught.

**Payoff.** Snow peas sprout wearing little snow caps. Nimbus removes the soup spoon from the gardening manual and pretends it was a bookmark.

### 13.03 — The Sunseed's Sweater

Scene 243 of 400 · Introduction · CURRENT RULES · Mix: garden + cosmos

**Setup.** A sunseed sits inside an open rectangular care frame low on the bench. Its tiny knitted sweater is visible, but the face on its pot looks distinctly unconvinced.

**Puzzle.** WARM the care frame at 35–50 degrees and 15–35 percent pressure. The task is maintaining the labeled range; a hotter setting is not a faster solution and reverses unfinished warmth.

**Payoff.** The seed unfolds one glowing petal and hangs its sweater on the pot handle. Bree records the first voluntary spring of the day.

### 13.04 — A Breeze with References

Scene 244 of 400 · Introduction · CURRENT RULES · Mix: garden + town

**Setup.** The ventilation wheel is iced over on the right-hand bench. A row of paper reference letters hangs on the left, each praising the breeze's excellent punctuality.

**Puzzle.** MELT the wheel's rectangular cover, then SPIN its unlocked turbine with liquid water and at least 70 percent pressure. Aim at the marked turbine rather than the decorative hanging letters.

**Payoff.** The letters flutter in the completion reveal. A small cloud receives its first indoor breeze, and Nimbus hands the wheel an Employee of the Air rosette.

### 13.05 — Two Kinds of Comfortable

Scene 245 of 400 · Remix · CURRENT RULES · Mix: garden + cave

**Setup.** A sunseed and a fog mushroom occupy widely separated care frames. Their large labels disagree about comfortable: the mushroom wants mild warmth, while the sunseed requests a brighter afternoon.

**Puzzle.** WARM the mushroom at 20–35 degrees and 10–30 percent pressure, then the sunseed at 55–75 degrees and 35–55 percent, or reverse the order. Finished care remains complete; neither needs simultaneous maintenance.

**Payoff.** Both bloom differently. Nimbus adds two separate comfort settings to the nursery guide instead of averaging everyone into a disappointed drizzle.

### 13.06 — Rain through the Skylight

Scene 246 of 400 · Remix · CURRENT RULES · Mix: garden + town

**Setup.** Two ice panes sit above separate narrow rain basins. The left basin is centered beneath its pane; the right is offset, making the same nozzle position unsuitable for both.

**Puzzle.** MELT each pane, then FILL its associated basin using liquid water through the cleared area. Each basin requires only its own pane, so finish either branch first rather than clearing everything by habit.

**Payoff.** Two nursery clouds puff up in the reveal, one round and one gloriously lopsided. Bree gives both identical watering certificates.

### 13.07 — Sleet's Unusual Roots

Scene 247 of 400 · Remix · CURRENT RULES · Mix: garden + cosmos

**Setup.** Sleet waits between a dotted cold bed and a separate warm care badge. Their seed packet shows both a snowflake and a sun, neither crossed out.

**Puzzle.** FREEZE the cold bed, then WARM the separate care badge at 25–40 degrees and 15–30 percent pressure. The badge unlocks after the bed; cold roots remain stable while the hose warms the other station.

**Payoff.** Sleet grows one snowy leaf and one sunny leaf. Nimbus replaces the label Mixed Up with Mixed Weather, which Sleet appears to prefer.

### 13.08 — The Rain Collector's Hat

Scene 248 of 400 · Remix · CURRENT RULES · Mix: garden + kitchen + town

**Setup.** A broad hat-shaped basin sits above a smaller turbine station. Nimbus's new headwear will display a tiny rainbow once its two separate preparations are complete.

**Puzzle.** FILL the marked hat basin, then move below and beside it to SPIN the unlocked turbine. The hat does not drain into the wheel; the player supplies both targets directly with liquid water.

**Payoff.** A painted rainbow unfolds from the hat brim. Bree climbs onto it in the completion vignette and requests a less spectacular staff uniform.

### 13.09 — Soup Weather

Scene 249 of 400 · Crossover · CURRENT RULES · Mix: kitchen + garden

**Setup.** The kitchen annex needs a rainy-day display: two empty soup basins flank an unlit steam-flower care frame. A snow-pea plant supervises from a safely decorative shelf.

**Puzzle.** FILL both basins above zero, then WARM the unlocked steam-flower at 40–55 degrees and 20–40 percent pressure. Filling has no hidden cooking-temperature requirement; precision belongs only to the care frame.

**Payoff.** The flower releases a scripted curl of steam shaped like a blanket. Nimbus serves the snow pea a bowl of soup without making any assumptions about ingredients.

### 13.10 — Fog for a Small Cave

Scene 250 of 400 · Crossover · CURRENT RULES · Mix: cave + garden

**Setup.** A miniature cave diorama has two frozen rectangular viewing windows at different heights. Its fog-mushroom care badge sits on an open side ledge, not behind a colliding cave wall.

**Puzzle.** MELT both windows to unlock the badge, then WARM it at 20–35 degrees and 10–25 percent pressure. Reposition above the higher window instead of trying to blast through the illustrated roof.

**Payoff.** Soft display fog curls through the diorama. A painted cave dragon gains a privacy curtain and a sign reading Home, Please Knock.

### 13.11 — Moonflowers at Noon

Scene 251 of 400 · Crossover · CURRENT RULES · Mix: cosmos + garden

**Setup.** Three moonflower pots form a descending diagonal beneath a painted night sky. Each pot has a dotted ice collar; a single light badge sits beyond the lowest pot.

**Puzzle.** FREEZE all three collar footprints, moving above each rather than spraying diagonally through inactive targets. Then WARM the badge at 30–45 degrees and 15–35 percent pressure; the moon art does not change droplet gravity.

**Payoff.** The moonflowers open like little observatories. Nimbus supplies each with a pair of gardening binoculars, including the pot facing the wall.

### 13.12 — Forecast for the High Street

Scene 252 of 400 · Crossover · CURRENT RULES · Mix: town + garden + kitchen

**Setup.** A toy street has a frozen picnic sign, a dry duck-pond basin, and a dotted frost-skating patch in three separate bays. Bree presents requests from three very different neighbors.

**Puzzle.** MELT the sign, FILL the pond, and FREEZE the skating patch in any order. All unlock the central SPIN display wheel, which needs liquid water at 70 percent pressure or more.

**Payoff.** The three neighborhood scenes animate together. Nimbus proudly issues a forecast of Something for Everyone, in clearly marked locations.

### 13.13 — A Rainforest in Three Pots

Scene 253 of 400 · Complication · CURRENT RULES · Mix: garden + cosmos

**Setup.** Three rain basins decrease in width from left to right. Their leafy illustrations become increasingly extravagant, culminating in one enormous leaf above the smallest basin.

**Puzzle.** FILL all three independently with liquid water. Move closer above the narrow last target instead of assuming higher pressure is always helpful; the challenge is stream placement, not spill penalties or a hidden temperature band.

**Payoff.** Three pocket rainforests unfold. The smallest receives the largest leaf, which Sleet borrows as an umbrella with excellent confidence and poor visibility.

### 13.14 — The Connected Forecast

Scene 254 of 400 · Complication · FUTURE: FLOW · Mix: garden + cave

**Setup.** An optional irrigation exhibit connects an upper reservoir to two lower cloud basins. Ice blocks close both branch mouths; the far channel takes a visibly longer route.

**Puzzle.** With FLOW, MELT either branch blockage and FILL the upper reservoir so persistent water actually reaches that branch's cloud basin. Clear the other blockage and continue supplying the reservoir until both connected basins are full; no finished construction must be reversed.

**Payoff.** Two clouds unfurl a shared rain curtain. Bree labels the channel map Plumbing, Occasionally Mistaken for Destiny.

### 13.15 — Thunder Gourd, Inside Voice

Scene 255 of 400 · Complication · CURRENT RULES · Mix: garden + town

**Setup.** A thunder gourd sits between a large turbine and a small care badge. Sleet has drawn a rehearsal audience of three flowerpots, all wearing ear defenders.

**Puzzle.** SPIN the turbine with liquid water above 70 percent pressure, then WARM the unlocked badge at 25–40 degrees and 10–20 percent pressure. The deliberate strong-to-gentle change controls the tasks, not simulated sound volume.

**Payoff.** The gourd produces one tiny illustrated rumble. The flowerpots applaud in the reveal, and Nimbus awards a ribbon for thunder appropriate to the venue.

### 13.16 — Labels after the Frost

Scene 256 of 400 · Complication · CURRENT RULES · Mix: garden + town + cave

**Setup.** Four frozen label blocks surround two nursery trays. The left pair belongs to warm-weather plants; the right pair belongs to cold-weather plants, identified by large matching pictures.

**Puzzle.** MELT either pair to unlock its own tray: WARM the left at 40–55 degrees and 20–40 percent pressure, FREEZE the right footprint. Complete both branches without mistaking inactive transparent targets for physical shields.

**Payoff.** The labels return to their pots. Sleet receives a double-sided label and immediately begins using the blank edge for doodles.

### 13.17 — Packing a Little Spring

Scene 257 of 400 · Synthesis · CURRENT RULES · Mix: town + garden + cosmos

**Setup.** Three traveling seed cases occupy stepped benches: a dry basin case, a dotted cold cradle, and a frozen clasp case. A departure badge sits at the clear lower edge.

**Puzzle.** FILL the basin and FREEZE the cradle in either order; both unlock MELT on the clasp. Finish by WARMing the departure badge at 30–45 degrees and 15–35 percent pressure, following the pictured packing sequence.

**Payoff.** The cases close around three different seasons. Nimbus leaves the fourth case open so Sleet can decide how much weather to bring.

### 13.18 — The Wandering Hanging Basket

Scene 258 of 400 · Synthesis · FUTURE: MOTION · Mix: garden + town

**Setup.** In an optional kinetic greenhouse bay, a planter basin rides a slow visible horizontal rail. Two stationary rest marks indicate the ends of its repeating route.

**Puzzle.** With MOTION, FILL the actual moving basin using liquid water, following its broad predictable path. Progress persists between passes, with no missed-pass punishment or deadline; decorative leaves do not change the collision zone.

**Payoff.** The completed planter parks and grows a vine shaped like a return ticket. Bree admits that mobile gardening has excellent scenery.

### 13.19 — Sleet's Demonstration

Scene 259 of 400 · Synthesis · CURRENT RULES · Mix: garden + cosmos + kitchen

**Setup.** Sleet's show bench combines two dotted root patches, an offset rain basin, and a sun badge. Nimbus has replaced the old inspection clipboard with a little audience chair.

**Puzzle.** FREEZE both root patches, FILL the independent basin, then WARM the sun badge at 35–50 degrees and 15–35 percent pressure. All preparations are required, but the finished cold patches remain stable beside the warm finale.

**Payoff.** Sleet blooms with snowy leaves, warm petals, and a personal drizzle. Nimbus writes Good at Being Sleet, without adding any qualifications.

### 13.20 — A Forecast Worth Sharing

Scene 260 of 400 · Finale · CURRENT RULES · Mix: garden + town + cosmos

**Setup.** The traveling cases flank a wide frozen greenhouse nameplate. Three finished-plant portraits surround the central dispatch turbine, leaving a clear vertical aiming lane above it.

**Puzzle.** MELT the nameplate, then complete two independent WARM farewell badges at 25–40 degrees and 15–35 percent pressure. All three unlock the final SPIN turbine; switch to liquid water above 70 percent pressure to launch the reveal.

**Payoff.** The cases depart in a scripted seed-exchange procession. The conservatory's new nameplate reads Locally Grown Weather, Including the Unexpected, with Sleet's boots painted underneath.

<a id="level-14"></a>

## Level 14 — The Mycelium Local

**Premise.** Conductor Gills, Sprig the tiny mushroom porter, and Edna the spore librarian are reopening a fungal railway beneath an enormous garden. Every passenger has a reason to travel and absolutely no interest in an express service. Ordinary trains, doors, passengers, and signals move only in scripted completion vignettes.

**Story arc.** Recover the station, make room for unusual cargo, reconnect the library and garden stops, and prepare a local service that includes the overlooked smallest platform. Optional freight-motion and balance demonstrations are separate training sidings, not prerequisites for reopening the railway.

**Signature.** Cap-shaped roofs, gill-striped signs, stepped platform targets, and diagrammatic prerequisite routes. Ice track sections are fixed rectangular construction footprints; their completion licenses a train cutaway, not physical rail simulation. Open overhead nozzle access remains visible at every ordinary station.

**Reusable art kit:** Conductor Gills shaggy-cap mushroom with ticket-punch and waving poses; Sprig button-mushroom porter with oversized cap and luggage trolley poses; Edna inkcap librarian with spore envelopes and reading spectacles; Modular mushroom platforms, gill-roof station bays, rectangular track beds, and signposts; Reusable stationary train carriage, boiler badge, exposed turbine, and freight-rack kits; Passengers and cargo: snail family, acorn crates, book bundles, teacups, and soft spore sacks.

### 14.01 — Tickets under Ice

Scene 261 of 400 · Introduction · CURRENT RULES · Mix: town + garden

**Setup.** The ticket window is one broad ice rectangle beneath a mushroom roof. Sprig stands beside it with a ticket punch larger than their entire face.

**Puzzle.** MELT across the window using water at 10 degrees or warmer. Move along the exposed upper edge to clear its full width; the cap roof is scenery, not a physical obstacle.

**Payoff.** Gills opens the booth in the reveal and accepts Sprig's first carefully punched ticket. It contains one magnificent hole and no remaining destination.

### 14.02 — Boiler, Not Broiler

Scene 262 of 400 · Introduction · CURRENT RULES · Mix: kitchen + town

**Setup.** A stationary carriage displays a large boiler-care badge beside a painted pressure gauge. Edna's library crate waits nearby with a prominent Please Do Not Toast sticker.

**Puzzle.** WARM the boiler badge at 45–65 degrees and 25–45 percent pressure. The gauge mirrors this target's progress; it is not an additional sensor or a hidden overheating failure system.

**Payoff.** The carriage produces a comfortable illustrated puff. Edna opens the crate to reveal books wearing little dust jackets, relieved to remain unroasted.

### 14.03 — A Very Short Missing Railway

Scene 263 of 400 · Introduction · CURRENT RULES · Mix: cave + garden + town

**Setup.** Two dotted rectangular track beds interrupt the platform illustration. The parked carriage has a frozen wheel-cover target at its far end, with clear nozzle access above.

**Puzzle.** FREEZE both track footprints at minus 10 degrees or colder, then MELT the wheel cover. The cover requires both tracks; finished tracks remain stable during melting, and no train is physically supported by ice simulation.

**Payoff.** The carriage crosses in a short completion cutaway. Gills announces a successful journey of almost three mushroom caps.

### 14.04 — The Departure Fan

Scene 264 of 400 · Introduction · CURRENT RULES · Mix: town + garden

**Setup.** A low turbine and a high frozen destination board occupy opposite sides of the station. Sprig has arranged three enormous hats beneath the ventilation illustration.

**Puzzle.** MELT the board to reveal its lettering, then SPIN the unlocked turbine with liquid water at 70 percent pressure or more. Reposition between heights rather than treating the painted vent as a water conduit.

**Payoff.** The board reads Local Service and the hats flutter in the reveal. Gills insists that airing the hats is an important part of route preparation.

### 14.05 — Water Stops, Plural

Scene 265 of 400 · Remix · CURRENT RULES · Mix: town + kitchen

**Setup.** Three locomotive-water basins sit at different heights along an empty siding. The smallest belongs to Sprig's handcart, which has acquired a thoroughly unnecessary smokestack.

**Puzzle.** FILL all three marked basins with water above zero. Choose a route between their exposed tops and adjust nozzle position for the narrow handcart basin; none is connected to another or loses water over time.

**Payoff.** Each vehicle gains a painted steam curl. Sprig's handcart produces the smallest curl and receives the loudest ceremonial applause.

### 14.06 — Luggage with Branches

Scene 266 of 400 · Remix · CURRENT RULES · Mix: garden + town

**Setup.** An acorn passenger's large coat is frozen above an empty dotted luggage rack. A separate warmth badge marks the seat cushion to the right.

**Puzzle.** FREEZE the rack before MELTing the coat's packing block. Independently WARM the cushion at 25–40 degrees and 10–30 percent pressure. All three preparations finish before the passenger boards in the reveal.

**Payoff.** The acorn hangs up a coat full of tiny branches. Sprig adds Leaf Room to the luggage allowance and offers a miniature lint roller.

### 14.07 — The Drip-Reading Room

Scene 267 of 400 · Remix · CURRENT RULES · Mix: cave + town + kitchen

**Setup.** Edna's carriage library has two frozen rectangular skylights above offset collection basins. Illustrated shelves leave a clear working gap down the center of the scene.

**Puzzle.** MELT one skylight and FILL its basin through the cleared area, then repeat on the other branch. Each basin depends only on its own skylight, rewarding completion of a local pair before crossing the carriage.

**Payoff.** Edna unveils rain-themed reading seats beneath dry-looking illustrated shelves. The first book is A Brief History of Drips, Volume One of Seven.

### 14.08 — Quiet Car, Warm Welcome

Scene 268 of 400 · Remix · CURRENT RULES · Mix: garden + town

**Setup.** Two carriage badges face each other across a wide aisle. One labels a cool mushroom nursery; the other labels a cozy reading nook, both awaiting their own comfortable conditions.

**Puzzle.** WARM the nursery at 15–30 degrees and 10–25 percent pressure, and the nook at 40–55 degrees and 20–40 percent. Complete either first; there is no requirement to maintain both ranges at once.

**Payoff.** The nursery settles beneath a leaf blanket while Edna opens the nook. Gills conducts the opening announcement entirely on a small written card.

### 14.09 — Platform Soup

Scene 269 of 400 · Crossover · CURRENT RULES · Mix: kitchen + town

**Setup.** The station kitchen has a frozen menu above two empty bowl basins. A kitchen badge sits between them; snow-pea passengers wait beside the open counter.

**Puzzle.** MELT the menu, FILL both unlocked bowls directly, then WARM the kitchen badge at 40–55 degrees and 20–40 percent pressure. Bowl filling needs only liquid water; the final badge supplies the precision-temperature task.

**Payoff.** Two scripted soup servings appear. Gills names one platform one and the other platform two, then notices both have arrived ahead of the train.

### 14.10 — Observatory on the Local

Scene 270 of 400 · Crossover · CURRENT RULES · Mix: cosmos + cave + town

**Setup.** A stationary observation carriage has a frozen star-chart panel high on the left and a telescope turbine low on the right. The painted moon peers over the mushroom roof.

**Puzzle.** MELT the panel, then SPIN the telescope's marked turbine above 70 percent pressure with liquid water. The telescope turns only in the completion vignette; neither the sky nor the moon changes hose gravity.

**Payoff.** The telescope reveals a constellation shaped like Sprig's handcart. Edna reserves the name Porter's Rest and refuses to charge it for luggage.

### 14.11 — Crossing for Six Small Feet

Scene 271 of 400 · Crossover · CURRENT RULES · Mix: town + garden

**Setup.** A beetle family's street crossing lacks three short rectangular sections. A frozen station-name block sits beyond them, and Sprig has painted enormous arrows to a very small destination.

**Puzzle.** FREEZE the three spaced crossing footprints in any order, then MELT the unlocked name block. Keep the nozzle above each short section; the illustrated road and waiting family are not collision obstacles.

**Payoff.** The family crosses in the reveal, carrying one pea between all six helpers. Their destination is revealed as Somewhere Nearby, a perfectly respectable stop.

### 14.12 — Seeds in the Sleeper Car

Scene 272 of 400 · Crossover · CURRENT RULES · Mix: garden + town + cosmos

**Setup.** Two seed crates occupy opposite ends of a carriage. Each has a basin below a frozen label; a dotted dividing panel stands in the clear central aisle.

**Puzzle.** MELT each label to unlock its own FILL basin, finishing the branches in either order. Then FREEZE the central panel footprint after both basins complete; it is a constructed prop, not a live water barrier.

**Payoff.** The panel gains a painted night sky and the seeds settle into sleeper berths. Edna supplies a bedtime timetable with no small print.

### 14.13 — Everyone's Ticket Matters

Scene 273 of 400 · Complication · CURRENT RULES · Mix: town + garden

**Setup.** Four ticket-care badges form a zigzag across the booking counter. Two belong to chilly spore travelers; two belong to warm-root visitors, marked with large blue and amber portraits.

**Puzzle.** WARM blue badges at 15–30 degrees and 10–30 percent pressure; amber badges need 45–60 degrees and 25–45 percent. Group matching settings or follow the counter order, keeping each target's finished progress permanent.

**Payoff.** All four tickets unfold into seats with different cushions. Sprig punches each carefully this time, leaving enough ticket to know where to sit.

### 14.14 — The Ascending Freight Cup

Scene 274 of 400 · Complication · FUTURE: MOTION · Mix: town + cave + kitchen

**Setup.** An optional siding has a stationary lift turbine and a cup basin on a slow vertical carrier. Both endpoint marks sit within nozzle reach.

**Puzzle.** With MOTION, SPIN the turbine to start the carrier's predictable loop, then FILL the moving cup with liquid water. Progress persists through missed passes; the turbine need not be repeatedly completed or held under a second stream.

**Payoff.** The carrier parks with one safely delivered cup. Gills certifies Sprig for lifting refreshments to slightly more impressive heights.

### 14.15 — Junction of Good Reasons

Scene 275 of 400 · Complication · CURRENT RULES · Mix: town + garden

**Setup.** Two independent signal bays label the library branch and the garden branch. Each contains a frozen sign above its own turbine, with the final route board between them.

**Puzzle.** Complete each MELT-to-SPIN pair in either order. Both branches unlock a central WARM route badge at 30–45 degrees and 15–35 percent pressure; signal completion changes the display, not a live train's path.

**Payoff.** The route board links both destinations. Edna sends books to the garden while Nimbus's illustrated seed parcels arrive at the library for research purposes.

### 14.16 — Lost, Found, and Slightly Damp

Scene 276 of 400 · Complication · CURRENT RULES · Mix: town + kitchen

**Setup.** Three lost-property ice blocks enclose a tall umbrella, a wide scarf, and a squat lunchbox. An empty return basin sits on the open side shelf.

**Puzzle.** MELT all three shapes, changing sweep direction to match their silhouettes. Their completion unlocks FILL on the return basin; warm liquid is sufficient, and no item needs to be physically pushed or caught.

**Payoff.** The returned belongings appear neatly sorted beside a fresh water bowl. A snail claims the umbrella and the lunchbox, then kindly lends Sprig the scarf.

### 14.17 — The Platform Nobody Noticed

Scene 277 of 400 · Synthesis · CURRENT RULES · Mix: town + garden + cave

**Setup.** Sprig points to an overlooked low platform between larger stations. Its dotted ramp, water basin, and frozen nameplate all have clear overhead nozzle access.

**Puzzle.** FREEZE the ramp and FILL the basin independently, then MELT the nameplate they unlock. Finish a WARM welcome badge at 25–40 degrees and 10–30 percent pressure; ramp use is reserved for the completion vignette.

**Payoff.** The nameplate reads Sprig Halt. A procession of tiny passengers appears, delighted that their size is no longer being mistaken for a lack of travel plans.

### 14.18 — The Freight that Weighed a Little

Scene 278 of 400 · Synthesis · FUTURE: BALANCE · Mix: town + cave

**Setup.** An optional freight scale supports a book crate opposite an empty water basin. A broad level band marks the platform height needed for the reveal.

**Puzzle.** With BALANCE, FILL a fixed inlet target to add counterweight water. Mass caps at the visibly marked successful capacity, preventing overshoot. Only the scale prop moves as actual torque levels its beam; the hose target stays stationary.

**Payoff.** The balanced platform carries the crate in a short reveal. Edna discovers its heaviest volume is A Small Book of Modest Ideas.

### 14.19 — Nothing Leaves Hungry

Scene 279 of 400 · Synthesis · CURRENT RULES · Mix: kitchen + town + garden

**Setup.** Three bowl basins sit beneath the final service trolley's frozen menu strip. A separate wheel turbine stands to the right, away from the illustrated seats.

**Puzzle.** MELT the menu to unlock the bowls, FILL all three, then SPIN the trolley turbine with liquid water above 70 percent pressure. The last basin is narrower, encouraging a close nozzle position before returning to the wheel.

**Payoff.** Sprig serves the snail family, Gills, and Edna. A fourth bowl appears for the porter: a gentle reminder that staff are people too.

### 14.20 — All Aboard, Eventually

Scene 280 of 400 · Finale · CURRENT RULES · Mix: town + garden + cave + kitchen

**Setup.** The train waits beside Sprig Halt. Two dotted welcome panels frame its boiler badge; a separate departure turbine occupies the open side bay.

**Puzzle.** FREEZE both welcome panels, WARM the unlocked boiler at 45–65 degrees and 25–45 percent pressure, then SPIN the turbine with liquid water above 70 percent. There is no countdown; departure waits for every preparation.

**Payoff.** The completed train visits the repaired stops in a short illustrated procession. Gills' final announcement is We Have Time, and Sprig's little platform receives the biggest wave.

<a id="level-15"></a>

## Level 15 — The Institute of Almost Possible

**Premise.** Dr. Probably the axolotl curator, Margin the folded-paper assistant, and Zero the small decorative black-hole exhibit prepare a museum for visitors. Its frozen displays have lost their explanations, but not their enthusiasm. Impossible transformations are theatrical completion reveals unless a scene explicitly requests a real future physics system.

**Story arc.** Reopen modest exhibits, discover that strange results deserve careful labels, and let Zero curate a display about useful emptiness. The finale celebrates good questions rather than perfect certainty. Optional optical and buoyancy demonstrations are annexes, not required routes through the museum.

**Signature.** Exhibit cases isolate stationary rectangular targets with large pictorial cause-and-effect labels. Mirrored layouts, negative-space ice windows, paired temperature ranges, and separated preparation branches make the laboratory readable without fake sensor logic. All work zones have open nozzle access.

**Reusable art kit:** Dr. Probably axolotl curator with pointer, puzzled, and proud poses; Margin folded-paper assistant with clipboard wings and unfolding poses; Zero outlined black-hole character with expressions, explicitly decorative outside named future exhibits; Modular museum plinths, rectangular display cases, specimen labels, brass turbines, and observation windows; Reusable exhibits: tomorrow fossil, impossible kettle, moon marble, square toast, question-mark plant, and miniature ocean; Scripted reveal overlays for specimen silhouettes, explanatory cards, silhouettes becoming labels, and visitor postcards.

### 15.01 — Please Unfreeze the Explanation

Scene 281 of 400 · Introduction · CURRENT RULES · Mix: town + cave

**Setup.** The museum's welcome plaque is trapped in a wide ice slab above an empty plinth. Dr. Probably waits with a pointer aimed confidently at absolutely nothing.

**Puzzle.** MELT the slab with water at 10 degrees or warmer, sweeping across the whole rectangular label. The low plinth leaves ample space to see where drops contact ice and where cleared holes let them pass.

**Payoff.** The plaque reads We Think You'll Like This. Margin adds an encouraging underline, and the curator finally has something specific to point at.

### 15.02 — An Excellent Nothing

Scene 282 of 400 · Introduction · CURRENT RULES · Mix: cosmos + town

**Setup.** Zero occupies the empty center of a display outline. Two dotted rectangular case edges sit on either side, and the exhibit caption is folded at the bottom.

**Puzzle.** FREEZE both case-edge footprints at minus 10 degrees or colder, leaving the illustrated central space untouched. Both are ordinary rectangular construction targets; the apparent hole does not attract droplets or alter gravity.

**Payoff.** The caption unfolds: Nothing, Carefully Presented. Zero gains a little curator's ribbon and looks considerably less like an exhibit somebody forgot to deliver.

### 15.03 — The Almost Boiling Kettle

Scene 283 of 400 · Introduction · CURRENT RULES · Mix: kitchen + town

**Setup.** A transparent kettle display has a large care badge and a painted strip labeled Quite Enough. Dr. Probably has put a biscuit on the observation clipboard.

**Puzzle.** WARM the badge at 45–60 degrees and 20–40 percent pressure. Higher heat reverses unfinished progress instead of proving enthusiasm; the kettle is a warm target, not a fill basin with an invented temperature requirement.

**Payoff.** The kettle produces one steam question mark. The curator answers it by moving the biscuit from the clipboard onto a proper plate.

### 15.04 — Proof by Turning

Scene 284 of 400 · Introduction · CURRENT RULES · Mix: town + cosmos

**Setup.** A frozen rectangular display cover conceals a wheel diagram. Its separate exposed turbine stands lower and to the right, beside Margin's stack of unturned explanatory cards.

**Puzzle.** MELT the cover, then SPIN the unlocked turbine with liquid water at 70 percent pressure or more. The diagram is decorative; the actual wheel target, not the printed arrow, receives the stream.

**Payoff.** The display flips to its reverse side, labeled Also Interesting. Margin proudly discovers that an explanation can have more than one page.

### 15.05 — A Pair of Qualified Answers

Scene 285 of 400 · Remix · CURRENT RULES · Mix: garden + cosmos + cave

**Setup.** Two identical-looking specimen frames sit far apart. One holds a cool luminous moss, the other a warm ceramic sun; their large care labels reveal the important difference.

**Puzzle.** WARM the moss at 15–30 degrees and 10–25 percent pressure, and the sun at 55–75 degrees and 35–55 percent. Complete either first and keep finished progress, demonstrating different settings without simultaneous-state mechanics.

**Payoff.** Both specimens glow in different colors. Dr. Probably replaces the exhibit title Same Thing with Similar Frame, Different Thing.

### 15.06 — A Hole Worth Looking Through

Scene 286 of 400 · Remix · CURRENT RULES · Mix: cave + town

**Setup.** Two ice-window targets frame specimen silhouettes. An already-active basin sits beneath the left pane, where droplets reach it through a carved opening.

**Puzzle.** MELT an opening through the left pane to FILL the basin with later liquid drops. Finish both panes as well; their completion and the full basin jointly trigger the reveal. The silhouettes are art, not sensors.

**Payoff.** The specimen behind the windows turns out to be a second tiny museum. Its curator is also pointing at an empty plinth, which Zero finds relatable.

### 15.07 — Gravity, Displayed Upside Down

Scene 287 of 400 · Remix · CURRENT RULES · Mix: cosmos + kitchen + town

**Setup.** Upside-down furniture decorates an exhibit with two normally oriented basin targets on open stands. Margin has taped THIS WAY UP labels to both, arrows pointing down.

**Puzzle.** FILL both basins using ordinary downward ballistic water. Move above each target; this current-engine exhibit explicitly keeps normal gravity and offers no ceiling collection or reversed droplets despite its upside-down set dressing.

**Payoff.** The completion card rotates the furniture drawing while the water stays level. Dr. Probably titles the demonstration A Change of Perspective, Not of Plumbing.

### 15.08 — Zero's First Exhibit

Scene 288 of 400 · Remix · CURRENT RULES · Mix: cosmos + town

**Setup.** Zero arranges an empty dotted frame beside a frozen label and a welcome badge. The empty display's preparation diagram is exceptionally careful.

**Puzzle.** FREEZE the frame footprint, then MELT the label it unlocks. WARM the final badge at 25–40 degrees and 10–30 percent pressure; the result celebrates completed work rather than requiring any interaction with an invisible target.

**Payoff.** The label reads Room for the Next Idea. Margin leaves a blank page underneath, and Zero signs it with a beautifully circular flourish.

### 15.09 — The Square Toast Question

Scene 289 of 400 · Crossover · CURRENT RULES · Mix: kitchen + town

**Setup.** A kitchen exhibit displays three frozen toast rectangles of different widths. An empty butter-dish basin waits below, with a dotted napkin footprint set off to one side.

**Puzzle.** MELT the three toast-cover targets, choosing sweep widths to match each. Their completion unlocks FILL on the dish; independently FREEZE the napkin's display stand, a stable construction prop rather than actual edible ice.

**Payoff.** The toast reveal shows increasingly improbable square toppings. Dr. Probably concedes that breakfast geometry may be a matter of personal taste.

### 15.10 — A Fossil of Next Tuesday

Scene 290 of 400 · Crossover · CURRENT RULES · Mix: cave + kitchen + town

**Setup.** A broad cave specimen is encased in ice above two dotted support footprints. Its label claims to be older than next week, a position Margin has marked for review.

**Puzzle.** FREEZE both support footprints before MELTing the specimen case. The supports remain finished during heating; the fossil is revealed in place, without requiring live mass, falling objects, or a physically stable excavation.

**Payoff.** The fossil is a birthday cake with a small calendar. Dr. Probably files it under Evidence That Someone Is Looking Forward to Something.

### 15.11 — Botany of a Question Mark

Scene 291 of 400 · Crossover · CURRENT RULES · Mix: garden + town

**Setup.** Three dotted trellis sections stand beside an empty watering basin. Beneath them, the plant illustration resembles a determined punctuation mark lying down.

**Puzzle.** FILL the basin to unlock all three FREEZE trellis targets. Build the short lower section and two taller sections in any order, moving to each exposed top; the plant's later curl is a scripted reveal, not growing collision geometry.

**Payoff.** The plant rises into a question mark. Margin places a blank answer card beside it, and the curator decides not to rush.

### 15.12 — The Queue that Went Somewhere

Scene 292 of 400 · Crossover · CURRENT RULES · Mix: town + cosmos

**Setup.** A miniature civic exhibit contains two frozen entrance signs and two separate warmth badges. Painted visitors queue in delightfully wrong directions until the display is ready.

**Puzzle.** Complete either sign's MELT-to-WARM branch first. Both badges need 25–40 degrees and 15–35 percent pressure; separate prerequisites and offset heights reward planning a local route, not moving the painted visitors with hose force.

**Payoff.** The visitors rearrange in the reveal to admire Zero's empty frame. Its queue is labeled Room for Everyone and, for once, actually illustrates the point.

### 15.13 — Margin's Margin Notes

Scene 293 of 400 · Complication · CURRENT RULES · Mix: town + kitchen

**Setup.** Four frozen note tabs border a giant explanation card. Two care badges below represent the original exhibit and Margin's suggested correction.

**Puzzle.** MELT all four tabs, then WARM the two badges at contrasting settings: 20–35 degrees and 10–25 percent pressure on the left, 45–60 degrees and 25–45 percent on the right. Finished work does not reset when the other setting changes.

**Payoff.** The correction becomes a second explanation card. Dr. Probably credits Margin in larger lettering than their own signature.

### 15.14 — The Light Takes the Long Way

Scene 294 of 400 · Complication · FUTURE: OPTICS · Mix: cosmos + cave

**Setup.** An optional optical case sends a fixed beam toward a detector beyond two frost panes. Both panes intersect the beam at different horizontal positions.

**Puzzle.** With OPTICS, MELT aligned apertures through both panes until the actual beam reaches the detector. Finish remaining marked ice too; the two pane completions and illuminated detector gate the reveal. No prisms, movable mirrors, or extra controls are involved.

**Payoff.** The detector illuminates a question mark beyond both windows. Zero receives a visitor card asking whether light appreciates a clear explanation.

### 15.15 — Ocean, Some Assembly Required

Scene 295 of 400 · Complication · CURRENT RULES · Mix: garden + cosmos + kitchen

**Setup.** Three disconnected ocean basins occupy descending shelves. Each holds a painted sea creature, including a whale with optimistic expectations about available space.

**Puzzle.** FILL all three basins directly with water above zero, moving between their exposed tops. The shelves are not connected waterways; a narrow middle basin makes careful nozzle placement more useful than simply maximizing pressure.

**Payoff.** The painted creatures animate in their completed exhibits. The whale blows a tiny polite fountain, and Margin supplies an appropriately tiny admission ticket.

### 15.16 — The Moon on Loan

Scene 296 of 400 · Complication · CURRENT RULES · Mix: cosmos + town + cave

**Setup.** A moon marble rests in a frozen rectangular travel case. Its dotted display cradle sits below, while a polishing turbine stands independently on the right-hand bench.

**Puzzle.** FREEZE the cradle before MELTing the case; separately SPIN the turbine with liquid water above 70 percent pressure. All preparations finish before the marble is transferred in the completion vignette, without rolling-ball physics.

**Payoff.** The moon marble appears on its cradle with a reassuringly large return label. Dr. Probably checks the loan period: until everyone has had a look.

### 15.17 — Visitors Become Curators

Scene 297 of 400 · Synthesis · CURRENT RULES · Mix: town + garden + cosmos

**Setup.** Three unfinished exhibit bays surround an empty center card. One needs a water basin, one a cold display frame, and one a frozen explanatory label restored.

**Puzzle.** FILL, FREEZE, and MELT the separate bays in an order of your choosing. All three unlock the central WARM card at 30–45 degrees and 15–35 percent pressure; task order changes your route, not the eventual canonical exhibit selection.

**Payoff.** The card becomes a visitors' page of questions. Zero's first contribution asks whether anyone else enjoys having room to think.

### 15.18 — The Floating Footnote

Scene 298 of 400 · Synthesis · FUTURE: BALANCE · Mix: kitchen + cosmos

**Setup.** An optional buoyancy tank holds a floating plinth carrying a footnote symbol. Its fixed fill zone sits below a generous target-height band.

**Puzzle.** With BALANCE, FILL the fixed tank so its actual water level buoyantly raises the plinth into the generous height band. Tank capacity caps at the successful level, avoiding irreversible overshoot; the supported symbol moves physically rather than appearing only after completion.

**Payoff.** The footnote reaches its own explanation: Important Enough to Come Up Here. Margin finally gets to point above the main text.

### 15.19 — A Case for Uncertainty

Scene 299 of 400 · Synthesis · CURRENT RULES · Mix: town + cosmos + cave

**Setup.** Two dotted case sections frame Zero's empty plinth. Above them sit separate ice-label blocks; a warm hospitality badge waits on an open lower shelf.

**Puzzle.** FREEZE each case section to unlock its matching MELT label. Complete both local branches, then WARM the hospitality badge at 25–40 degrees and 10–30 percent pressure. The finished case edges stay intact through later heat.

**Payoff.** The labels read What We Know and What We Wonder. Zero places a welcome mat between them and leaves the middle comfortably open.

### 15.20 — Grand Opening, Small Print

Scene 300 of 400 · Finale · CURRENT RULES · Mix: town + cosmos + garden + kitchen

**Setup.** The exhibits surround a frozen banner, an empty refreshments basin, and a dotted podium. Dr. Probably and Margin share one modest step stool.

**Puzzle.** MELT the banner, FILL the basin, and FREEZE the podium independently. Together they unlock a WARM welcome badge at 30–45 degrees and 15–35 percent pressure, followed by the final SPIN curtain turbine above 70 percent.

**Payoff.** The museum opens with the banner Almost Possible, Definitely Worth Asking. Zero's room-for-ideas exhibit receives the first visitor, who brings a beautifully ordinary question.

<a id="level-16"></a>

## Level 16 — Last Exit Before Breakfast

**Premise.** Miso the octopus cook runs a tiny galactic roadside diner with Mallow, a pancake who wants to become a moon. Zip the comet hauler keeps returning with neighbors who need more than a quick refill. Food, vehicle departures, and character gestures are scripted payoffs; ordinary scenes do not simulate cooking chemistry or spaceflight.

**Story arc.** Reopen the counter, accommodate wildly different travelers, and turn a lonely stopping place into a shared table. Mallow discovers that being someone's familiar light matters more than becoming enormous. Optional syrup routing and rhythm service are side activities, never required for the final breakfast.

**Signature.** Chrome counter bays, station-shaped food targets, wide ice-covered menus, and strongly contrasting hospitality badges. Fixed basin, turbine, and construction rectangles remain readable among cosmic props. All ordinary aiming uses standard gravity and an open reachable top edge, even in space.

**Reusable art kit:** Miso octopus cook with apron, spatula, cup-serving, and resting poses; Mallow pancake character with butter-pat hat, moonlike glow, and bashful poses; Zip comet hauler with scarf, travel mug, and parked comet-truck silhouette; Reusable diner counter bays, booths, stool footprints, service turbines, menu boards, and dish basins; Cosmic food kit: ringed bagels, star-shaped toast, moon pies, comet noodles, herb pots, and syrup vessels; Traveler silhouettes for polar explorers, sun couriers, cave surveyors, and neighborhood regulars; Scripted serving, booth-arrival, parked-vehicle departure, and shared-breakfast tableau transitions.

### 16.01 — Open, Eventually

Scene 301 of 400 · Introduction · CURRENT RULES · Mix: kitchen + cosmos + town

**Setup.** A long ice rectangle covers the diner's OPEN sign. Miso sets one clean mug below it; Zip waits beside a parked comet truck.

**Puzzle.** MELT the whole sign using water at 10 degrees or warmer. Its long horizontal shape rewards a deliberate sweep from the accessible upper edge, not repeatedly pouring into one completed hole.

**Payoff.** The sign lights up and gains a small handwritten Under New Temperature notice. Zip raises the travel mug in what looks suspiciously like a relieved salute.

### 16.02 — One Cup, Two Jobs

Scene 302 of 400 · Introduction · CURRENT RULES · Mix: kitchen + town

**Setup.** A marked mug basin sits left of a separate warming-coaster badge. Mallow watches from the counter, proudly balancing a butter pat like a tiny captain's hat.

**Puzzle.** FILL the mug with liquid water, then WARM the unlocked coaster at 35–50 degrees and 15–35 percent pressure. The mug has no hidden heat requirement; the separate badge makes the temperature-and-pressure task explicit.

**Payoff.** Miso serves the finished mug to Zip. Mallow adds one dignified butter-pat salute and is immediately promoted to Breakfast Host.

### 16.03 — A Stool for a Long Journey

Scene 303 of 400 · Introduction · CURRENT RULES · Mix: kitchen + town + cosmos

**Setup.** Zip's travel scarf is frozen above an empty dotted stool footprint. A second, much smaller stool outline sits beside it for Mallow's first official break.

**Puzzle.** FREEZE both rectangular stool footprints at minus 10 degrees or colder, then MELT the scarf's packing target. The scarf requires both seats; sitting and scarf removal happen only in the completion vignette.

**Payoff.** Zip and Mallow settle side by side. Miso changes the sign from Quick Stop to Take the Time You Need, without raising the price of anything.

### 16.04 — Jukebox at the Edge of Space

Scene 304 of 400 · Introduction · CURRENT RULES · Mix: town + kitchen + cosmos

**Setup.** A frozen jukebox cover stands beside a low exposed turbine. Its illustrated record sleeve features a very serious asteroid playing an extremely small triangle.

**Puzzle.** MELT the cover, then SPIN the turbine with liquid water at 70 percent pressure or more. The two offset work zones invite a clear nozzle move; decorative notes are not targets or timing cues.

**Payoff.** The jukebox produces a cheerful visual music flourish. Zip taps the mug, Miso taps the counter, and Mallow contributes one perfectly adequate triangle-shaped butter pat.

### 16.05 — Their Usual, Not Yours

Scene 305 of 400 · Remix · CURRENT RULES · Mix: kitchen + cosmos + cave

**Setup.** A polar explorer and a sun courier have separate care badges at opposite counter ends. Their order pictures make it clear that comfortable breakfast temperatures are not universal.

**Puzzle.** WARM the explorer's badge at 15–30 degrees and 10–25 percent pressure; the courier's needs 65–85 degrees and 30–50 percent. Complete either first, then change settings; no simultaneous maintenance or spoiled-order penalty is required.

**Payoff.** Miso serves two visibly different breakfasts. The travelers exchange postcards instead of trying to persuade each other that one is eating incorrectly.

### 16.06 — Stars through the Menu

Scene 306 of 400 · Remix · CURRENT RULES · Mix: kitchen + cosmos

**Setup.** Two frozen menu-window rectangles hang over narrow condiment basins. One basin aligns with its window; the other sits visibly to the side beneath a painted star chart.

**Puzzle.** MELT each window, then FILL its associated basin directly through the cleared opening or from its open side. Complete the independent branches in either order; the star chart does not bend or attract water.

**Payoff.** The menu reveals constellations named after everyday breakfasts. Mallow points to a pancake-shaped moon and quietly begins practicing a more celestial posture.

### 16.07 — The Dish That Went Around

Scene 307 of 400 · Remix · CURRENT RULES · Mix: kitchen + town

**Setup.** A wide wash basin sits above a separate drying turbine. Three dirty-looking plates decorate a stationary rack to the side, where Miso has run out of tentacles for holding them.

**Puzzle.** FILL the wash basin, then reposition to SPIN the unlocked turbine above 70 percent pressure. Supply the wheel directly rather than expecting basin runoff; washing and rack rotation are explicitly completion animations.

**Payoff.** The clean plates appear in a neat stack. Miso frees one tentacle to pat Mallow's butter hat back into a less ambitious orbit.

### 16.08 — Cold Case, Warm Welcome

Scene 308 of 400 · Remix · CURRENT RULES · Mix: kitchen + cosmos + garden

**Setup.** A dotted dessert display stands beside an empty saucer basin and a hospitality badge. The special is a moon pie wearing a scarf.

**Puzzle.** FREEZE the display footprint and FILL the separate saucer in either order. Both unlock WARM on the hospitality badge at 25–40 degrees and 10–30 percent pressure; the finished cold display remains intact during the welcome task.

**Payoff.** The moon pie appears in its display and the scarf becomes bunting. Mallow decides moons can be delicious without needing to be enormous.

### 16.09 — Breakfast from the Crystal Cave

Scene 309 of 400 · Crossover · CURRENT RULES · Mix: cave + kitchen

**Setup.** A cave surveyor brings three frozen cases: tall, wide, and small. Miso's receiving basin waits below with clear overhead access.

**Puzzle.** MELT all three case targets, matching nozzle sweeps to their proportions rather than inventing pressure-sensitive fragile containers. Their completion unlocks FILL on the receiving basin; no loose crystal needs to be pushed into it.

**Payoff.** The cases reveal salt, spoons, and a very carefully packed thank-you pebble. Miso gives the pebble the best seat on the condiment shelf.

### 16.10 — Herbs with a View

Scene 310 of 400 · Crossover · CURRENT RULES · Mix: garden + kitchen + cosmos

**Setup.** Two herb-pot basins flank a dotted trellis on the windowsill. A painted nebula frames Miso's hopeful garnish vine.

**Puzzle.** FILL both pot basins with liquid water, then FREEZE the unlocked trellis footprint. The plants climb only in the reveal; their decorative growth never becomes a new wall or moving hose target.

**Payoff.** The vine forms a tiny green awning over the window. Zip receives a garnish leaf shaped like the home planet they were hoping to visit.

### 16.11 — The Regulars' Unusual Table

Scene 311 of 400 · Crossover · CURRENT RULES · Mix: town + kitchen + cosmos

**Setup.** A neighborhood table lacks two rectangular extensions of different lengths. Behind it, a frozen reservation block separates two welcome badges on the open counter.

**Puzzle.** FREEZE both extensions, MELT the reservation block, then WARM the two unlocked badges at 25–40 degrees and 10–30 percent pressure. The table is furnished in the reveal, not physically balanced on simulated ice supports.

**Payoff.** The reservation reads Anyone Who Calls This Their Usual. Travelers with very different silhouettes settle around the completed table without needing identical chairs.

### 16.12 — A Pit Stop for the Comet

Scene 312 of 400 · Crossover · CURRENT RULES · Mix: cosmos + town + kitchen

**Setup.** Zip's parked truck has a frozen hatch, separate coolant basin, and diagnostic turbine. Mallow has added a moon to its travel postcard.

**Puzzle.** MELT the hatch to unlock FILL on the coolant basin, then SPIN the diagnostic turbine above 70 percent pressure using liquid water. The truck stays stationary throughout; there is no thrust, steering, or moving service target.

**Payoff.** The completed diagnostic displays Ready, Whenever You Are. Zip keeps the engine illustration quiet and goes back inside to finish breakfast with Mallow.

### 16.13 — The Long Counter Shortens

Scene 313 of 400 · Complication · CURRENT RULES · Mix: kitchen + town + cosmos

**Setup.** Five small mug basins alternate heights along the counter. Illustrated travelers wait behind them, leaving every target's top accessible to the nozzle.

**Puzzle.** FILL each basin directly with liquid water. Plan a left-to-right or height-grouped route, moving close to the narrow cups instead of using pressure as a substitute for aim; no waiting customer imposes a timer.

**Payoff.** The served travelers slide closer together in a scripted reveal. What looked like a long service queue becomes one sprawling conversation about the best-looking nebula.

### 16.14 — The Long Way to the Pancakes

Scene 314 of 400 · Complication · FUTURE: FLOW · Mix: kitchen + garden + cosmos

**Setup.** An optional exhibit stacks three pancake basins in a zigzag. Ice closes both connecting outlets; a syrup-colored reservoir sits above the highest basin.

**Puzzle.** With FLOW, MELT the outlet blocks, then FILL the reservoir so persistent water fills each basin and overflows through its actual channel into the next. Work from either end before supplying water; no viscosity, cooking chemistry, or reversible construction is assumed.

**Payoff.** Three pancakes receive one continuous scenic syrup route. Mallow names the lower pancake breakfast with a particularly interesting journey.

### 16.15 — A Dish for Different Suns

Scene 315 of 400 · Complication · CURRENT RULES · Mix: kitchen + cosmos + garden

**Setup.** Three care badges form a triangle: cool dessert at lower left, warm noodles at lower right, and a sun-courier plate above.

**Puzzle.** WARM the badges at 15–30, 40–55, and 65–80 degrees respectively, all at 20–35 percent pressure. Choose a monotonic temperature route to reduce retuning, while moving above each target; completed dishes never cool back into unfinished tasks.

**Payoff.** Miso serves a three-temperature tasting tray. The customers swap stories instead of plates, discovering a much safer way to sample one another's home climates.

### 16.16 — The Smallest Order

Scene 316 of 400 · Complication · CURRENT RULES · Mix: town + kitchen

**Setup.** An enormous frozen order slip fills the counter above one dotted place-setting footprint and a small warmth badge.

**Puzzle.** MELT the broad slip to unlock FREEZE on the place-setting footprint, then WARM the final badge at 25–40 degrees and 10–25 percent pressure. The sequence becomes physically smaller and gentler as the actual request is revealed.

**Payoff.** The order reads Somewhere to Sit. Miso supplies the completed place, and Mallow quietly joins the traveler rather than offering an unnecessary special.

### 16.17 — Window Service, Without the Hurry

Scene 317 of 400 · Synthesis · CURRENT RULES · Mix: town + kitchen + garden + cosmos

**Setup.** Two narrow ice strips cover the serving window above separate collection basins. Outside, a comet truck, garden cart, and pedestrian form an illustrated queue.

**Puzzle.** Complete both MELT-to-FILL branches, then SPIN the unlocked service-sign turbine with liquid water above 70 percent pressure. The queue advances only after completion; there are no moving customer targets, deadlines, or vehicle collisions.

**Payoff.** The sign turns to Walk-ins Welcome Too. The person on foot receives the first wave from Miso, and Zip applauds from the parked truck.

### 16.18 — The Breakfast Beat

Scene 318 of 400 · Synthesis · FUTURE: PULSE · Mix: town + kitchen + cosmos

**Setup.** Three stationary turbines fill an optional jukebox exhibit. Their framed lights pulse slowly in a repeating pattern of large breakfast icons.

**Puzzle.** With PULSE, SPIN each turbine using liquid water above 70 percent pressure while its gate is open. Progress persists between cycles without penalty. Untimed accessibility mode holds the next light open until its turbine completes, using the same hose controls.

**Payoff.** The jukebox produces a three-part breakfast flourish. Miso, Zip, and Mallow each take one illustrated beat, leaving plenty of room between notes.

### 16.19 — Mallow's Modest Orbit

Scene 319 of 400 · Synthesis · CURRENT RULES · Mix: cosmos + kitchen + town

**Setup.** Mallow's moon ambition becomes a window display: a dotted rectangular stand, a frozen moon-shaped picture inside a rectangular case, and a gentle light-care badge set separately below.

**Puzzle.** FREEZE the stand before MELTing the picture's case, then WARM the badge at 25–40 degrees and 10–30 percent pressure. The stand remains fixed; no actual orbit, levitation, or gravitational effect is required.

**Payoff.** A soft moonlike lamp illuminates Mallow's welcome stool. Zip says the diner is now easy to find, and Mallow discovers a smaller, useful kind of shining.

### 16.20 — Breakfast Is a Place

Scene 320 of 400 · Finale · CURRENT RULES · Mix: kitchen + town + cosmos + garden

**Setup.** Three breakfast basins flank a frozen guestbook beneath Mallow's light. Miso's unlit place badge waits at the counter's quiet end.

**Puzzle.** FILL the three basins and MELT the guestbook in either branch order. All four preparations unlock Miso's WARM place badge at 30–45 degrees and 15–35 percent pressure. The final task is a gentle welcome, not another high-pressure departure.

**Payoff.** Miso sits down with the travelers. The guestbook fills with routes leading back to one diner, and its sign changes to See You Next Breakfast.

<a id="level-17"></a>

## Level 17 — Toybox After Bedtime

**Premise.** Captain Button, a one-eyed plush rabbit, recruits neglected toys into a night-shift rescue crew. Their newest member, a shy wind-up star called Glim, thinks being small means being useless.

**Story arc.** Repair the playroom's little routines, take the toys on make-believe expeditions, then build a nightlight parade in which Glim becomes the guide rather than the passenger.

**Signature.** Oversized everyday furniture frames tiny service stations; visible patchwork repairs, toy-scale rescue equipment, and transformations from pretend play into practical kindness.

**Reusable art kit:** Captain Button plush rabbit; Glim wind-up star; tin duck Jun; wooden train and blocks; dollhouse furniture; toy planets and cardboard rockets; patchwork parade float.

### 17.01 — One Brave Wooden Wheel

Scene 321 of 400 · Introduction · CURRENT RULES · Mix: town

**Setup.** Jun's toy fire engine sits beside the toybox with one ice-coated wheel and a very serious cardboard rescue badge.

**Puzzle.** Melt the wheel's broad ice cap, then SPIN its exposed axle with liquid water at 70% pressure or more. These are separate targets; the engine moves only in the completion animation.

**Payoff.** Jun advances exactly one wooden block and declares the station operational. Button salutes the shortest emergency response on record.

### 17.02 — Stuffing, Not Steaming

Scene 322 of 400 · Introduction · CURRENT RULES · Mix: town + kitchen

**Setup.** Button's patched sleeve has frozen stiff while his detachable badge rests at a lower repair station.

**Puzzle.** Thaw the sleeve's ice rectangle, then WARM the badge at 25–45° and 10–35% pressure. The badge's warming target, not the melting task, enforces gentle handling.

**Payoff.** Button can wave again. He uses the restored arm to offer Glim a place on the crew instead of another inspection.

### 17.03 — The Dollhouse Tea Summit

Scene 323 of 400 · Introduction · CURRENT RULES · Mix: kitchen

**Setup.** Three mismatched dolls await tea around a table too small for their extremely large diplomatic hats.

**Puzzle.** FILL two side-by-side cups with liquid water in either order. Both unlock a central WARM teapot target at 30–50° and 10–45% pressure; the shared final pour is scripted.

**Payoff.** The dolls replace their seating dispute with a biscuit-sharing agreement. Jun eats the cardboard biscuit and politely regrets it.

### 17.04 — Glim's First Perch

Scene 324 of 400 · Introduction · CURRENT RULES · Mix: cave + cosmos

**Setup.** Glim's tiny boots are frozen above a dotted star-shaped landing assembly made from three rectangular construction zones.

**Puzzle.** FREEZE all three low landing sections, then melt the raised boot block. Glim's fall is a completion cutaway after the support tasks are finished, not live support physics.

**Payoff.** Glim lands safely, discovers the perch fits perfectly, and asks whether rescuers are allowed to be rescued sometimes. Button nods.

### 17.05 — Marble Soup Kitchen

Scene 325 of 400 · Remix · CURRENT RULES · Mix: kitchen + town

**Setup.** Hungry marbles queue behind a pretend soup counter; its two serving stations have different-sized ice caps.

**Puzzle.** Clear both caps by sweeping across their widths, then FILL their exposed bowls. Finish by WARMING the chef's tasting spoon at 25–40° and 10–35% pressure.

**Payoff.** The marbles gather around a steaming pot without becoming ingredients. The chef revises the menu's troubling punctuation.

### 17.06 — A Bridge for the Longest Dog

Scene 326 of 400 · Remix · CURRENT RULES · Mix: garden

**Setup.** A wooden pull-along dachshund spans most of a chalk river, but its tail still needs a place to stand.

**Puzzle.** FREEZE three separated bridge footprints from near bank to far bank in any order. Their joint completion unlocks the dog's frozen departure tag; melting it triggers the crossing cutaway.

**Payoff.** The dog crosses for an absurdly long time. Glim walks beside its tail and is promoted to rear-end navigation officer.

### 17.07 — Xylophone Lunch Break

Scene 327 of 400 · Remix · CURRENT RULES · Mix: town + kitchen

**Setup.** A toy xylophone's four bright keys are encased in separate narrow ice targets, with a turbine music stand beside them.

**Puzzle.** Sweep across the four fixed ice strips, using nozzle position rather than any rhythm requirement. Clearing all four unlocks a high-pressure SPIN target that starts the tune.

**Payoff.** The xylophone plays a four-note lunch announcement. Every toy knows the words despite there being no words.

### 17.08 — The Snow Globe Inside Job

Scene 328 of 400 · Remix · CURRENT RULES · Mix: cave + garden

**Setup.** A miniature explorer waves from a glass-free display globe with a frozen entrance, empty pond, and dotted snowbank.

**Puzzle.** Melt the entrance cap to unlock the pond and snowbank stations. FILL the pond with liquid water, then change to cold water to FREEZE the bank; both enable a WARM welcome lamp at 25–45° and 10–35% pressure.

**Payoff.** The explorer leaves the globe to inspect a much larger globe: a football. Glim brings a map made from a napkin.

### 17.09 — Cardboard Launch Authority

Scene 329 of 400 · Crossover · CURRENT RULES · Mix: cosmos + cave

**Setup.** A cardboard rocket has borrowed the space wizard's boots as thrusters, one at either side of its launch card.

**Puzzle.** Melt both boot ice blocks and FREEZE two rectangular exhaust-display footprints below the rocket. All four preparations unlock the central high-pressure SPIN starter; launch motion remains a scripted reveal.

**Payoff.** The rocket rises on a plainly visible string. The wizard insists the string is a highly advanced propulsion spell.

### 17.10 — Dinosaur in the Crayon Garden

Scene 330 of 400 · Crossover · CURRENT RULES · Mix: garden + town

**Setup.** A visiting preschool dinosaur has mistaken a row of crayons for flowerbeds; three toy sprouts have distinct climate badges.

**Puzzle.** FREEZE the blue sprout's pot footing, WARM the yellow sprout at 25–45°, and WARM the orange sprout at 55–75°. Both warmth goals use 10–45% pressure and can be serviced in either order.

**Payoff.** The crayons become a colorful garden in the ending illustration. The dinosaur names every flower after Button.

### 17.11 — A Sock Ghost's Sleepover

Scene 331 of 400 · Crossover · CURRENT RULES · Mix: town + kitchen

**Setup.** A friendly guest from the sock exchange arrives with a frozen overnight bag and a tiny empty hot-water bottle.

**Puzzle.** Melt the bag's broad ice panel, FILL the bottle target, then WARM a separate comfort patch at 30–45° and 10–35% pressure. The ghost itself is presentation, not a moving target.

**Payoff.** The ghost curls up in a spare mitten. Jun asks if it needs the light on and gets a relieved nod.

### 17.12 — Moon Cheese, Toy Size

Scene 332 of 400 · Crossover · CURRENT RULES · Mix: cosmos + kitchen

**Setup.** The kitchen's toy moon has frozen above a cheese-board observatory, and its astronomer is a very optimistic mouse.

**Puzzle.** FREEZE two telescope feet, melt the moon's ice shell, then WARM its exposed center at 35–55° with 10–35% pressure. The new footing is stable after completion.

**Payoff.** The telescope points at the moon; the mouse points at the cheese. They agree this counts as interdisciplinary research.

### 17.13 — The Little Red Repair Line

Scene 333 of 400 · Complication · CURRENT RULES · Mix: town

**Setup.** Three toys offer separate repair stations along a diagonal shelf: a frozen helmet, an empty canteen, and a stiff comfort patch.

**Puzzle.** MELT, FILL, and WARM the three stations with different nozzle positions and settings. Only the comfort patch requires 20–40° and 10–30% pressure; completing all stations unlocks the crew's SPIN stamp.

**Payoff.** Glim runs the inspection queue and remembers everyone's name. Button quietly moves the captain's badge out of sight.

### 17.14 — Seesaw for a Feather Captain

Scene 334 of 400 · Complication · FUTURE: BALANCE + PHASE · Mix: garden + town

**Setup.** Button and a feather-light toy admiral sit on opposite ends of a real hinged seesaw above a foam playmat.

**Puzzle.** Grow ice ballast in two marked cups and melt it back until the BALANCE system reports a level beam. PHASE permits adjusting already-formed ballast; tilt, not a completion checklist, determines success.

**Payoff.** The admiral finally sees over the toybox rim and spots the parade route. Button admits balance is harder than bravery.

### 17.15 — The Hottest Seat in Pretend Town

Scene 335 of 400 · Complication · CURRENT RULES · Mix: town + cave

**Setup.** A plush bus has four passenger benches and two conspicuous service panels, one frosty and one overheated-looking.

**Puzzle.** Melt the frosty panel, build a separate FREEZE cooling block, then WARM the ticket pad at 25–45° and 10–35% pressure. Cooling the pictured bus is the payoff, not a simulated temperature network.

**Payoff.** The passengers stop hopping between seats. Glim takes the driver's helper seat and gets to ring the departure bell.

### 17.16 — Biscuit Tin Mountain Rescue

Scene 336 of 400 · Complication · CURRENT RULES · Mix: cave + kitchen

**Setup.** Jun is marooned on a stack of biscuit tins while Button lays out three low rescue-platform blueprints.

**Puzzle.** Build two independent rescue branches: the left FREEZE platform unlocks the left MELT tag; the two right FREEZE platforms jointly unlock the right MELT tag. Complete both branches to trigger Jun's scripted descent.

**Payoff.** Jun climbs down carrying a biscuit larger than the rescue vehicle. It is labelled essential equipment.

### 17.17 — Stars Without Stage Fright

Scene 337 of 400 · Synthesis · CURRENT RULES · Mix: town + cosmos

**Setup.** Glim faces a practice audience of painted blocks; two oversized ice curtains flank a little unlit star podium.

**Puzzle.** Melt the left and right curtain targets, then WARM the stationary podium at 30–50° and 10–40% pressure. A separate SPIN applause wheel unlocks only after Glim's station is ready.

**Payoff.** The blocks applaud with tiny hinged hands. Glim discovers that being seen can feel different from being inspected.

### 17.18 — The Rotating Biscuit Planet

Scene 338 of 400 · Synthesis · FUTURE: MOTION · Mix: cosmos + kitchen

**Setup.** A toy planetarium carries three ice-coated biscuit moons around a central lamp on clearly visible mechanical arms.

**Puzzle.** Use the MOTION system's slow orbital targets: position the nozzle above an orbit, then track the moons as they pass through the stream. Melt all three; orbit speed has a stationary assist setting.

**Payoff.** The lamp reveals constellation-shaped biscuit crumbs. Jun insists the newly discovered Duck Nebula always existed.

### 17.19 — Parade With a Spare Button

Scene 339 of 400 · Synthesis · CURRENT RULES · Mix: town + garden

**Setup.** The repaired toys assemble a float with an empty reservoir, frozen axle, and unfinished front-and-rear ice decorations.

**Puzzle.** Complete two parallel preparations: MELT then SPIN the axle, and FREEZE both decoration zones then FILL the reservoir. Their joint completion unlocks a 30–50° WARM signal lamp. WARM targets use 10–35% pressure.

**Payoff.** Every repaired toy takes a visible job on the float. Button's missing eye becomes the emblem on the parade banner.

### 17.20 — The Smallest Light Goes First

Scene 340 of 400 · Finale · CURRENT RULES · Mix: town + cosmos + kitchen

**Setup.** The toybox doorway becomes a grand night parade route, with Glim's lamp between two frosted departure pennants.

**Puzzle.** FREEZE two route-marker bases, melt both pennants, FILL the lamp's decorative fuel cup, then WARM its separate glow target at 35–55° and 10–35% pressure. Finish with the high-pressure departure SPIN wheel.

**Payoff.** Glim leads the whole parade across the sleeping room as its new nightlight. Button follows, finally comfortable not being first.

<a id="level-18"></a>

## Level 18 — Apocalypse, Rescheduled

**Premise.** An ominous moth named Ann delivers an END OF THE WORLD notice. The Four Ponies of Mild Inconvenience and a very small stone giant help the squad investigate one suspiciously fixable omen after another.

**Story arc.** Replace panic with practical help, discover that the notice meant an end-of-day celebration, and transform the supposed instruments of doom into neighborhood party equipment.

**Signature.** Grand prophetic silhouettes contrasted with tiny domestic inconveniences; red warning seals become warm lamps, and ominous machines reveal charming everyday jobs.

**Reusable art kit:** Ann the paperwork moth; Four Ponies of Mild Inconvenience; pocket stone giant; omen billboards and warning seals; marshmallow meteor; tiny kraken kettle; end-of-day party platform.

### 18.01 — A Notice Written in Frost

Scene 341 of 400 · Introduction · CURRENT RULES · Mix: town

**Setup.** Ann pins an enormous frosted warning notice above a small town bell. The signature is hidden beneath a second ice patch.

**Puzzle.** Melt the broad notice panel and the narrower signature patch separately. Both unlock a high-pressure SPIN bell target; revealing writing is a scripted effect, not letter-recognition gameplay.

**Payoff.** The signature reads Regards, Scheduling. Ann admits this sounds less cosmic than expected, but keeps her emergency clipboard.

### 18.02 — The Pony of Late Breakfast

Scene 342 of 400 · Introduction · CURRENT RULES · Mix: kitchen + town

**Setup.** The first ominous pony blocks nothing at all; it is simply standing beside a frozen cereal bowl and an empty milk cup.

**Puzzle.** Melt the cereal's ice cap, FILL the adjacent cup, then WARM a separate serving-spoon target at 25–40° with 10–35% pressure. All three stations remain stationary.

**Payoff.** The pony eats breakfast and changes its title to The Pony of Reasonably Soon. Its threatening banner becomes a napkin.

### 18.03 — Meteor With a Soft Center

Scene 343 of 400 · Introduction · CURRENT RULES · Mix: cosmos + garden

**Setup.** A marshmallow meteor rests safely in a display crater while the pocket giant frets over a frozen roasting stand.

**Puzzle.** FREEZE two marked cradle feet, melt the meteor's ice shell, then WARM its exposed marshmallow badge at 30–50° and 10–35% pressure. No actual falling or impact simulation is involved.

**Payoff.** The meteor unfolds into a picnic centerpiece. The giant takes a crumb-sized bite and declares the planet deliciously safe.

### 18.04 — The Dramatic Last Kettle

Scene 344 of 400 · Introduction · CURRENT RULES · Mix: kitchen + cave

**Setup.** A tiny kraken peers from an empty kettle beneath a melodramatic Steam of Destiny sign.

**Puzzle.** Melt the spout's ice block, FILL the kettle basin, then WARM a separate tea charm at 35–55° and 10–45% pressure. The steam display appears only after the charm is ready.

**Payoff.** Eight tiny tentacles distribute tea. The prophecy turns out to describe a beverage with a very enthusiastic marketing department.

### 18.05 — Seven Seals and One Walrus

Scene 345 of 400 · Remix · CURRENT RULES · Mix: town + cave

**Setup.** Seven little ice seals sit in a broad arc around a walrus who is embarrassed by the accidental wordplay.

**Puzzle.** Melt the seven small fixed ice blocks, choosing the sweep direction. Their joint completion unlocks a WARM (10–35% pressure) applause badge at 25–45°; no animal must be targeted with the stream.

**Payoff.** The walrus opens seven envelopes, all party invitations. Ann starts a folder marked Evidence Against Doom.

### 18.06 — The River of Tomato Soup

Scene 346 of 400 · Remix · CURRENT RULES · Mix: kitchen + garden

**Setup.** A painted river of red soup has three disconnected serving basins and an unlit welcome lantern along its bank.

**Puzzle.** FILL each independent basin with liquid water; painted river art does not connect them. All three unlock the WARM lantern at 30–50° and 10–35% pressure, revealing the soup-kitchen scene.

**Payoff.** The apparently alarming river becomes the longest lunch counter in town. The second pony requests a smaller spoon.

### 18.07 — A Crack in the Picnic

Scene 347 of 400 · Remix · CURRENT RULES · Mix: garden + cave

**Setup.** An illustrated fault line divides a picnic blanket into four patches. The pocket giant has arrived with four marked repair footprints.

**Puzzle.** FREEZE all four narrow footprints, then melt two ice-covered basket clasps at opposite ends. The blanket joins in the ending animation; completed ice does not need physical support behavior.

**Payoff.** The giant sits down and is immediately offered the only normal-sized sandwich. It is taller than the giant.

### 18.08 — Ominous Choir, Warm-Up Please

Scene 348 of 400 · Remix · CURRENT RULES · Mix: town + kitchen

**Setup.** Three prophecy singers stand behind climate-labelled vocal-care stations. Their frozen music stand occupies the lower corner.

**Puzzle.** WARM the stations at 20–35°, 35–50°, and 50–65°, all at 10–40% pressure. Finish by melting the music-stand cap; the choir has no timed or pitch-matching input.

**Payoff.** The choir sings an uplifting shopping list. Nobody recalls why they originally rehearsed it in a minor key.

### 18.09 — The Dragon Has a Calendar

Scene 349 of 400 · Crossover · CURRENT RULES · Mix: town + cosmos

**Setup.** Emberborough lends a dragon clerk to inspect the notice. Its frozen desk calendar sits above an empty ink basin.

**Puzzle.** Melt both calendar-page ice panels, FILL the ink basin, and SPIN the large date stamp at high pressure. The stamp unlocks only when both pages and the basin are ready.

**Payoff.** The dragon circles End of Day, not End of World. Ann demands a second opinion from someone with smaller handwriting.

### 18.10 — Dream of an Unmade Bed

Scene 350 of 400 · Crossover · CURRENT RULES · Mix: cave + town

**Setup.** A borrowed dream-workshop bed hovers in the illustration while three fixed service targets sit on clearly grounded maintenance stands.

**Puzzle.** FREEZE a dream-anchor footprint, melt the pillow's separate ice cap, then WARM the bedtime charm at 25–45° with 10–35% pressure. The floating bed remains decorative, never a moving goal.

**Payoff.** The third pony awakens from a nightmare about laundry. It is visibly relieved to learn this is still a manageable problem.

### 18.11 — Soup Tributaries of Destiny

Scene 351 of 400 · Crossover · FUTURE: FLOW + PHASE · Mix: kitchen + garden

**Setup.** Three real channels connect an upper soup reservoir to neighborhood bowls. Two adjustable ice plugs visibly determine which route receives water.

**Puzzle.** Use FLOW to fill every connected bowl, freezing and remelting the plugs to redirect runoff. PHASE makes completed plugs reversible. Reservoir liquid, not direct hits on downstream target zones, supplies the bowls.

**Payoff.** A map of ominous tributaries becomes a map of dinner deliveries. The walrus appoints itself ambassador for second helpings.

### 18.12 — A Mushroom Track to Tomorrow

Scene 352 of 400 · Crossover · CURRENT RULES · Mix: garden + town

**Setup.** The mushroom railway offers a final train, but its conductor clarifies that this merely means the last service before supper.

**Puzzle.** FREEZE two station-platform footprints, melt the engine badge's ice cap, then SPIN the stationary departure wheel. The train departs in a cutaway after all targets finish, with no moving hitboxes.

**Payoff.** The fourth pony catches the train and leaves its doom banner behind. The conductor folds it into an excellent picnic cloth.

### 18.13 — The Missing Small Print

Scene 353 of 400 · Complication · CURRENT RULES · Mix: town + cosmos

**Setup.** Ann finds four separated ice-covered footnote cards arranged around a central moth-sized reading lamp.

**Puzzle.** Melt the four cards in any order, then WARM the lamp at 25–40° and 10–30% pressure. The last prerequisite reveals the printed clarification; the player does not need to read tiny text to solve it.

**Payoff.** Huge lettering spells out Celebration, Bring Snacks. Ann relaxes for the first time and requests a very small chair.

### 18.14 — The Doom Clock's Tea Chime

Scene 354 of 400 · Complication · FUTURE: PULSE · Mix: town + kitchen

**Setup.** An elaborate clock exposes three fixed turbine bells in succession, each framed by a large, slowly pulsing ring.

**Puzzle.** Use PULSE gates to SPIN only the currently open bell with high-pressure liquid water. Success advances the chime sequence; missed windows simply repeat. An untimed mode leaves each bell open until serviced.

**Payoff.** The terrifying countdown ends with a polite kettle whistle. The pocket giant pours tea as though this was obvious all along.

### 18.15 — Banners With Less Foreboding

Scene 355 of 400 · Complication · CURRENT RULES · Mix: town + garden

**Setup.** Three icy warning pennants hang above separate low decoration moulds. The new party artwork is visible on tags beside them.

**Puzzle.** Melt all three pennant caps, then FREEZE the three unlocked decoration footprints. A final WARM welcome seal at 30–50° joins the two preparation stages without requiring real fabric or paint simulation. WARM targets use 10–35% pressure.

**Payoff.** Beware becomes Be Here. Abandon Hope becomes Abundant Soup. Ann keeps one tiny skull because she likes its smile.

### 18.16 — The Giant's Very Small Job

Scene 356 of 400 · Complication · CURRENT RULES · Mix: kitchen + town

**Setup.** The pocket giant gets its own serving station: a frozen stool, empty cup, and comfortably warm hand-rest badge.

**Puzzle.** Melt the stool's ice, FILL the cup, then WARM the hand-rest at 25–45° and 10–35% pressure. Independently FREEZE both table footings. All five preparations unlock the final SPIN service bell at 70% pressure or more.

**Payoff.** The giant becomes host instead of heavy equipment. Every guest bends down to ask for its recommendation.

### 18.17 — Four Ponies, Four Useful Errands

Scene 357 of 400 · Synthesis · CURRENT RULES · Mix: kitchen + garden + town

**Setup.** The four ponies line up at distinct party stations: frozen bun tray, empty drinks bowl, unfinished ice pedestal, and comfort lantern.

**Puzzle.** Service the MELT, FILL, FREEZE, and WARM stations in any order; the lantern wants 30–50° at 10–40% pressure. All four unlock a shared high-pressure SPIN parade wheel.

**Payoff.** Their banners now read Breakfast, Naps, Snacks, and Company. Nobody misses the previous branding, including the ponies.

### 18.18 — Constellation of Mild Reassurance

Scene 358 of 400 · Synthesis · FUTURE: OPTICS + PHASE · Mix: cosmos + town

**Setup.** A real light beam enters three ice prisms above a town-scale star map. Its intended landing points form a smiling constellation.

**Puzzle.** Grow or erode each fixed prism using PHASE, following visible notch/full-height marks. OPTICS traces actual beams: left-notched reaches the left star, center-full reaches the middle star, right-notched reaches the right star. Adjust until all detectors are lit; illustrated ray guides make the geometry readable.

**Payoff.** A huge reassuring face appears in the sky. Ann points out that the face has a biscuit crumb on its chin.

### 18.19 — Invitations for the Nervous

Scene 359 of 400 · Synthesis · CURRENT RULES · Mix: town + kitchen

**Setup.** Formerly worried neighbors wait beside two frozen invitation boards and a welcoming refreshment station, visibly hesitant rather than obstructing the nozzle.

**Puzzle.** Melt both boards, FILL the two refreshment cups, and WARM separate welcome badges at 25–45°. All preparation targets unlock a final SPIN doorbell; guests move only in the reveal. WARM targets use 10–35% pressure.

**Payoff.** The neighbors bring chairs instead of emergency bags. Ann makes sure the quietest guest has a seat near an exit.

### 18.20 — A Perfectly Ordinary Tomorrow

Scene 360 of 400 · Finale · CURRENT RULES · Mix: town + cosmos + garden + kitchen

**Setup.** The supposed doom platform is now a party stage with a frozen date sign, two ice-decoration footprints, drinks bowl, and sunset lantern.

**Puzzle.** Build both FREEZE decorations and melt the date sign, then FILL the bowl. WARM the sunset lantern at 35–55° with 10–35% pressure before SPINNING the celebration bell. All goals use existing rules.

**Payoff.** The sign flips to See You Tomorrow. Ann turns off her emergency clipboard light and finally joins the ponies at the table.

<a id="level-19"></a>

## Level 19 — The Hotel Between Tuesdays

**Premise.** Ms Between, a six-armed cuttlefish receptionist, runs a hotel for guests stranded between peculiar destinations. Yesterday the snail porter worries that useful service always means arriving faster.

**Story arc.** Prepare extraordinary rooms, welcome familiar travelers, and help Yesterday discover that remembering a guest's needs matters more than speed. The hotel becomes a place to belong, not just somewhere to pass through.

**Signature.** Cutaway rooms with impossible illustrated views, fixed brass service stations, luggage of absurd scale, and consistent warm hotel signage grounding every strange setting.

**Reusable art kit:** Ms Between receptionist; Yesterday snail porter; brass hotel fixtures; cutaway guest rooms; impossible window postcards; nested suitcases; aquarium lift; shared departure lounge.

### 19.01 — The Bell Before the Door

Scene 361 of 400 · Introduction · CURRENT RULES · Mix: town

**Setup.** The hotel entrance is drawn behind a reception desk whose bell is hidden in an oversized ice cube.

**Puzzle.** Melt the bell's ice target, then SPIN its exposed high-pressure ringer. A separate WARM welcome seal at 25–45° finishes the greeting; the illustrated door opens only in the payoff. WARM targets use 10–35% pressure.

**Payoff.** Ms Between answers before the bell stops ringing. Yesterday arrives with the welcome mat, only slightly after the welcome.

### 19.02 — A Room With a View of Monday

Scene 362 of 400 · Introduction · CURRENT RULES · Mix: garden + town

**Setup.** A window displays a rainy Monday while two fixed bedside maintenance targets show a frozen curtain catch and an empty flower vase.

**Puzzle.** Melt the curtain catch, FILL the vase, then WARM the bedside lamp at 30–50° and 10–40% pressure. The weekday outside is a before/after illustration, not a clock-driven state.

**Payoff.** The window reveals the one pleasant minute of Monday. Yesterday writes it down so the next guest can see it too.

### 19.03 — A Pillow That Woke Up Early

Scene 363 of 400 · Introduction · CURRENT RULES · Mix: cave + town

**Setup.** A grumpy cloud-shaped pillow waits beside a frozen blanket badge and a small dotted bedside snowbank.

**Puzzle.** FREEZE the snowbank footprint, melt the blanket badge's ice cap, and WARM a separate bedtime charm at 20–35° with 10–35% pressure. Both preparations must finish before the charm responds.

**Payoff.** The pillow finally yawns and settles. Ms Between awards Yesterday a silent bell for especially considerate room service.

### 19.04 — Check-In for a Raincloud

Scene 364 of 400 · Introduction · CURRENT RULES · Mix: garden + town

**Setup.** A raincloud guest hovers decoratively above two empty umbrella-shaped basins; its luggage tag is encased in ice on a fixed stand.

**Puzzle.** FILL both basins directly, then melt the luggage-tag block. Their completion unlocks a 25–45° WARM guest badge. Rain falls only in the ending, with no simulated collection before success. WARM targets use 10–35% pressure.

**Payoff.** The cloud signs with a tiny rainbow. Yesterday produces an umbrella for the luggage rather than for himself.

### 19.05 — Breakfast at Almost Midnight

Scene 365 of 400 · Remix · CURRENT RULES · Mix: cosmos + kitchen

**Setup.** Two adjacent room-service trays belong to a sleepy sun and an energetic moon, with contrasting temperature labels on their warming stations.

**Puzzle.** Melt the shared serving hatch's ice cap, FILL both drink cups, then WARM the sun's station at 50–70° and the moon's at 20–40°, both using 10–35% pressure.

**Payoff.** The guests exchange dishes and decide they prefer each other's breakfast. The temperature choices remain on the receipt as helpful suggestions.

### 19.06 — The Staircase Takes Annual Leave

Scene 366 of 400 · Remix · CURRENT RULES · Mix: town + cave

**Setup.** The drawn staircase is enjoying a holiday postcard while three marked temporary stair sections await construction beside it.

**Puzzle.** FREEZE all three fixed stair footprints, then melt the luggage trolley's release badge and SPIN its stationary axle. The trolley climbs only in the ending; ice steps are not simulated supports.

**Payoff.** The staircase returns carrying souvenirs and finds everything handled. Yesterday receives a postcard addressed to The Reliable One.

### 19.07 — The Suitcase With a Conservatory

Scene 367 of 400 · Remix · CURRENT RULES · Mix: garden + town

**Setup.** An open suitcase reveals a tiny greenhouse cutaway, with an icy latch outside and three reachable service targets inside.

**Puzzle.** Melt the latch, then independently FILL the water tank and FREEZE a plant-bed footprint. Both unlock a WARM orchid marker at 25–45° and 10–35% pressure; perspective is decorative, not a second physics scale.

**Payoff.** A bellhop-sized vine offers Yesterday a flower. He carefully records which room prefers sunlight without luggage handling.

### 19.08 — Wake-Up Call for a Small Planet

Scene 368 of 400 · Remix · CURRENT RULES · Mix: cosmos + kitchen

**Setup.** A sleepy planet fills the honeymoon observatory illustration; its wake-up equipment sits on two fixed bedside stands.

**Puzzle.** Melt separate ice caps over a clock turbine and a tea cup, then SPIN the turbine and FILL the cup. Their joint completion opens a gentle 35–55° WARM sunrise badge. WARM targets use 10–35% pressure.

**Payoff.** The planet opens one eye and asks for five more geological minutes. Ms Between grants a late checkout.

### 19.09 — Two Universes, One Honeymoon

Scene 369 of 400 · Crossover · CURRENT RULES · Mix: cave + garden + kitchen

**Setup.** The wedding planners deliver two guests whose half-rooms show a snowy cave and a flowering garden, joined by a shared breakfast nook.

**Puzzle.** FREEZE the cave-side decoration, WARM the garden-side welcome lamp at 30–50°, then FILL two nook cups. Both climate preparations must finish before the drinks station becomes active. WARM targets use 10–35% pressure.

**Payoff.** The couple eats facing the shared window rather than either private view. Yesterday remembers which guest likes the blue cup.

### 19.10 — The Preschool Conference Wing

Scene 370 of 400 · Crossover · CURRENT RULES · Mix: garden + town + kitchen

**Setup.** Dinosaur preschool staff arrive with a towering stack of naptime mats and an ice-coated seminar bell.

**Puzzle.** Melt the bell cap, FREEZE two low mat-rack footprints, and WARM a stationary milk badge at 25–40° and 10–30% pressure. The prepared nursery unlocks a SPIN quiet-time sign instead of a loud bell.

**Payoff.** Every adult dinosaur falls asleep during the presentation. The hatchlings tuck them in and appoint Yesterday temporary head teacher.

### 19.11 — Laundry Delivered by Moonlight

Scene 371 of 400 · Crossover · CURRENT RULES · Mix: town + kitchen

**Setup.** Sock-exchange staff leave three chilled linen parcels at successively higher service stands, plus a tiny empty guest-bath basin.

**Puzzle.** Melt each parcel's fixed ice wrapper from above or with nozzle tilt, then FILL the basin. All wrappers and the basin unlock a WARM towel badge at 30–50° and 10–35% pressure.

**Payoff.** The linen unfolds into a blanket fort for an homesick ghost. Yesterday stays outside the fort until invited in.

### 19.12 — A Train on the Balcony

Scene 372 of 400 · Crossover · CURRENT RULES · Mix: garden + town

**Setup.** A mushroom railway carriage appears in the balcony illustration; the room contains two platform footprints and a stationary conductor's service board.

**Puzzle.** FREEZE the platform zones, melt the board's timetable cap, then SPIN its departure seal. Both platform sections must be complete before the seal can respond; the carriage's departure is scripted.

**Payoff.** The conductor offers Yesterday a tour, but he first checks whether the guest wants the curtains closed. The train waits happily.

### 19.13 — The Lift That Keeps Fish

Scene 373 of 400 · Complication · FUTURE: MOTION · Mix: town + cave

**Setup.** An aquarium lift moves slowly between three floors, carrying fixed-to-the-cabin frosted window targets past the open maintenance shaft.

**Puzzle.** Use MOTION to track and melt the lift's three moving ice targets, then service its moving WARM cabin badge at 25–45° and 10–35% pressure. A stationary assist stops cabin motion without changing the thermal goals.

**Payoff.** The fish point out each floor like proud tour guides. Yesterday learns the lift stops wherever someone looks interested.

### 19.14 — Two Guests, Four Slippers

Scene 374 of 400 · Complication · CURRENT RULES · Mix: cave + cosmos + kitchen

**Setup.** A snow giant and a miniature sun share a lounge, each with two labelled stationary slipper-care stations well away from their bodies.

**Puzzle.** FREEZE the giant's two slipper forms and WARM the sun's two badges at 55–75° and 10–45% pressure. Finish with a shared liquid-water FILL tea bowl; the two climate needs are independent, not coupled.

**Payoff.** The guests swap stories instead of arguing over the thermostat. Yesterday brings an extra cushion sized for nobody in particular.

### 19.15 — Checkout Before Check-In

Scene 375 of 400 · Complication · CURRENT RULES · Mix: town + kitchen

**Setup.** A guest from the wrong Tuesday has put its departure card above its still-frozen welcome basket, confusing the reception desk.

**Puzzle.** Follow a clear target chain: melt the departure card, WARM its seal at 30–45°, then FILL the newly unlocked welcome cup. SPIN the date stamp only after the cup is full. WARM targets use 10–35% pressure.

**Payoff.** Ms Between stamps both cards Welcome Anyway. Yesterday decides that calendars are less important than whether someone has eaten.

### 19.16 — Room Service by Tributary

Scene 376 of 400 · Complication · FUTURE: FLOW · Mix: town + kitchen + garden

**Setup.** A cutaway wall reveals one upper reservoir feeding three guest-room basins through visible channels with fixed ice gates.

**Puzzle.** Melt the gates to establish FLOW connections, then feed the upper reservoir. The three downstream basins must receive actual routed liquid; hitting their illustrated cups directly does not count as delivery.

**Payoff.** Three guests raise their cups at the same time. Yesterday follows the channels with a tiny tray just in case.

### 19.17 — The Guest With an Empty Name Tag

Scene 377 of 400 · Synthesis · CURRENT RULES · Mix: town + garden

**Setup.** A coat-shaped traveler worries that its blank luggage label means no room is available. A frozen tag hangs directly above an active welcome bowl, with a separate seal target off to the side.

**Puzzle.** The MELT tag and FILL bowl are both active from the start, with the bowl directly below the ice. Carve a hole so hose droplets reach the bowl before the remaining ice is cleared. Both completions unlock a WARM welcome seal at 25–45° and 10–35% pressure.

**Payoff.** The label becomes Guest, with a little heart. The coat sits comfortably instead of hovering near the exit.

### 19.18 — A Night Desk for the Night Desk

Scene 378 of 400 · Synthesis · CURRENT RULES · Mix: town + kitchen

**Setup.** Ms Between's own tiny break room is hidden inside the reception model, with reachable service zones arranged diagonally across the cutaway.

**Puzzle.** Melt the frozen chair badge, FILL the tea cup, and WARM a reading lamp at 30–45° with 10–35% pressure. A final SPIN privacy-sign wheel marks the end of her shift.

**Payoff.** Yesterday takes the desk without making a speech. Ms Between uses all six arms to do absolutely nothing.

### 19.19 — Keys to Small Kindnesses

Scene 379 of 400 · Synthesis · CURRENT RULES · Mix: garden + cosmos + town

**Setup.** Three returning guests wait beside personalized key stations: a cloud's icy perch, a planet's warm lamp, and a ghost's frozen blanket clasp.

**Puzzle.** FREEZE the perch, WARM the lamp at 40–60°, and melt the blanket clasp. Their joint completion unlocks two shared FILL refreshments; station badges distinguish each job without a new matching minigame. WARM targets use 10–35% pressure.

**Payoff.** Yesterday hands out the right rooms without checking a list. The guests greet him by name before thanking the receptionist.

### 19.20 — No One Leaves Through an Empty Lobby

Scene 380 of 400 · Finale · CURRENT RULES · Mix: town + garden + cosmos + kitchen

**Setup.** The departure lounge gathers the hotel's guests around a frozen route board, two unfinished ice lantern bases, and a shared tea service.

**Puzzle.** Melt the route board and FREEZE both bases, then FILL two cups. WARM the lounge beacon at 30–50° with 10–35% pressure before SPINNING the departure bell. All prerequisites are within this scene.

**Payoff.** Every guest pauses to wave to Yesterday. The last room card reads Always Welcome, including on Wednesdays.

<a id="level-20"></a>

## Level 20 — The Great Thaw Festival

**Premise.** The squad's new friends meet in one expandable illustrated festival square. A shy volunteer pigeon coordinates the preparations, convinced every other world has brought something more impressive.

**Story arc.** Build a welcoming festival through nineteen crossover contributions, then reveal that remembering everyone's needs was the pigeon's own indispensable contribution. The finale celebrates the whole campaign without requiring experimental physics systems.

**Signature.** The same recognizable plaza gains banners, stalls, guests, and warm lights through authored scene illustrations; each contributor introduces a different target arrangement and a small returning-character joke.

**Reusable art kit:** volunteer pigeon coordinator; modular festival plaza backdrops; cross-theme stall signs; shared welcome table; celebration panorama; reused cast and props from Levels 01–19.

### 20.01 — A Teacup for the Whole Squad

Scene 381 of 400 · Introduction · CURRENT RULES · Mix: kitchen + cave + garden

**Setup.** The original smiling teacup stands at the festival entrance beside the wizard's frozen welcome sign and Cupid's dim heart-shaped lamp.

**Puzzle.** Melt the sign, FILL the cup, then WARM the heart lamp at 25–45° and 10–40% pressure. These three familiar stations introduce the plaza's clear left-to-right service route.

**Payoff.** The wizard hangs his boots right-side up. The pigeon receives the very first cup of tea rather than another assignment.

### 20.02 — Socks Across the Opening Arch

Scene 382 of 400 · Introduction · CURRENT RULES · Mix: town + cave

**Setup.** The sock exchange lends mismatched ghost bunting, with three fixed icy clips spread across the welcome arch and two low attachment footprints.

**Puzzle.** Melt the high clips using nozzle movement or tilt, FREEZE both low attachment zones, then SPIN a stationary hanging crank. Cloth deployment is a scripted payoff rather than rope physics.

**Payoff.** Every odd sock finds a different odd partner on the arch. The pigeon stops trying to make their colors match.

### 20.03 — Invitations Above Sea Level

Scene 383 of 400 · Introduction · CURRENT RULES · Mix: town + garden

**Setup.** Brine & Parcel's postal cart parks beside three empty stamp basins arranged in a triangle and a frosted address board.

**Puzzle.** FILL all three basins directly, melt the address-board cap, then WARM the shared postage seal at 30–50° and 10–35% pressure. No pipe network or matching-address interface is needed.

**Payoff.** Invitations emerge with tiny waterproof umbrellas. The first is delivered to a puddle that has never been invited anywhere.

### 20.04 — The Circus Builds a Queue

Scene 384 of 400 · Introduction · CURRENT RULES · Mix: town + cosmos

**Setup.** Clockwork performers turn waiting for admission into a show, with two frozen wheel caps above three dotted pedestal targets.

**Puzzle.** Clear both wheel caps, FREEZE the three separated pedestals, then SPIN two exposed turbine hubs. Both preparations gate the hubs; acrobats perform on the finished arrangement only after completion.

**Payoff.** The queue applauds itself for excellent waiting. A mechanical ringmaster gives the pigeon a ribbon for Most Considerate Interval.

### 20.05 — A Permit for Unexpected Delight

Scene 385 of 400 · Remix · CURRENT RULES · Mix: town + kitchen

**Setup.** The tiny borough installs a miniature approval desk with four narrow ice-covered forms surrounding one large welcoming stamp.

**Puzzle.** Melt the four small form targets with deliberate repositioning. They unlock separate WARM ink at 25–45° and 10–35% pressure and liquid-water FILL rinse stations. Both completed stations unlock the final high-pressure SPIN approval stamp.

**Payoff.** The permit reads Everyone May Have a Nice Time. Its footnote explicitly includes volunteers, which the pigeon reads twice.

### 20.06 — The Buffet Declares Independence

Scene 386 of 400 · Remix · CURRENT RULES · Mix: kitchen + town

**Setup.** The pudding delegation sets up three separate buffet stations: a frosted biscuit tray, a mould for an icy dessert, and a warm custard badge.

**Puzzle.** Melt the broad tray cap, FREEZE the narrow dessert footprint, and WARM the custard badge at 30–45° with 10–35% pressure. All three unlock two shared liquid-water FILL serving bowls.

**Payoff.** The desserts choose their own places at the table. A soup bowl gets honorary dessert citizenship without changing its contents.

### 20.07 — A Playground With Tail Room

Scene 387 of 400 · Remix · CURRENT RULES · Mix: garden + town

**Setup.** Fossilbean's children find a play corner whose decorations leave room for tiny feet but not for enormous happy tails.

**Puzzle.** FREEZE two widely separated play-pad footprints, melt three fixed toy-chest ice caps, then WARM the welcome sun badge at 25–45°. The finished illustration expands the play corner rather than simulating collisions with tails. WARM targets use 10–35% pressure.

**Payoff.** Dapple turns around without apologizing. The pigeon adds Tail Room to the festival map as if it were always a neighborhood.

### 20.08 — Flint's Counter for Everybody

Scene 388 of 400 · Remix · CURRENT RULES · Mix: town + cave

**Setup.** Emberborough brings a service counter with a low wyvern station, a medium dragon station, and a very high giant-dragon sign.

**Puzzle.** Melt ice caps at all three heights, FREEZE two contrasting-height counter bases, then WARM Flint's welcome badge at 30–50° and 10–35% pressure. Guests approach only after all services are prepared.

**Payoff.** No visitor has to crouch or ask for a stool. Flint and the pigeon exchange the relieved look of competent small organizers.

### 20.09 — Endings With Outdoor Seating

Scene 389 of 400 · Crossover · CURRENT RULES · Mix: garden + town

**Setup.** The runaway library installs two frozen book stands and a dotted reading-nest assembly around a quiet corner of the plaza.

**Puzzle.** Build two local branches: each book-stand MELT cap unlocks its matching outer FREEZE nest section. A shared middle FREEZE footing is active from the start. All three finished nest sections unlock the WARM reading lamp at 25–40° and 10–30% pressure.

**Payoff.** Endy the full stop sits after a sentence reading Stay As Long As You Like. The quiet corner becomes unexpectedly popular.

### 20.10 — A Podium for Trying Something

Scene 390 of 400 · Crossover · CURRENT RULES · Mix: garden + town + cosmos

**Setup.** Mount Oops brings three medal-warming stations beside a frozen participation banner. No station is higher than the others.

**Puzzle.** Melt the banner, then WARM the three fixed medals at 20–35°, 35–50°, and 50–65°, using 10–35% pressure. All three unlock a high-pressure SPIN applause wheel; there is no score contest or rhythm gate.

**Payoff.** Gus receives a medal for joining in, then gives the pigeon one for making joining in possible. Both look genuinely surprised.

### 20.11 — A Dance Floor for Every Kind of Pair

Scene 391 of 400 · Crossover · CURRENT RULES · Mix: garden + town + kitchen

**Setup.** The wedding planners arrange two independent dance-floor footprints around a frozen music stand and two differently sized refreshment cups.

**Puzzle.** FREEZE both floor sections and melt the music cap to unlock the high-pressure SPIN band wheel. Independently FILL both refreshment cups. The completed band wheel AND both full cups unlock the final WARM welcome heart at 25–45° and 10–35% pressure.

**Payoff.** Couples, friends, siblings, and one happily unaccompanied pudding share the dance floor. The pigeon accepts an invitation to sit out a song.

### 20.12 — A Quiet Tent for Loud Dreams

Scene 392 of 400 · Crossover · CURRENT RULES · Mix: garden + cave + town

**Setup.** The dream tailors bring three soft-looking fixed repair badges beneath a frozen tent sign, making a calm corner away from the illustrated crowd.

**Puzzle.** Melt the sign and FREEZE two lantern-footing zones, then WARM all three badges at 20–35° and 10–30% pressure. The crowd cannot interrupt progress; quiet is a visual/audio payoff, not a stealth mechanic.

**Payoff.** Bramble offers visitors comforting forest dreams. The pigeon discovers that taking a break can be part of running a festival.

### 20.13 — Weather for Both Sides of the Picnic

Scene 393 of 400 · Complication · CURRENT RULES · Mix: garden + cave + cosmos

**Setup.** The conservatory installs two visibly separate weather stations: a snow-garden display and a sunny picnic awning with an empty welcome basin between them.

**Puzzle.** FREEZE three snow-garden footprints, WARM the sun badge at 50–70°, then FILL the center basin. Separate target stations make the contrasting climates readable; there is no coupled weather or temperature simulation. WARM targets use 10–35% pressure.

**Payoff.** Guests choose their favorite side and wave across the boundary. Nimbus orders one small cloud-shaped cushion for the organizer.

### 20.14 — The Last Train Makes Extra Stops

Scene 394 of 400 · Complication · CURRENT RULES · Mix: garden + town

**Setup.** The mushroom railway adds three separated platform sections to the festival edge, with a frozen timetable and stationary departure turbine beside them.

**Puzzle.** FREEZE the three platform footprints, melt the timetable, then SPIN the departure turbine. A WARM (10–35% pressure) conductor's lantern at 30–45° is the final station, preventing an all-high-pressure solution.

**Payoff.** The train pauses in the ending panorama for every guest who wants one more goodbye. Sprig saves the pigeon a window seat.

### 20.15 — An Exhibit About Almost Giving Up

Scene 395 of 400 · Complication · CURRENT RULES · Mix: cosmos + town

**Setup.** The museum displays an oversized frozen question mark beside two empty demonstration basins and a tiny, visibly dim curiosity lamp.

**Puzzle.** Melt the question mark's three rectangular ice sections, FILL both basins, then WARM the lamp at 25–45° with 10–35% pressure. The impossible transformation happens after completion, without unlisted optics or mass rules.

**Payoff.** Dr. Probably unveils an exhibit of the festival's first messy sketch. Its label thanks the pigeon for starting before everything was certain.

### 20.16 — Breakfast for the People Making Dinner

Scene 396 of 400 · Complication · CURRENT RULES · Mix: cosmos + kitchen + town

**Setup.** The galactic diner opens a crew-only counter, with two tall frozen coffee dispensers framing a low, gently labelled toast-warming station.

**Puzzle.** Melt both dispenser caps, FILL their two cups, then WARM the toast badge at 30–45° and 10–35% pressure. A high-pressure SPIN serving bell sits off to one side, requiring a final deliberate reposition.

**Payoff.** The cooks sit down while the guests serve them. The pigeon eats a whole meal without holding a clipboard.

### 20.17 — The Parade Follows a Little Star

Scene 397 of 400 · Synthesis · CURRENT RULES · Mix: town + cosmos

**Setup.** Captain Button's toy float reaches the plaza with Glim's lamp between two ice-covered pennants and two unfinished wheel-decoration forms.

**Puzzle.** Melt both pennant blocks and FREEZE both rectangular decoration zones. Those preparations unlock Glim's WARM lamp at 35–55° and 10–35% pressure, followed by a stationary SPIN departure axle.

**Payoff.** Glim leads the tiny parade into the enormous square. Every full-sized guest kneels briefly to make sure the toys can see.

### 20.18 — Tomorrow Has Already Sent Flowers

Scene 398 of 400 · Synthesis · CURRENT RULES · Mix: town + garden + cosmos

**Setup.** Ann and the four ponies deliver an ice-covered Tomorrow sign, two empty flower basins, and a dim end-of-day lantern.

**Puzzle.** Melt the sign, FILL both basins, then WARM the lantern at 30–50° and 10–35% pressure. FREEZE two low display feet before the final high-pressure SPIN chime unlocks.

**Payoff.** Ann replaces her emergency folder with a photo album. The supposedly ominous ponies distribute flowers with impeccable manners.

### 20.19 — A Room for the Last Volunteer

Scene 399 of 400 · Synthesis · CURRENT RULES · Mix: town + kitchen + garden

**Setup.** Ms Between and Yesterday prepare a small guest-room stall just for the coordinator, with a frozen pillow badge, empty tea cup, and two low lantern bases.

**Puzzle.** FREEZE both lantern bases and melt the pillow badge in parallel, then FILL the cup. WARM the separate bedside glow at 25–40° and 10–30% pressure to complete the quiet room.

**Payoff.** The door card bears a tiny pigeon drawing. Yesterday keeps watch outside so the organizer can enjoy the festival without being on call.

### 20.20 — The Warmest Place Is the Welcome

Scene 400 of 400 · Finale · CURRENT RULES · Mix: town + kitchen + garden + cave + cosmos

**Setup.** The completed plaza gathers every delegation around two frozen welcome pennants, two ice-lantern footprints, a shared basin, a central heart lamp, and a celebration turbine.

**Puzzle.** Complete both MELT pennants and both FREEZE bases in any order; together they unlock FILL at the basin. WARM the heart at 30–50° and 10–35% pressure, then SPIN the turbine at 70% or more. Every prerequisite is local.

**Payoff.** The panorama lights up one contribution at a time. Everyone makes room at the table for the squad and its pigeon host; the final banner simply says Glad You Came.
