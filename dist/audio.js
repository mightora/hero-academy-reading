// Whole-word narration only. Individual phonics sounds need reviewed recordings.
export const voiceKey=v=>v.voiceURI||v.name;
// Browsers expose no gender field. Names are a preference heuristic, not a guarantee.
const feminineName=/\b(serena|kate|martha|samantha|victoria|susan|hazel|sonia|zira|aria|jenny|female)\b/i;
export function chooseVoice(voices,preferred=''){
 const english=voices.filter(v=>/^en([-_]|$)/i.test(v.lang));
 const selected=english.find(v=>voiceKey(v)===preferred);if(selected)return selected;
 return english.map((v,i)=>({v,i,score:(feminineName.test(v.name||'')?100:0)+(/^en[-_]GB$/i.test(v.lang)?40:0)+(/enhanced|premium|natural|neural/i.test(v.name||'')?12:0)+(v.localService?5:0)})).sort((a,b)=>b.score-a.score||a.i-b.i)[0]?.v||null;
}
export function createNarrator(host,onStatus=()=>{}){
 const synth=host.speechSynthesis,Utterance=host.SpeechSynthesisUtterance;let voices=[],current=null,watchdog=null;
 const supported=!!(synth&&Utterance);
 function loadVoices(){if(supported)voices=synth.getVoices?.()||[];}
 if(supported){loadVoices();synth.addEventListener?.('voiceschanged',loadVoices);}
 function clearTimer(){if(watchdog!==null){host.clearTimeout(watchdog);watchdog=null;}}
 function stop(){clearTimer();current=null;if(supported)synth.cancel();onStatus('idle');}
 function speak(text,{slow=false,voiceURI='',rate=.85}={}){
  if(!supported){onStatus('unavailable');return false;}
  if(typeof text!=='string'||!text.trim())return false;
  clearTimer();current=null;synth.cancel();loadVoices();
  const utterance=new Utterance(text);current=utterance;utterance.lang='en-GB';utterance.rate=slow?.65:([.75,.85,1].includes(rate)?rate:.85);utterance.pitch=1;utterance.volume=1;const voice=chooseVoice(voices,voiceURI);if(voice){utterance.voice=voice;utterance.lang=voice.lang;}
  utterance.onstart=()=>{if(current!==utterance)return;clearTimer();onStatus('speaking');};
  utterance.onend=()=>{if(current!==utterance)return;clearTimer();current=null;onStatus('idle');};
  utterance.onerror=e=>{if(current!==utterance)return;clearTimer();current=null;onStatus(['canceled','interrupted'].includes(e.error)?'idle':'error');};
  onStatus('starting');
  // Speak synchronously within the tap event, retaining the utterance until completion.
  try{synth.speak(utterance);watchdog=host.setTimeout(()=>{if(current===utterance)onStatus('timeout');},8000);return true;}catch{current=null;onStatus('error');return false;}
 }
 return {supported,speak,stop,listVoices:()=>{loadVoices();return voices.filter(v=>/^en([-_]|$)/i.test(v.lang));}};
}
