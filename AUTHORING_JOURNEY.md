# Reading Journey — authoring and review guide

Content is a static, versioned JavaScript catalogue in `dist/journey-content.js`. Changes are deployed by the existing GitHub Pages workflow; no AI, runtime generation, required network connection, microphone grading or back-end service.

## Add or change a mission

1. Check `bands` for intended entry skills, focus, revisit goals, vocabulary and success guidance.
2. Edit the matching entry in `soundTargets`, `wordSets` or `readingSets`. Every band currently has 12 distinct entries and uses numbered missions 1–12.
3. For early sound/word bands, ensure taught grapheme spellings permit every target and distractor. Ensure multi-letter spellings use a single sound tile, and do not split consonant clusters incorrectly.
4. For evidence missions, provide original short text, a precise question and the zero-based index of the sentence containing support. An evidence index is **not** a claim that this is the only defensible interpretation.
5. Record an explicit curriculum and specialist review decision. Avoid increasing difficulty merely by adding letters. Prefer differing vocabulary, syntactic structures, inference and text purpose.
6. Update `CONTENT_VERSION` whenever the meaning, answer or presentation of any question changes. Old records retain their original version; review recommendations are advisory.
7. Run `npm test` and review all 12 bands with a keyboard and narrow touch device. Inspect the audio manifest and adult help states.

## Media, privacy and safe authoring

Illustrations are drawn with local original assets and emoji placeholders. Provide original, unambiguous images with accessible labels; validate links before publishing. Individual phoneme audio must be recorded and reviewed by humans, and cannot be generated using letter-name TTS. Device speech is used only for optional whole-word or passage playback. No secrets belong in `dist/`.

Escaping is required for player names and any text interpolated into HTML. Keep content static and curated. Never silently change a child's chosen practice level, award earlier completion on a skip or mark assisted work as independent.

## Quality gaps

The current 144 items are short practice prompts, not a full sequence of 144 complete teaching lessons. There are no bundled professionally approved phoneme clips, no comprehensive alternative-pronunciation course, no specialist manual decodability signoff, and no benchmarked reading outcome data. Add these before claiming full curriculum coverage, a complete systematic synthetic phonics programme or validated reading ages.

## Iteration 2 authoring files

- `dist/quest-labs.js`: add curated cases using `sequence` (ordered cards), `quote` (exact contiguous word span), `compare` (two labelled source passages and evidence slots), or `claim` (supported finding, overstatement and unanswered question). All cards must be unique and each solution index must be valid. The original 12 missions per band remain in `dist/journey-content.js`, with selected IDs overlaid by authored labs.
- `dist/lab-ui.js`: interactive cards and token selection, independent answer checking, and a simple generic worked illustration distinct from the question being assessed.
- `dist/phonics-application.js`: short word-in-context text. Ensure the exact word occurs **once**, add any genuinely taught exception word explicitly, and keep allowed GPCs to the band scope. Machine linting is insufficient for an authorised phonics course.
- `dist/journey.js`: records transfer after the applied response and retains support evidence. A completed mission reward is issued only after the required context activity, but never duplicates on replay.
- `CONTENT_REVIEW.md`: required independent expert sign-off and device/accessibility testing before broader educational claims.

Do not add new spellings simply to silence a validator. Instead correct the material or document and teach the planned correspondence. Version changes are deliberate and do not regrade past results.
