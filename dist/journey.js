import {bands,missions,entryGroups,themes,CONTENT_VERSION,selectableMission} from './journey-content.js';
import {segmentWord} from './learning.js';
import {soundId} from './sounds.js';
import {isLab,labIntro,labModel,labExercise,answerLab,hasLabAnswer,labSpokenText,addLabCard,selectQuoteWord} from './lab-ui.js';

export const journeyDefault=()=>({startBand:2,entry:'Build words',theme:'robot',calm:false,records:[],completed:[],focus:'auto'});
export function journeyFor(profile){if(!profile.journey)profile.journey=journeyDefault();return profile.journey;}
export function missionKey(band,id){return band+'-'+String(id).padStart(2,'0');}
export function journeyRecords(profile){return journeyFor(profile).records;}
export function recordResponse(profile,entry){
 const j=journeyFor(profile);
 if(!selectableMission(entry.band,entry.mission)||!['sound','tiles','evidence','sequence','quote','compare','claim'].includes(entry.type)||typeof entry.skill!=='string'||entry.skill.length>80||typeof entry.correct!=='boolean'||typeof entry.supported!=='boolean'||typeof entry.audio!=='boolean'||typeof entry.model!=='boolean'||typeof entry.session!=='string'||entry.session.length>80||!Number.isFinite(entry.at)||!['practice','apply','transfer'].includes(entry.phase))throw Error('Invalid practice result');
 j.records.push({version:CONTENT_VERSION,...entry});
 if(j.records.length>10000)j.records.splice(0,j.records.length-10000);
}
export function finishJourneyMission(profile,band,id){
 if(!selectableMission(band,id))throw Error('Unknown mission');
 const key=missionKey(band,id),j=journeyFor(profile),first=!j.completed.includes(key);
 if(first)j.completed.push(key);
 return first;
}
export function readingSummary(profile){
 const results={listening:{correct:0,supported:0,independent:0},decoding:{correct:0,supported:0,independent:0},vocabulary:{correct:0,supported:0,independent:0},fluency:{correct:0,supported:0,independent:0},comprehension:{correct:0,supported:0,independent:0}};
 const summary=bands.map(b=>{
 const records=journeyRecords(profile).filter(x=>x.band===b.id&&x.phase==='apply');
 const independent=records.filter(x=>x.correct&&!x.supported),supported=records.filter(x=>x.correct&&x.supported);
 const sessions=new Set(independent.map(x=>x.session));
 const last=records.at(-1);
 const area=results[b.area];area.correct+=records.filter(x=>x.correct).length;area.independent+=independent.length;area.supported+=supported.length;
 return {band:b.id,area:b.area,independent:independent.length,supported:supported.length,visits:sessions.size,practice:!last||!last.correct||last.supported||sessions.size<2};
 });
 return {areas:results,bands:summary};
}
export function nextPractices(profile){
 const s=readingSummary(profile);
 const current=journeyFor(profile).startBand;
 const practised=s.bands.filter(x=>x.practice&&journeyRecords(profile).some(r=>r.band===x.band));
 return [...new Set([current,...practised.sort((a,b)=>a.band-b.band).map(x=>x.band)])].slice(0,3);
}
export function suggestBand(correct){if(!Array.isArray(correct))return 2;return [2,4,8,11][Math.min(3,correct.filter(Boolean).length)];}
const escapeHtml=value=>String(value).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const sentenceList=text=>text.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map(x=>x.trim()).filter(Boolean)||[];
const sessionId=()=>Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8);
export function createJourney({modal,showDialog,dialogHead,closeDialog,profile,save,say,narrator,soundPlayer}){
 let current=null,session=sessionId(),placement=0,placementCorrect=[],stage='show',tapped=[],selected=null,help=false,heard=false,model=false,practiceSupport=false,feedback='',entry=null;
 const p=()=>profile(),j=()=>journeyFor(p());
 const actionBar=()=>'<div class="journey-actions"><button class="btn light" data-jhome>⌂ Choose level</button><button class="btn light" data-jclose>✕ Close</button></div>';
 function shell(title,body){showDialog(`${dialogHead('READING JOURNEY',escapeHtml(title))}<div class="journey-shell ${j().calm?'journey-calm':''}">${body}${actionBar()}</div>`);modal.querySelector('[data-jhome]').onclick=landing;modal.querySelector('[data-jclose]').onclick=closeDialog;}
 const on=(selector,fn)=>modal.querySelectorAll(selector).forEach(el=>el.onclick=()=>fn(el));
 const voice=text=>{heard=true;say(text);};
 function landing(){
  narrator.stop();soundPlayer.stop();current=null;
  shell('Choose level',`<p class="journey-note">Pick what feels right. Every mission is open. ✨</p><div class="journey-paths"><button class="btn orange" id="pick-own">🧭 Choose myself</button><button class="btn light" id="pick-help">🔎 Help me choose</button><button class="btn light" id="pick-grown">⚙ Grown-up chooses</button></div><div class="journey-grid">${entryGroups.map(([label,icon,range])=>`<button class="journey-card" data-entry="${escapeHtml(label)}"><span class="journey-icon">${icon}</span><strong>${label}</strong><small>${range.map(i=>bands[i-1].title).join(' · ')}</small><span class="journey-example">☝ Try a sample →</span></button>`).join('')}</div><div class="journey-settings"><label>Adventure <select id="j-theme">${themes.map(t=>`<option value="${t[0]}" ${t[0]===j().theme?'selected':''}>${t[1]} ${t[2]}</option>`).join('')}</select></label><label><input id="j-calm" type="checkbox" ${j().calm?'checked':''}> Calmer explorer look</label></div><p class="journey-note">Your choice is saved for this hero. Theme and reading skills are separate.</p><button class="btn light" id="j-all">📚 All twelve bands</button><button class="btn light" id="j-resume">▶ My starting band: ${j().startBand}</button>`);
  modal.querySelector('#pick-own').onclick=allBands;modal.querySelector('#pick-help').onclick=placementIntro;modal.querySelector('#pick-grown').onclick=grown;
  modal.querySelector('#j-all').onclick=allBands;modal.querySelector('#j-resume').onclick=()=>openBand(j().startBand);
  on('[data-entry]',b=>{entry=b.dataset.entry;const group=entryGroups.find(x=>x[0]===entry);showEntry(group);});
  modal.querySelector('#j-theme').onchange=e=>{j().theme=e.target.value;save();landing();};
  modal.querySelector('#j-calm').onchange=e=>{j().calm=e.target.checked;save();landing();};
 }
 function showEntry(group){
  const [label,icon,range]=group;
  shell(label,`<div class="journey-preview"><span class="journey-icon">${icon}</span><p>☝ Look → tap → help Pip.</p><button class="btn light" id="entry-hear">🔊 Hear this choice</button></div><div class="journey-grid">${range.map(i=>`<button class="journey-card" data-band="${i}"><strong>${bands[i-1].title}</strong><small>${escapeHtml(bands[i-1].objective)}</small><span>▶ Choose</span></button>`).join('')}</div><button class="btn light" id="more-bands">All bands</button>`);
  modal.querySelector('#entry-hear').onclick=()=>voice(label+'. '+bands[range[0]-1].objective);
  modal.querySelector('#more-bands').onclick=allBands;on('[data-band]',b=>openBand(Number(b.dataset.band)));
 }
 function allBands(){
  shell('All skills',`<p class="journey-note">Choose any band. No locks and no reading-age labels.</p><div class="journey-band-list">${bands.map(b=>`<button class="journey-band" data-band="${b.id}"><span class="journey-number">${b.id}</span><span><strong>${escapeHtml(b.title)}</strong><small>${escapeHtml(b.objective)}</small></span><span>▶</span></button>`).join('')}</div>`);
  on('[data-band]',b=>openBand(Number(b.dataset.band)));
 }
 function openBand(number){
  narrator.stop();soundPlayer.stop();const b=bands[number-1];if(!b)return;
  j().startBand=number;save();
  shell(b.title,`<p class="journey-note">${escapeHtml(b.objective)}</p><button class="btn orange" id="j-start-here">★ Make this my starting point</button><div class="journey-grid">${missions.filter(m=>m.band===number).map(m=>`<button class="journey-card" data-mission="${m.id}"><span class="journey-icon">${themes.find(t=>t[0]===j().theme)?.[1]||'🤖'}</span><strong>${m.id}. ${escapeHtml(m.scene)}</strong><small>${escapeHtml(m.question||m.target||m.scene)}</small><span>${j().completed.includes(missionKey(number,m.id))?'✓ Replay':'▶ Go'}</span></button>`).join('')}</div><p class="journey-note">Missions and stars never complete earlier bands automatically.</p>`);
  modal.querySelector('#j-start-here').onclick=()=>{j().startBand=number;save();openBand(number);};
  on('[data-mission]',b=>start(number,Number(b.dataset.mission)));
 }
 function grown(){
  shell('Grown-up choices',`<p class="journey-note">These are practice selections, not formal reading assessments.</p><label>Starting band <select id="adult-band">${bands.map(b=>`<option value="${b.id}" ${b.id===j().startBand?'selected':''}>${b.id}: ${escapeHtml(b.title)}</option>`).join('')}</select></label><label>Skill or word <select id="adult-specific"><option value="">All missions in selected band</option>${missions.map(m=>`<option value="${m.band}:${m.id}">Band ${m.band} — ${escapeHtml(m.target||m.question)}</option>`).join('')}</select></label><label>Practice focus <select id="adult-focus">${['auto','sound','decoding','vocabulary','fluency','comprehension'].map(x=>`<option value="${x}" ${j().focus===x?'selected':''}>${x}</option>`).join('')}</select></label><button class="btn orange" id="adult-set">Save and open</button><p class="journey-note">Select any mission next. Sounds, words and reading comprehension are tracked separately.</p>`);
  modal.querySelector('#adult-set').onclick=()=>{j().startBand=Number(modal.querySelector('#adult-band').value);j().focus=modal.querySelector('#adult-focus').value;save();const item=modal.querySelector('#adult-specific').value;if(item){const [band,id]=item.split(':').map(Number);start(band,id);}else openBand(j().startBand);};
 }
 const probes=[['Which word says cat?','cat',['mat','cat','sun'],1],['Which word has sh?','ship',['ship','sip','sat'],0],['Find the key detail: The robot waited because the rain was heavy.','rain',['the robot was red','the gate was open','the rain was heavy'],2]];
 function placementIntro(){
  placement=0;placementCorrect=[];
  shell('Help me choose',`<div class="journey-preview"><span class="journey-icon">🔎</span><p>Three little tries. No timer. Skip any time.</p></div><button class="btn orange" id="probe-start">▶ Try</button><button class="btn light" id="probe-skip">Skip — choose myself</button>`);
  modal.querySelector('#probe-start').onclick=placementView;modal.querySelector('#probe-skip').onclick=allBands;
 }
 function placementView(){
  if(placement>=probes.length){
   const suggestion=suggestBand(placementCorrect);
   shell('A place to try',`<p class="journey-note">Based only on these three tries, you could explore <strong>${escapeHtml(bands[suggestion-1].title)}</strong>. This is not a test, diagnosis or reading age.</p><button class="btn orange" id="use-suggestion">▶ Try band ${suggestion}</button><button class="btn light" id="other-suggestion">Choose a different band</button>`);
   modal.querySelector('#use-suggestion').onclick=()=>{j().startBand=suggestion;save();openBand(suggestion);};modal.querySelector('#other-suggestion').onclick=allBands;return;
  }
  const [question,spoken,options,answer]=probes[placement];
  shell('Try '+(placement+1)+' / 3',`<p class="journey-prompt">${escapeHtml(question)}</p><button class="btn light" id="probe-audio">🔊 Hear</button><div class="journey-grid">${options.map((x,i)=>`<button class="journey-card" data-probe="${i}">${escapeHtml(x)}</button>`).join('')}</div><button class="btn light" id="probe-skip">Skip this</button>`);
  modal.querySelector('#probe-audio').onclick=()=>voice(spoken);on('[data-probe]',b=>{placementCorrect.push(Number(b.dataset.probe)===answer);placement++;placementView();});modal.querySelector('#probe-skip').onclick=()=>{placementCorrect.push(false);placement++;placementView();};
 }
 function start(band,id){
  narrator.stop();soundPlayer.stop();if(!selectableMission(band,id))return;
  current=missions.find(m=>m.band===band&&m.id===id);session=sessionId();stage='show';practiceSupport=false;reset();drawMission();
 }
 function reset(){tapped=[];selected=null;help=false;heard=false;model=false;feedback='';}
 const tiles=m=>m.type==='tiles'?m.tiles: m.type==='sound'?[m.target]:[];
 function modelBody(m){
  if(isLab(m))return labModel(m);
  if(m.type==='tiles')return `<p class="journey-model">${m.tiles.map(x=>`<span class="journey-tile">${escapeHtml(x)}</span>`).join('')}</p><small>One sound spelling per tile. Say each sound, then blend.</small>`;
  if(m.type==='sound')return `<p class="journey-model"><span class="journey-tile">${escapeHtml(m.target)}</span></p><small>Grown-up: model the pure phoneme. Do not use the letter name.</small>`;
  return `<blockquote class="journey-passage">${sentenceList(m.text).map((s,i)=>`<span class="${i===m.evidence?'journey-evidence':''}">${escapeHtml(s)} </span>`).join('')}</blockquote><small>The highlighted sentence is one possible evidence location.</small>`;
 }
 function optionsFor(m){if(m.type==='sound')return [...new Set([m.target,...['s','a','m','p','t','i','n','d','g','o','c','k'].filter(x=>x!==m.target).slice(0,3)])].slice(0,4);
 if(m.type==='tiles'){const pool=[...m.tiles];for(const g of ['s','a','t','p','i','n','sh','ch','ee','ai'])if(pool.length<m.tiles.length+2&&!m.tiles.includes(g))pool.push(g);return pool;}return [];}
 function exercise(m){
  if(stage==='transfer'&&m.application){const words=m.application.text.match(/[A-Za-z]+|[^A-Za-z]+/g)||[];let n=0;return `<p class="journey-prompt">📖 Find the word in this message</p><div class="journey-short-text">${words.map(w=>/^[A-Za-z]+$/.test(w)?`<button class="journey-short-word ${selected===n?'picked':''}" data-transfer="${n++}" aria-pressed="${selected===n-1}">${escapeHtml(w)}</button>`:escapeHtml(w)).join('')}</div><button class="btn light" id="j-short-hear">🔊 Hear the message (help)</button><p class="journey-note">Look for <strong>${escapeHtml(m.target)}</strong>. An adult can read the rest.</p>`;}
  if(isLab(m))return labExercise(m,tapped);
  if(m.type==='evidence')return `<p class="journey-prompt">${escapeHtml(m.question)}</p><div class="journey-sentences">${sentenceList(m.text).map((s,i)=>`<button class="journey-sentence ${selected===i?'picked':''}" data-pick="${i}" aria-pressed="${selected===i}">${escapeHtml(s)}</button>`).join('')}</div>`;
  if(m.type==='sound')return `<p class="journey-prompt">👂 🔤 Find the sound</p><button class="btn light" id="j-sound">🔊 Sound / 🧑 Adult</button><small>${soundPlayer.has(m.target)?'Tap to hear the recorded sound.':'🧑 No phoneme recording on this device: a grown-up models it.'}</small><div class="journey-tiles">${optionsFor(m).map((t,i)=>`<button class="journey-tile ${selected===i?'picked':''}" data-pick="${i}">${escapeHtml(t)}</button>`).join('')}</div>`;
  return `<p class="journey-prompt">🔊 → ▦ Build the word</p><button class="btn light" id="j-word">🔊 Hear word</button><div class="journey-slots">${m.tiles.map((g,i)=>`<span class="journey-slot">${escapeHtml(tapped[i]||'·')}</span>`).join('')}</div><div class="journey-tiles">${optionsFor(m).map((t,i)=>`<button class="journey-tile" data-tap="${i}">${escapeHtml(t)}</button>`).join('')}</div><button class="btn light" id="j-reset">↺ Reset</button>`;
 }
 function drawMission(){
  const m=current,b=bands[m.band-1],theme=themes.find(x=>x[0]===j().theme);
  shell(m.scene,`<div class="journey-mission"><div class="journey-adventure" aria-hidden="true"><span>${theme?.[1]||'🤖'}</span><span>→</span><span>⚡</span><span>→</span><span>⭐</span></div><p class="journey-note">${escapeHtml(b.title)} · ${m.id} / 12 · ${stage==='show'?'Show me':stage==='practice'?'Practise together':stage==='transfer'?'Use it in a message':'Do the mission'}</p>${stage==='show'? `<div class="journey-visual">${escapeHtml(m.example)}<div>${isLab(m)?labIntro(m):modelBody(m)}</div></div><button class="btn light" id="j-model-audio">🔊 Hear example</button><div class="journey-actions"><button class="btn orange" id="j-practice">▶ Practise</button><button class="btn light" id="j-independent">Skip help → Try</button></div>`:`<div class="journey-visual">${stage==='practice'||help?modelBody(m):''}</div>${exercise(m)}<p class="journey-feedback" role="status">${escapeHtml(feedback)}</p><div class="journey-actions"><button class="btn light" id="j-help">☝ Show me</button><button class="btn orange" id="j-check">✓ Check</button></div>`}</div>`);
  if(stage==='show'){
   modal.querySelector('#j-model-audio').onclick=()=>m.type==='sound'?playSound(m.target):voice(m.type==='tiles'?m.target:isLab(m)?labSpokenText(m):m.text);
   modal.querySelector('#j-practice').onclick=()=>{stage='practice';reset();model=true;drawMission();};
   modal.querySelector('#j-independent').onclick=()=>{stage='apply';reset();drawMission();};return;
  }
  const soundBtn=modal.querySelector('#j-sound');if(soundBtn)soundBtn.onclick=()=>playSound(m.target);
  const wordBtn=modal.querySelector('#j-word');if(wordBtn)wordBtn.onclick=()=>{heard=true;voice(m.target);};
  on('[data-pick]',b=>{selected=Number(b.dataset.pick);feedback='';drawMission();});
  on('[data-transfer]',b=>{selected=Number(b.dataset.transfer);feedback='';drawMission();});
  const shortHear=modal.querySelector('#j-short-hear');if(shortHear)shortHear.onclick=()=>{help=true;voice(m.application.text);};
  on('[data-tap]',b=>{if(tapped.length<m.tiles.length){tapped.push(optionsFor(m)[Number(b.dataset.tap)]);feedback='';drawMission();}});
  on('[data-board]',b=>{tapped=addLabCard(m,tapped,Number(b.dataset.board));feedback='';drawMission();});
  on('[data-undo]',b=>{tapped.splice(Number(b.dataset.undo),1);feedback='';drawMission();});
  on('[data-quote]',b=>{tapped=selectQuoteWord(tapped,Number(b.dataset.quote));feedback='';drawMission();});
  const resetBtn=modal.querySelector('#j-reset');if(resetBtn)resetBtn.onclick=()=>{tapped=[];drawMission();};
  modal.querySelector('#j-help').onclick=()=>{help=true;model=true;feedback=m.type==='evidence'?'Look for the highlighted detail.':isLab(m)?'Follow the worked example.':'Follow the example tiles.';drawMission();};
  modal.querySelector('#j-check').onclick=check;
 }
 function playSound(grapheme){
  heard=true;
  if(!soundPlayer.has(grapheme)){help=true;feedback='🧑 Ask a grown-up to say this sound. No recording is saved.';drawMission();return;}
  soundPlayer.play([grapheme],{onError:()=>{help=true;feedback='🧑 Please ask a grown-up to model this sound.';drawMission();}});
 }
 function check(){
  const m=current;const transfer=stage==='transfer'&&!!m.application;const hasAnswer=transfer?selected!==null:m.type==='tiles'?tapped.length===m.tiles.length:isLab(m)?hasLabAnswer(m,tapped):selected!==null;
  if(!hasAnswer){feedback='☝ Try one first.';drawMission();return;}
  const correct=transfer?(m.application.text.match(/[A-Za-z]+/g)||[])[selected]?.toLowerCase()===m.target:m.type==='tiles'?tapped.every((g,i)=>g===m.tiles[i]):isLab(m)?answerLab(m,tapped):m.type==='sound'?optionsFor(m)[selected]===m.target:selected===m.evidence;
  recordResponse(p(),{band:m.band,mission:m.id,type:m.type,skill:m.skill,phase:stage,correct,supported:help||model||practiceSupport||stage==='practice'||(m.type==='sound'&&!soundPlayer.has(m.target)),audio:heard,model,session,at:Date.now()});
  save();
  if(!correct){help=true;feedback='↺ Have another go. Use Show me for a clue.';drawMission();return;}
  if(stage==='practice'){practiceSupport=true;stage='apply';reset();feedback='';drawMission();return;}
  if(stage==='apply'&&m.application){stage='transfer';reset();drawMission();return;}
  const first=finishJourneyMission(p(),m.band,m.id);save();
  shell('⭐ Mission complete',`<div class="journey-celebrate"><span>${themes.find(x=>x[0]===j().theme)?.[1]||'🤖'}</span><span>⚡</span><span>⭐</span></div><p>${escapeHtml(m.outcome||'Equipment restored!')} ${first?'A new star for this mission.':'A good replay — your star was already saved.'}</p><p class="journey-note">Finishing an adventure is separate from demonstrating a reading skill.</p><button class="btn orange" id="j-next">▶ Next mission</button><button class="btn light" id="j-band">↩ Band map</button>`);
  modal.querySelector('#j-next').onclick=()=>m.id<12?start(m.band,m.id+1):openBand(m.band);modal.querySelector('#j-band').onclick=()=>openBand(m.band);
 }
 return {open:landing,openBand,openMission:start};
}
export function journeyDashboard(profile){
 const j=journeyFor(profile),s=readingSummary(profile);
 const areaLabels={listening:'Listening',decoding:'Decoding',vocabulary:'Vocabulary',fluency:'Fluency',comprehension:'Comprehension'};
 return `<section class="panel journey-adult"><h2>Reading journey · grown-up view</h2><p>Starting point: band ${j.startBand} · ${escapeHtml(bands[j.startBand-1].title)}. Adventure: ${escapeHtml(j.theme)}. Calm presentation: ${j.calm?'on':'off'}.</p><p>Game observations only; not a reading-age assessment, professional review or diagnosis. Historical town answers do not count towards these skills.</p><table><thead><tr><th>Area</th><th>Independent</th><th>Supported</th></tr></thead><tbody>${Object.entries(s.areas).map(([area,count])=>`<tr><td>${areaLabels[area]}</td><td>${count.independent}</td><td>${count.supported}</td></tr>`).join('')}</tbody></table><p><strong>Optional review:</strong> ${nextPractices(profile).map(n=>escapeHtml(bands[n-1].title)).join(' · ')||'Explore any band'}.</p><p><strong>Sounds and patterns to practise:</strong> ${[...new Set(j.records.filter(x=>!x.correct||x.supported).map(x=>x.skill))].slice(-8).map(escapeHtml).join(' · ')||'No particular pattern flagged yet'}.</p><p><strong>Content version:</strong> ${CONTENT_VERSION}. Records keep their original content version if questions change. Local phoneme recordings are not included in JSON backups.</p></section>`;
}
