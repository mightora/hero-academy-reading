// Original, versioned Hero Academy Reading Journey content. Draft: educator review required.
import {segmentWord} from './learning.js';
export const CONTENT_VERSION='2026.10.19-draft1';
export const themes=[['robot','🤖','Robot rescue'],['explore','🧭','Exploration'],['engineering','⚙️','Engineering'],['mystery','🔎','Mysteries'],['wildlife','🦊','Wildlife'],['space','🚀','Space']];
export const entryGroups=[['Sounds','👂',[1,2]],['Build words','🧩',[2,3,4]],['Read words','📚',[3,4,5,6]],['Read sentences','💬',[7,8]],['Read stories','📖',[8,9,10]],['Reading detective','🔎',[10,11,12]]];
const meta=[
 ['Listen and notice','listening','Hear spoken words and separate sounds','Hear words and notice first sounds','Oral words; no print needed','Hear, point, sound counters','Beginning listening','Repeat with different words','Independently recognise sounds across two visits'],
 ['First sound spellings','decoding','Connect /s a t p i n m d/ to print','Oral sounds and attentive listening','Single consonants and short vowels','Tap graphemes, build CVC words','Phonological awareness','Review sound-to-print links','Blend and segment novel CVCs twice'],
 ['New vowels and words','decoding','Consolidate CVC; add g o c k e u r h b f l','Blend and segment basic CVCs','Short vowel CVC and explicit exceptions','Build, read, picture matching','Early spellings','Review short vowels and sound counters','Read mixed CVCs on separate visits'],
 ['Sound teams and clusters','decoding','Learn sh ch th ng ck and consonant clusters','Secure common CVCs','Four- and five-letter, not necessarily more sounds','Sort patterns, swap phonemes, build','CVC and exception words','Review tricky digraph/cluster contrasts','Accurate segmentation without modelling'],
 ['Vowel spelling explorers','decoding','Explore ai ee igh oa oo ar or ur ow oi','Recognise consonant digraphs','Longer spellings; one sound may use several letters','Compare alternatives and sort spellings','Short vowels and consonant teams','Review spellings in mixed words','Transfer a taught spelling to new words'],
 ['Word engineering','vocabulary','Investigate syllables, roots, prefixes and suffixes','Decode words with taught vowel teams','Two to four syllables; derivation and stress','Split roots, build words, match meanings','Vowel spellings and stress','Revisit roots in new contexts','Explain a meaningful affix independently'],
 ['Sentence workshop','fluency','Sentence accuracy, punctuation and meaning','Accurate familiar word decoding','Short sentences; punctuation matters','Repair, sequence, reread','Word recognition and syntax','Review where punctuation changes sense','Read accurately across separate visits'],
 ['Comic trails','comprehension','Retrieve facts and recount sequence','Read connected sentences with support','Short fiction, 3-4 sentences','Evidence taps, comic sequencing','Punctuation and vocabulary','Revisit retrieval in new genres','Locate precise evidence without hints'],
 ['Story clues','comprehension','Infer plausible motives from written evidence','Retrieve explicit information','Short narrative with implied meaning','Find evidence and explain','Literal retrieval','Try another viewpoint or character','Justify inference with quoted evidence'],
 ['Text explorers','comprehension','Distinguish poetry, nonfiction and instructions','Track meaning across several sentences','Mixed forms; figurative and subject vocabulary','Find features and useful facts','Inference and vocabulary','Return to unfamiliar genre','Locate evidence and state purpose'],
 ['Two sides','comprehension','Compare perspectives and evidence','Locate and explain supporting detail','Two related passages with differing emphasis','Pair claims with evidence','Genre, summary and inference','Review contradictory perspectives','Contrast grounded evidence twice'],
 ['Critical detective','comprehension','Analyse claims, bias, structure and purpose','Distinguish fact, view and inference','Demanding texts with qualifications','Evaluate sources and justify claims','Comparing viewpoints','Revisit unsupported claims','Defend a reasoned interpretation independently']
];
export const bands=meta.map((m,i)=>({id:i+1,title:m[0],area:m[1],objective:m[2],entry:m[3],complexity:m[4],activities:m[5],revisit:m[6],practice:m[7],next:m[8],approx:i===0?'Pre-reading / early years':i<5?'Early primary reading':i<8?'Primary reading':i<10?'Upper primary / transition':'Secondary / advanced',note:'Approximate orientation for adults, not a reading-age assessment.'}));
const soundTargets=['s','a','t','p','i','n','m','d','g','o','c','k'];
const wordSets=[
 ['sat','pin','tap','mat','sit','pan','nap','tin','pat','map','sip','dip'],
 ['dog','log','cat','cup','sun','red','hen','bed','bug','hop','run','fit'],
 ['ship','fish','shop','chin','chat','thin','ring','sing','sock','duck','flag','drum'],
 ['rain','train','seed','green','night','light','boat','road','moon','star','coin','hair'],
 ['unhappy','replay','careful','helpful','kindness','payment','misread','sunshine','moonlight','unfair','rebuild','hopeful']
];
const morphologyTiles=[
 ['un','happy'],['re','play'],['care','ful'],['help','ful'],['kind','ness'],['pay','ment'],
 ['mis','read'],['sun','shine'],['moon','light'],['un','fair'],['re','build'],['hope','ful']
];
const readingSets=[
 [
 ['Pip has a map.','Who has the map?',0],['Dot is in the shed.','Where is Dot?',0],['Pip can hop.','What can Pip do?',0],['The red bag is on the bed.','Where is the red bag?',0],
 ['A cat sat on a mat.','What sat on the mat?',0],['The sun is hot.','What is hot?',0],['Dot has a tin cup.','What does Dot have?',0],['The dog can dig.','What can the dog do?',0],
 ['Pip got the kit.','What did Pip get?',0],['The lid is on the pot.','Where is the lid?',0],['A bug is in the log.','Where is the bug?',0],['The bell rang.','What happened?',0]
 ],
 [
 ['Pip found a silver key. It fitted the old gate. The garden was safe again.','What opened the gate?',1],
 ['Dot heard a splash. A duck was stuck near the reeds. She brought a rope.','What problem did Dot notice?',1],
 ['The lift stopped on floor three. The buttons were dark. Pip fetched a torch.','Why did Pip fetch a torch?',1],
 ['A trail of muddy prints led to the workshop. The door stood open. A wet boot rested inside.','What clue points towards the workshop?',1],
 ['Mara planted three seeds. Rain fell overnight. Small shoots appeared on Friday.','What happened after the rain?',2],
 ['The museum closed at five. Sam arrived at half past four. He visited the maps first.','Was the museum open when Sam arrived?',0],
 ['The path crossed the river by a narrow bridge. Builders checked it every week.','Which structure crossed the river?',0],
 ['The team found fresh tracks beside the pond. A fox had visited at dawn.','What animal visited the pond?',1],
 ['The robot needed a battery. Dot checked the box before visiting the store.','What did the robot need?',0],
 ['Clouds covered the stars. The astronomer checked the forecast and waited.','Why might the astronomer wait?',0],
 ['The small boat rocked in the wind. Everyone put on a life jacket.','What safety action did they take?',1],
 ['The signal flashed twice and then stopped. Pip wrote down the pattern.','What did Pip record?',0]
 ],
 [
 ['The gate was open but the ground was dry. Mina noticed wet footprints only inside the shed. She suspected someone had just left.','Which clue supports Mina’s suspicion?',1],
 ['Kai put away his telescope when thick clouds rolled in. He left his notebook on the desk. At midnight he checked the sky again.','Why did Kai check again?',0],
 ['The bridge had a warning sign, but cyclists still crossed. Aya chose a longer route. She reached the station safely.','What suggests Aya was cautious?',1],
 ['A rare bird called from the reeds. Leon lowered his voice and stood still. The bird stayed nearby.','How did Leon avoid disturbing the bird?',1],
 ['Pip checked the repaired door twice. It had jammed earlier that morning. He wanted the next visitor to be safe.','Why did Pip check again?',1],
 ['The market was empty despite bright sunshine. A notice said the stalls were moved to the hall.','Why was the market empty?',1],
 ['The message lacked a name, but it used Dot’s favourite greeting. Pip thought she might have sent it.','What suggests Dot could be the sender?',1],
 ['The explorer packed spare water instead of a second camera. The route crossed dry hills.','Why was spare water important?',1],
 ['A scientist repeated the test with a fresh sample. The first reading had seemed unusually high.','What does repeating the test show?',1],
 ['The old map showed a bridge where the river now bent south. The team checked a newer chart.','Why did the team seek a new chart?',1],
 ['A noise came from the roof each evening. The caretaker saw loose tiles moving in the wind.','What likely caused the noise?',1],
 ['Lina studied both exits before the drill. During the alarm she led the group outside calmly.','What explains Lina’s calm response?',0]
 ],
 [
 ['Rainwater collects in the rooftop tank. A filter removes leaves before the water is used in the garden.','Where are leaves removed?',1],
 ['Instructions: First open the panel. Next turn the blue dial clockwise. Finally check the light.','What happens just before checking the light?',1],
 ['The moon hung like a lantern above the dunes. Its pale glow traced the path home.','Which words create a comparison?',0],
 ['An octopus has eight arms and no bones. Its flexible body helps it enter narrow spaces.','Why can it enter narrow spaces?',1],
 ['On Monday the river reached two metres. By Tuesday it had fallen to one metre.','What changed over time?',1],
 ['The poet calls the trees “sleeping giants”. Their branches stretch across the silent road.','What does “sleeping giants” describe?',0],
 ['A repair note says: keep batteries dry. Replace damaged cases before switching on.','What must be checked before use?',1],
 ['The article explains that bees carry pollen between flowers. This helps many plants produce seeds.','How do bees help plants?',1],
 ['The museum label dates the mask to 1800. It was made from carved wood.','What material was used?',1],
 ['At dawn the city yawned awake. Buses hummed and shop shutters rattled.','Which phrase gives the city human behaviour?',0],
 ['A recipe asks for 200 ml of milk. Stir it into flour after adding the eggs.','When is the milk added?',1],
 ['The habitat report lists three frogs and one newt. The pond will be checked again next month.','How many kinds of amphibians were listed?',0]
 ],
 [
 ['A school notice says bikes reduce traffic. A resident says the road lacks a safe cycle lane. Both discuss journeys to school.','What concern does the resident add?',1],
 ['The museum brochure calls the new hall exciting. The accessibility review praises ramps but notes unclear signs.','Which detail is a specific limitation?',1],
 ['One explorer described the valley as peaceful. Another warned that sudden rain made the path dangerous.','What risk does the second explorer identify?',1],
 ['The maker says the lamp lasts all night. A tester recorded six hours of light from one charge.','Which statement reports a measured result?',1],
 ['A chef values fast meals. A gardener argues that local ingredients matter more than speed.','What different priorities do they express?',1],
 ['The club poster calls its telescope perfect. A user says it is heavy but gives a sharp image.','What trade-off does the user describe?',1],
 ['A town plan promises quieter streets. A shopkeeper worries that deliveries will take longer.','Which cost does the shopkeeper raise?',1],
 ['A report says the river is cleaner than last year. A swimmer points to litter on its banks.','What does the second view add?',1],
 ['One guide recommends the shortest trail. Another recommends the shaded trail on hot days.','What does the second guide prioritise?',1],
 ['An advert says everyone loves the game. A review says its controls are accessible but the text is tiny.','Which view gives checkable design details?',1],
 ['The council says new trees will provide shade. A resident asks who will water them during droughts.','What unanswered question is raised?',1],
 ['A robotics team praises speed. A safety officer asks for a slower test near people.','What does the officer prioritise?',1]
 ],
 [
 ['A headline claims all local ponds are polluted. The report sampled only two of twenty ponds.','What limits the headline’s claim?',1],
 ['A company says its battery never fails. Its evidence comes from three tests on one day.','Why is the certainty too strong?',1],
 ['An article praises a robot built by its own sponsor. Independent performance data is not included.','What interest should readers notice?',0],
 ['A campaign calls a plan “the only sensible choice”. It does not examine any alternatives.','What language signals persuasion?',0],
 ['A chart begins its vertical axis at ninety rather than zero. Small changes appear dramatic.','What design choice changes the impression?',0],
 ['One eyewitness heard a bang. A recording shows the noise happened before the lights went out.','Which source could check the sequence?',1],
 ['A blog says solar panels work on every cloudy day at full output. The writer offers no measurements.','What evidence is missing?',1],
 ['A historian quotes a single diary as the view of an entire town. Other accounts are absent.','What perspective is missing?',1],
 ['A product review rates a gadget highly but includes a paid affiliate link. The review discloses this connection.','What possible influence should readers consider?',1],
 ['The story repeats “never again” at the start of three paragraphs. The repetition stresses determination.','Which technique shapes the tone?',0],
 ['A report gives average temperatures but not their range. Extreme hot days are hidden by the average.','What else would improve the report?',1],
 ['A witness says the gate was closed. A dated photograph shows it open ten minutes later.','Why might both accounts still be true?',1]
 ]
];
export const soundSequence=['s','a','t','p','i','n','m','d','g','o','c','k','ck','e','u','r','h','b','f','l','ff','ll','ss','sh','ch','th','ng','ai','ee','igh','oa','oo','ar','or','ur','ow','oi','ear','air'];
export const exceptionWords=['a','i','the','is','has','to','no','go','of','said','was','you','they','are','my','he','she','we'];
const set=xs=>new Set(xs);
const availableGpcs=band=>set(soundSequence.slice(0,band===1?12:band===2?8:band===3?20:band===4?27:band===5?39:39));
export function tokens(word){return segmentWord(word.toLowerCase().replace(/[^a-z]/g,''));}
export function selectableMission(band,id){return Number.isInteger(band)&&band>=1&&band<=12&&Number.isInteger(id)&&id>=1&&id<=12;}
export const missions=bands.flatMap(b=>Array.from({length:12},(_,i)=>{
 const id=i+1,band=b.id,scene=['Restore the signal','Help the robot','Find a clue','Repair the bridge','Unlock the gate','Light the camp','Rescue a friend','Explore the caves','Restore the garden','Launch a beacon','Solve the map','Celebrate the rescue'][i];
 if(band===1)return {id,band,scene,type:'sound',target:soundTargets[i],example:'Hear the sound, then find its spelling.',visual:'👂 → 🔤 → ⚡',skill:'sound:'+soundTargets[i]};
 if(band>=2&&band<=6){const word=wordSets[band-2][i];return {id,band,scene,type:'tiles',target:word,tiles:band>=6?morphologyTiles[i]:segmentWord(word),example:'Look at the sound spellings. Tap them in order.',visual:'👀 → ▦ → ⚡',skill:(band===6?'morphology:':'decoding:')+word};}
 const [text,question,evidence]=readingSets[band-7][i];return {id,band,scene,type:'evidence',text,question,evidence,example:'Read. Find the words that help answer.',visual:'📖 → 🔎 → ⚡',skill:b.area+':band'+band};
}));
export function validateJourneyContent(){
 if(bands.length!==12||missions.length!==144)throw Error('Missing reading bands or missions');
 const keys=new Set();
 for(const m of missions){
  if(!selectableMission(m.band,m.id)||!m.scene||!m.skill)throw Error('Invalid mission');
  const k=m.band+':'+m.id;if(keys.has(k))throw Error('Duplicate mission');keys.add(k);
  if(m.type==='tiles'&&(!m.tiles.length||m.tiles.join('')!==m.target))throw Error('Invalid tile segmentation: '+k);
  if(m.type==='evidence'&&(m.evidence<0||m.evidence>=m.text.split(/(?<=[.!?])\s+/).length||!m.question))throw Error('Invalid evidence reference: '+k);
  if(m.type==='sound'&&!soundSequence.includes(m.target))throw Error('Sound not listed: '+k);
 }
 // Every single-word phonics band is checked against its declared GPC inventory.
 for(const m of missions.filter(x=>x.band>=2&&x.band<=5))
  if(tokens(m.target).some(g=>!availableGpcs(m.band).has(g)))throw Error('Untaught spelling in band '+m.band+': '+m.target);
 // Band 2 is restricted to the initial eight graphemes, checked mechanically.
 for(const m of missions.filter(x=>x.band===2))if(tokens(m.target).some(g=>!availableGpcs(2).has(g)))throw Error('Undeclared initial spelling: '+m.target);
 return true;
}
validateJourneyContent();
