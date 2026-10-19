# Save migration and history semantics

The existing storage key `hero-academy-v1` is **deliberately retained** so returning heroes keep progress. The JSON schema version is now **2**. A version-1 backup is validated using the original checks and migrated to version 2 with a fresh, empty `journey` record on every profile.

- Legacy `done`, `attempts`, `adventure`, clothing, audio, accessibility settings, player nicknames and active index remain intact.
- New `journey.startBand`, `theme`, `calm`, `focus`, `records`, and `completed` live in the individual player, not shared state.
- Legacy attempts are **never** mapped to new Journey skills. Independent and supported practice is recorded with band, mission, phase, version, support, audio and session.
- Completing a mission adds one unique key to `journey.completed`; replay can collect additional practice records but not duplicate that key. Opening any band awards nothing.
- Imported JSON is validated before it replaces device progress. Export it before restoring another backup; local recorder clips live in IndexedDB and are not part of JSON export.
- If editorial changes alter a mission's skill, answer or wording, increment `CONTENT_VERSION`; retain old records for history rather than reinterpreting them as answers to changed material.
- Malformed version values, oversized arrays, unknown themes and malformed practice records cause import rejection.

Migration from v1 is performed in memory when loading the existing save and persisted on the next save. No cross-device sync or ChoreQuest data migration is introduced by this change.
