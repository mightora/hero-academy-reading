// Short, controlled practice texts. Draft for expert phonics review; machine checks are not human sign-off.
import {segmentWord} from './learning.js';
export const controlledTexts={
  "2": [
    "Sam sat.",
    "a pin in a tin.",
    "tap a tin.",
    "a mat.",
    "sit at a mat.",
    "a pan.",
    "a nap.",
    "a tin.",
    "pat a mat.",
    "a map.",
    "sip it.",
    "dip it."
  ],
  "3": [
    "a dog on a mat.",
    "a log in a bag.",
    "a cat on a mat.",
    "a cup in a bag.",
    "sun on a hut.",
    "a red cap.",
    "a hen in a pen.",
    "a bed in a hut.",
    "a bug on a log.",
    "hop on a mat.",
    "run in a hut.",
    "fit a lid."
  ],
  "4": [
    "a ship in a dock.",
    "fish in a dish.",
    "a shop.",
    "chin on a hand.",
    "a chat at a shop.",
    "a thin sock.",
    "a ring in a bag.",
    "sing at a camp.",
    "a sock on a bed.",
    "a duck in a pond.",
    "a flag on a ship.",
    "a drum in a shop."
  ],
  "5": [
    "rain on a ship.",
    "a train in a shed.",
    "a seed in a pot.",
    "green grass.",
    "a light at night.",
    "bright light.",
    "a boat on a pond.",
    "a road in a park.",
    "a moon in the night.",
    "a star in the dark.",
    "a coin in a bag.",
    "a hair in a brush."
  ]
};
export const exceptionIntroduced={2:['a'],3:['a'],4:['a'],5:['a','the']};
export const spellingsByBand={
 2:'s a t p i n m d'.split(' '),
 3:'s a t p i n m d g o c k ck e u r h b f l'.split(' '),
 4:'s a t p i n m d g o c k ck e u r h b f l ff ll ss sh ch th ng'.split(' '),
 5:'s a t p i n m d g o c k ck e u r h b f l ff ll ss sh ch th ng ai ee igh oa oo ar or ur ow oi ear air'.split(' ')
};
export const wordTokens=text=>text.match(/[a-z]+/gi)?.map(x=>x.toLowerCase())||[];
export function inspectText(text,band){
 if(!spellingsByBand[band]||typeof text!=='string')throw Error('Invalid controlled text');
 const allowed=new Set(spellingsByBand[band]),exceptions=new Set(exceptionIntroduced[band]);
 return wordTokens(text).flatMap(word=>exceptions.has(word)?[]:segmentWord(word).filter(g=>!allowed.has(g)).map(g=>({word,grapheme:g})));
}
export function applicationFor(band,id,target){
 const text=controlledTexts[band]?.[id-1];if(!text)return null;
 const matches=wordTokens(text).filter(x=>x===target.toLowerCase()).length;
 if(matches!==1)throw Error('Target must occur exactly once in short text: '+band+':'+id);
 const missing=inspectText(text,band);
 if(missing.length)throw Error('Untaught spellings in '+band+':'+id+' '+JSON.stringify(missing));
 return {text,target,exceptionWords:exceptionIntroduced[band],reviewStatus:'draft-needs-phonics-review'};
}
export function validateApplications(wordSets){
 let count=0;
 for(const [band,words] of Object.entries(wordSets)){if(!controlledTexts[band])continue;
  if(words.length!==12||controlledTexts[band].length!==12)throw Error('Incomplete short-text library');
  for(let i=0;i<words.length;i++){applicationFor(Number(band),i+1,words[i]);count++;}
 }
 return count;
}
