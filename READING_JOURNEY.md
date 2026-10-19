# Hero Academy Reading Journey — curriculum and evidence map

Version: `2026.10.19-draft2`. Last checked: 19 October 2026. **Draft for teaching and accessibility review**.

## Scope and boundaries

The original 12-town-mission adventure remains available from **Town quests**. The separate Reading Journey offers 12 open bands and 12 distinct catalogue entries per band. These are a **starter library of 144 short activities**, not 144 independently validated lessons. Early bands use sound and word-tile activities; bands 2–5 now also require finding the practised word in one of 48 short controlled texts. Later bands include 36 authored sentence-repair, sequence, precise-quote, paired-source and three-part claim investigations alongside their original evidence-finding passages. The game does not yet replace school phonics instruction, full-length independent reading or specialist assessment.

This is **curriculum-informed design**, not evidence that Hero Academy itself improves reading. No clinical study or validated reading-age instrument has been conducted. No child age or date of birth is collected.

## Skill bands (demonstrated skill, not a reading-age ladder)

| Band | Entry and new skill | Revisit and material | Practice or progress advice |
| --- | --- | --- | --- |
| 1 Listen and notice | Listen to oral examples; attend to individual sounds | Spoken vocabulary and phonological awareness; sound tiles | Practise where sound identification is assisted; revisit on separate days |
| 2 First sound spellings | Connect s a t p i n m d and begin CVC blending | Oral segmentation, short vowels, CVC words | Blend new CVCs accurately with increasingly little modelling |
| 3 New vowels and words | Consolidate short vowels and further single-letter correspondences | CVC decoding, direct exception-word instruction | Read mixed words with independence across visits |
| 4 Sound teams and clusters | sh ch th ng ck; clusters without inventing extra phonemes | CVC words and letter-sound correspondences | Segment and read team words with accuracy |
| 5 Vowel spelling explorers | ai ee igh oa oo ar or ur ow oi air and alternatives | Vowels, consonant digraphs, exception words | Generalise familiar spellings into different words |
| 6 Word engineering | Syllables, roots, affixes and meanings | Sound spelling, stress, earlier roots | Explain how an affix affects a word in another context |
| 7 Sentence workshop | Connected sentences, phrasing, syntax and punctuation | Automatic word recognition | Reread and verify meaning; old text may need adult explanation |
| 8 Comic trails | Literal retrieval and event order | Sentence meaning and accurate reading | Select precise evidence across two visits |
| 9 Story clues | Inference grounded in narrative clues | Literal detail, vocabulary | Explain which words make the inference plausible |
| 10 Text explorers | Genre, instructions, information and figurative language | Inference and retrieval | Return to unfamiliar text forms and vocabulary |
| 11 Two sides | Compare perspectives and evidence | Genre, summary, inference | Contrast viewpoints using the supplied text |
| 12 Critical detective | Support for claims, bias, tone, form and source limitations | Compare text and evaluate language | Justify competing readings, not simply tap a right answer |

The approximate age/school grouping shown in metadata is for grown-ups only and is not calculated for players. These bands should eventually be broken into finer decodable scopes, especially bands 3–5. A child may practise CVC decoding alongside an older-interest spoken narrative.

## Teaching sequence and constraints

The introductory synthetic phonics sequence follows **s, a, t, p, i, n, m, d**, then **g, o, c, k, ck, e, u, r, h, b, f, l, ff, ll, ss**, followed by **sh, ch, th, ng**, before explicitly taught vowel teams. This is an *original draft sequence*, not a claim of licence from or fidelity to a named commercially validated phonics programme. The intro sound catalogue covers an initial sample, not all phonemes. GPCs, irregular correspondences and exception words must be introduced explicitly by a trained adult and checked by a specialist before claims of a complete SSP course.

Sound-team tiles remain one unit for sound-based tasks (e.g. `sh-i-p`, `n-igh-t`). Morphology-band tiles represent meaningful chunks, not phonemes. The original town activity library is preserved even where its phonics sequence differs; its records are not mixed into new evidence.

For early controlled texts, authored target words are mechanically checked against the declared spelling progression. Other game instructions, oral prompts, illustrations, answer choices and sentence vocabulary still require a full manual decodability audit. They are not certified decodable. Non-decodable UI instructions should be supported by pictures and adult reading, not offered as texts children must decode.

## Instruction and access

The player can enter via six cards: Sounds, Build words, Read words, Read sentences, Read stories, Reading detective. Routes: choose independently, three optional untimed example tries, or grown-up selection. Every mission is directly accessible; no prerequisite unlocks are enforced. Selected band, adventure theme and calmer presentation are stored per hero. A skip cannot grant past stars.

A mission illustrates its pattern, offers a supported practice response, and asks for an applied response. Help is optional; evidence selection uses text rather than only multiple choice. Correct and incorrect attempts, model use, audio use, support, content version and separate sessions are recorded. Supported and independent responses remain distinct. Two successful independent visits are a lightweight *practice signal*, not a validated mastery determination.

The city map, movement, treasures, hero customisation, optional sound controls, local players and backups remain separate and usable.

## England curriculum and evidence sources

- [EYFS statutory framework (September 2026)](https://www.gov.uk/government/publications/early-years-foundation-stage-framework--2) — communication, language and literacy expectations.
- [DfE English programme of study, years 1–6](https://www.gov.uk/government/publications/national-curriculum-in-england-english-programmes-of-study/national-curriculum-in-england-english-programmes-of-study) — separate word reading from comprehension; blending, phonics, exception words, fluency, morphology, inference and comparison.
- [DfE English curriculum, key stages 3–4](https://www.gov.uk/government/publications/national-curriculum-in-england-secondary-curriculum) — advanced independent and critical reading, multiple text genres and judgements about evidence.
- [DfE Reading Framework (2023 update)](https://www.gov.uk/government/publications/the-reading-framework-teaching-the-foundations-of-literacy) — systematic synthetic phonics, fluency, comprehension and older learners needing decoding help.
- [EEF Phonics toolkit (reviewed October 2025)](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/phonics) — evidence for phonics instruction generally, not this game.
- [EEF Reading comprehension strategies](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/reading-comprehension-strategies) — explicit retrieval, monitoring and inference strategies.
- [EEF Improving literacy in secondary schools](https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/literacy-ks3-Ks4) — disciplinary literacy and subject-specific reading.

## Outstanding specialist review

Qualified phonics educators should review actual phoneme representations, scope and sequence, alternative spellings and exception-word treatment. Reading teachers should review passage complexity, genuine comprehension opportunities, answer ambiguity and inclusion of poetry, primary sources and long-form texts. Accessibility specialists should assess screen-reader and keyboard paths on real mobile hardware. The new reading labs add sequencing, quote-selection and paired-source reasoning. However, the existing pieces are short; open responses, credible competing interpretations, longer texts, diverse authentic genres and school-level expert review remain future work. See [CONTENT_REVIEW.md](CONTENT_REVIEW.md) for the outstanding sign-off gates. No real iPhone testing is claimed here.

## Iteration 2: authored adventure expansion (19 October 2026)

- **36** new multi-step cases in `dist/quest-labs.js`: 12 ordering/repair puzzles, 12 precise quote hunts, six dual-source comparison boards and six evidence judgement boards. Every answer and distractor is curated in the repository, not generated at runtime.
- **48** word-in-context texts in `dist/phonics-application.js`, one for each band-2-to-5 mission. The child taps a target word in a short text after practising word building; this transfer response is saved with phase `transfer` and does not alter earlier levels.
- `inspectText()` checks against declared grapheme inventories and explicitly recorded exception words. That mechanical check does not establish phonetic decodability, linguistic appropriateness or SSP programme fidelity. It does not validate child-facing navigation instructions.
- A supported practice example remains marked supported in the ensuing applied response. Earlier draft results remain stored under their original content version.
- The original town missions and all existing save controls are retained. No real iPhone or external specialist sign-off is claimed.
