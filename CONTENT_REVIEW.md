# Reading Journey: literacy and accessibility review checklist

**Status on 19 October 2026: implementation complete for this iteration; external specialist review NOT completed.**

This is an engineering checklist, not professional accreditation or a reading-age assessment. The new content includes 36 original multi-step investigations in bands 7–12 and 48 short, mechanically checked word-in-context activities in bands 2–5. Every band continues to expose twelve mission entries. No paid API, login or child microphone scoring is required.

## Phonics (qualified SSP and speech/language reviewer)

- [ ] Confirm initial letter-sound correspondence scope and ordering, particularly early consonant/vowel coverage.
- [ ] Check sounds against the specific recommended teaching sequence chosen for future school use. **Current sequence is an original draft, not an accredited SSP programme.**
- [ ] Inspect every controlled short-text sentence in `dist/phonics-application.js`: sound value, acceptable pronunciations, contextual meaning, articulation and all irregular or exception words.
- [ ] Evaluate the rule-based grapheme matching: a recognised spelling is **not** proof that the child has been taught every possible pronunciation, that a word is fully decodable, or that a text has been professionally reviewed.
- [ ] Review consonant clusters, digraph tiles and morphology-band chunking independently. Morphemes are meaning units, not necessarily sounds.
- [ ] Approve reviewed *pure phoneme* recordings for every target and alternative spelling. No professional sound recordings are bundled. Recorded local clips need separate assessment of clarity and accent coverage.
- [ ] Add systematic teaching of alternative pronunciations, exception words, and connected decodable reading before making any claim of a complete phonics programme.
- [ ] Review older-reader adaptations: adult-facing proficiency bands must not be labelled with age on child screens.

## Comprehension (English/literacy educator)

- [ ] Review the new `dist/quest-labs.js` cases for plausible, non-ambiguous source evidence, authentic genre features, appropriate vocabulary and punctuation.
- [ ] Review six sentence-repair, six story-sequence, twelve quote-selection, six paired-source and six three-part claim cases independently. Note that the current sentence repair and evidence cards accept a single curated arrangement; real-world arguments may admit other defensible interpretations.
- [ ] Extend complexity beyond these short entries: sustained fiction, poetry analysis, non-fiction from multiple disciplines, persuasive genres, and longer multi-source evaluation.
- [ ] Assess interaction diversity beyond correct-card ordering and token highlighting. Add non-graded written/oral explanations with adult discussion, without penalising spelling or using automated speech grading.
- [ ] Check that help after modelling never counts as an independent response, and that an adventure star is not treated as proof of reading mastery.
- [ ] Validate rereading, vocabulary and comprehension teaching in distinct skill strands across separate visits.

## Accessibility and safeguarding

- [ ] Actual iPhone Safari portrait and landscape with VoiceOver and large text (only Chromium phone emulation is automated).
- [ ] Android Chrome with TalkBack; keyboard-only and switch control; sound-off play; focus and Escape behaviour.
- [ ] Neurodivergent, dyslexia-supportive user research focused on interactions rather than claims about a special font.
- [ ] Ensure short instructions remain understandable to readers who cannot yet decode them, via pictures or adults.
- [ ] Review calm themes for older struggling readers and local-only player nicknames.
- [ ] Confirm there is no background voice, required webcam/microphone, timed failure, payment, adverts or ranking.

## Developer verification before each release

- `npm test`: schemas, grapheme scope, 48 short text entries, all 36 advanced investigations, exact quote matching, valid answers, migration and reward duplication.
- Browser checks: each band; phonics transfer after initial word-building; a representative lab in each advanced band; desktop, narrow and landscape emulation.
- Retain old `hero-academy-v1` storage key with version-2 JSON and content-versioned practice logs. A changed question must increment `CONTENT_VERSION`. Do not regrade old answers against new solutions.
- Export and restore remain separate from IndexedDB adult phoneme recordings; audio recording status must be transparent.
- Check responsive layout for text enlargements and browser accessibility focus; do not describe emulator results as physical-phone tests.

## Evidence informing design, not proof of this application

1. [Department for Education, The Reading Framework (2023)](https://www.gov.uk/government/publications/the-reading-framework-teaching-the-foundations-of-literacy): systematic phonics, fluency, comprehension, support for pupils up to Year 9 who need decoding support.
2. [DfE validation guidance for SSP teaching materials](https://www.gov.uk/government/publications/phonics-teaching-materials-core-criteria-and-self-assessment/submitting-phonics-programmes-for-validation-application-form-guidance): decodable resources must match the order of taught correspondences and exception words.
3. [Education Endowment Foundation, Reading Comprehension Strategies (updated October 2025)](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/reading-comprehension-strategies): explicit modelling and supported-to-independent use across texts, genres and subjects.
4. [DfE primary English curriculum](https://www.gov.uk/government/publications/national-curriculum-in-england-english-programmes-of-study/national-curriculum-in-england-english-programmes-of-study) and [secondary curriculum](https://www.gov.uk/government/publications/national-curriculum-in-england-secondary-curriculum): programme alignment targets, not an endorsed educational product.

No specialist has independently reviewed the generated passages or sound files, and no learning effectiveness or clinical outcomes have been measured.
