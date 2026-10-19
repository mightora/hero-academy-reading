// Presentation and checking for curated multi-step missions. No generated educational content.
import {quoteRange,normalizeWords} from './quest-labs.js';
export const isLab=m=>['sequence','quote','compare','claim'].includes(m?.type);
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function labIntro(m){
 if(m.type==='quote')return '<div class="journey-preview">Example: “The door was locked.” → tap <strong>door was locked</strong>.</div>';
 if(m.type==='sequence')return '<div class="journey-preview">Example: 🌱 Seed → 💧 Water → 🌼 Flower. Tap one card for each slot.</div>';
 if(m.type==='compare')return '<div class="journey-preview">Example: 📄 A says “quick”. 📄 B says “safer”. Find what each source really says.</div>';
 if(m.type==='claim')return '<div class="journey-preview">Example: 4 out of 5 worked → not “all worked”. Check the evidence and missing facts.</div>';
 return '';
}
export function labModel(m){
 if(m.type==='quote'){const [start,end]=quoteRange(m.text,m.phrase);return '<p class="journey-model">'+normalizeWords(m.text).map((w,i)=>i>=start&&i<=end?'<mark>'+escape(w)+'</mark>':escape(w)).join(' ')+'</p><small>These are the words that support this example.</small>';}
 return '<div class="journey-board-model">'+m.solution.map(i=>'<span class="journey-piece model-piece">'+escape(m.cards[i])+'</span>').join('<span aria-hidden="true"> → </span>')+'</div><p class="journey-note">'+escape(m.example)+'</p>';
}
export function labExercise(m,tapped=[]){
 if(m.type==='quote'){
  return '<p class="journey-prompt">'+escape(m.question)+'</p><p class="journey-note">Tap the first word, then the next words in the exact phrase.</p><div class="journey-quote" role="group" aria-label="Choose a phrase from the passage">'+normalizeWords(m.text).map((word,i)=>'<button class="journey-word '+(tapped.includes(i)?'picked':'')+'" data-quote="'+i+'" aria-pressed="'+tapped.includes(i)+'">'+escape(word)+'</button>').join(' ')+'</div><button class="btn light" id="j-reset">↺ Clear words</button>';
 }
 const source=m.type==='compare'?'<div class="journey-source-grid">'+m.sources.map(s=>'<article class="journey-source"><strong>'+escape(s.label)+'</strong><p>'+escape(s.text)+'</p></article>').join('')+'</div>':m.type==='claim'?'<p class="journey-prompt">Claim: '+escape(m.claim)+'</p><blockquote class="journey-source">'+escape(m.source)+'</blockquote>':'<blockquote class="journey-source">'+escape(m.text||m.question)+'</blockquote>';
 const slots='<div class="journey-board" role="group" aria-label="Ordered answer slots">'+m.slots.map((slot,i)=>'<button class="journey-board-slot" data-undo="'+i+'" aria-label="'+escape(slot)+': '+escape(tapped[i]===undefined?'empty. Tap a card':m.cards[tapped[i]])+'"><strong>'+escape(slot)+'</strong><span>'+escape(tapped[i]===undefined?'＋ Tap a card':m.cards[tapped[i]])+'</span></button>').join('')+'</div>';
 const cards='<div class="journey-card-bank" role="group" aria-label="Available cards">'+m.cards.map((card,i)=>'<button class="journey-piece '+(tapped.includes(i)?'picked':'')+'" data-board="'+i+'" '+(tapped.includes(i)?'disabled':'')+'>'+escape(card)+'</button>').join('')+'</div>';
 return '<p class="journey-prompt">'+escape(m.question)+'</p>'+source+slots+cards+'<button class="btn light" id="j-reset">↺ Reset cards</button>';
}
export function answerLab(m,tapped){
 if(!isLab(m)||!Array.isArray(tapped))return false;
 if(m.type==='quote'){const range=quoteRange(m.text,m.phrase);return !!range&&tapped.length===range[1]-range[0]+1&&tapped.every((v,i)=>v===range[0]+i);}
 return tapped.length===m.solution.length&&tapped.every((v,i)=>v===m.solution[i]);
}
export function hasLabAnswer(m,tapped){
 return m.type==='quote'?tapped.length>0:tapped.length===m.solution.length;
}
export function labSpokenText(m){return m.text||m.sources?.map(s=>s.label+'. '+s.text).join(' ')||m.source||m.question||'';}
export function addLabCard(m,tapped,index){return !isLab(m)||m.type==='quote'||!Number.isInteger(index)||index<0||index>=m.cards.length||tapped.includes(index)||tapped.length>=m.solution.length?tapped:[...tapped,index];}
export function selectQuoteWord(tapped,index){if(!Number.isInteger(index)||index<0)return tapped;return !tapped.length?[index]:index===tapped.at(-1)+1?[...tapped,index]:[index];}
