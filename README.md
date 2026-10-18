# Hero Academy Reading

An original superhero reading adventure. Explore a town, meet Pip, collect treasure and restore landmarks by completing short reading quests.

A dependency-free static app using HTML, CSS, JavaScript and original editable SVG artwork. No backend, required account, paid APIs, adverts or build step.

## Run locally

Use Python 3 to serve the app and Node.js 22 or later for tests.

```sh
python3 -m http.server 8000 --directory dist
```

Open `http://localhost:8000`. Serve the files rather than opening `index.html` directly: the app uses JavaScript modules.

```sh
npm test
```

No dependency installation is required. GitHub Actions runs tests and JavaScript syntax checks on pushes and pull requests.

## Play

Tap a landmark to walk there, then **Go** to start its quest. Arrow keys and on-screen arrows let you explore; **Next** locates the next quest. Find six optional treasures and visit Pip. Completed quests restore buildings, lights and a bridge.

The first ten quests alternate listening-to-word choices, building words from audio, and reading-to-picture matching. Later quests include short stories. Supported completion advances the adventure; replay does not duplicate rewards. **Rescue** creates personalised review from practice records.

Movement is a simple point-and-click system, not a collision-based platformer. Reading quests use a shared rescue scene. Future chapters displayed on the roadmap are not playable.

## Level shortcuts

Choose **Code** on the adventure screen to open any level using `HERO01` through `HERO12`. See [LEVEL_CODES.md](LEVEL_CODES.md) for the complete table. A shortcut does not mark earlier levels complete or grant skipped rewards.

## Accessibility and support

Picture-led controls, short labels, on-demand device speech, slow replay, keyboard/touch support, adjustable reading text, reduced animation and phone safe-area layouts are included. There are no compulsory timers, lost lives or rankings.

**Grown-ups** contains practice difficulty, review focus, skill records, voice previews and backups. Voice availability/quality varies by device. On iPhone, use Safari and tap a speaker button; actual iPhone visual/audio verification remains outstanding.

Support settings are not a reading-age assessment. Records distinguish supported success, independent answers and independent answers on separate visits; these do not establish mastery or diagnose dyslexia.

## Progress and privacy

Up to eight nickname profiles are stored in this browser's local storage. Export/restore a validated JSON backup to retain practice history, position, treasures and rewards. Clearing browser storage deletes local progress. Optional ChoreQuest central accounts synchronise the selected hero's adventure and new mission Hero XP. See [central accounts](docs/CENTRAL-ACCOUNT.md). Use nicknames rather than sensitive information.

## Static hosting

Publish `dist/` with GitHub Pages, Azure Static Web Apps or another static host. All asset paths are relative, supporting repository subpaths. HTTPS enables service-worker offline caching after the initial visit. The **Deploy to GitHub Pages** workflow runs on every push to `main`, checks tests and JavaScript syntax, then uploads and deploys `dist/`. Pull requests run tests without publishing. You can also run the deployment manually from Actions.

In **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source. GitHub must have Pages enabled for the workflow to deploy. The workflow publishes only the app directory, not the repository documentation.

Default site URL: https://mightora.github.io/hero-academy-reading/

See the workflow's deployment environment for the confirmed live URL, including any custom domain configured in repository settings.

## Source

| File | Purpose |
| --- | --- |
| `dist/app.js` | Screens, interactions and game flow |
| `dist/adventure.js` | Town, movement, treasure and landmarks |
| `dist/content.js` | Quest definitions and validation |
| `dist/learning.js` | Word banks and personalised review |
| `dist/objects.js` | Object illustrations and rescue lift |
| `dist/art.js` | Hero, Pip and interface graphics |
| `dist/audio.js` | Device speech and voice preference |
| `dist/state.js` | Profiles, unlocking and backup validation |
| `dist/style.css` | Desktop and phone layouts |
| `dist/sw.js` | Offline caching |
| `tests/` | Game, audio, learning and adventure checks |

Application source intentionally lives in `dist/`; it is edited directly and does not require building.

## Learning limitations

This prototype is not a validated dyslexia intervention or an educator-approved phonics curriculum. Word banks and stories need specialist review for sequence, dialect, decodability and exception words. An adult should introduce unfamiliar sounds and help with blending.

Whole-word speech is included. Reviewed recordings of individual phonemes/blending are **not** included. General text-to-speech must not be used as an authoritative phonics sound model.

Browser visual testing remains outstanding. The working product name has not been trade-mark cleared. No open-source licence has been selected yet.

## Brand and design

Read [BRAND.md](BRAND.md) before building another Hero Academy app. It defines the shared identity, colours, characters, illustration style, components, voice, phone layouts and accessibility conventions, with a reusable project brief.

## Contributions

See [CONTRIBUTING.md](CONTRIBUTING.md). Please report bugs and suggest improvements through the repository's Issues page.

