import test from 'node:test';
import assert from 'node:assert/strict';
import {missions,validateJourneyContent,CONTENT_VERSION} from '../dist/journey-content.js';
import {labMissions,quoteRange,validateLabMissions} from '../dist/quest-labs.js';
import {isLab,labIntro,labModel,labExercise,answerLab,hasLabAnswer,addLabCard,selectQuoteWord} from '../dist/lab-ui.js';
import {controlledTexts,inspectText,applicationFor,validateApplications} from '../dist/phonics-application.js';
import {initialState,validateSave} from '../dist/state.js';
import {recordResponse,finishJourneyMission} from '../dist/journey.js';

test('36 distinct advanced reading investigations are fully authored, checked and versioned',()=>{
 assert.equal(validateJourneyContent(),true);
 assert.equal(validateLabMissions(),36);
 assert.equal(labMissions.length,36);
 assert.equal(CONTENT_VERSION,'2026.10.19-draft2');
 const types=new Set(labMissions.map(x=>x.type));
 assert.deepEqual([...types].sort(),['claim','compare','quote','sequence']);
 for(const m of labMissions)assert.equal(missions.find(x=>x.band===m.band&&x.id===m.id)?.type,m.type);
});
test('all lab types have a visible worked example and a correct, rejectable solution',()=>{
 for(const m of labMissions){
  assert.equal(isLab(m),true);
  assert.match(labIntro(m),/Example/);
  assert.ok(labModel(m).length>20);
  assert.ok(labExercise(m).length>120);
  const right=m.type==='quote'?(()=>{const [a,b]=quoteRange(m.text,m.phrase);return Array.from({length:b-a+1},(_,i)=>a+i);})():m.solution;
  assert.equal(hasLabAnswer(m,right),true);
  assert.equal(answerLab(m,right),true);
  assert.equal(answerLab(m,[]),false);
  if(m.type==='quote')assert.equal(answerLab(m,[right[0]+1]),false);
  else assert.equal(answerLab(m,[...right].reverse()),false);
 }
});
test('boards only accept valid unique card taps; quoted phrase must be contiguous',()=>{
 const m=labMissions.find(x=>x.type==='claim');
 assert.deepEqual(addLabCard(m,[],0),[0]);
 assert.deepEqual(addLabCard(m,[0],0),[0]);
 assert.deepEqual(addLabCard(m,[0],100),[0]);
 assert.deepEqual(selectQuoteWord([],3),[3]);
 assert.deepEqual(selectQuoteWord([3],4),[3,4]);
 assert.deepEqual(selectQuoteWord([3,4],9),[9]);
});
test('48 short-text applications check declared spellings and one exact target',()=>{
 assert.equal(validateApplications({2:missions.filter(m=>m.band===2).map(m=>m.target),3:missions.filter(m=>m.band===3).map(m=>m.target),4:missions.filter(m=>m.band===4).map(m=>m.target),5:missions.filter(m=>m.band===5).map(m=>m.target)}),48);
 for(let band=2;band<=5;band++)for(const m of missions.filter(x=>x.band===band)){
  assert.ok(m.application);
  assert.deepEqual(inspectText(m.application.text,band),[]);
  assert.equal(applicationFor(band,m.id,m.target).target,m.target);
 }
 assert.ok(inspectText('a whale swims',2).length>0);
 assert.throws(()=>applicationFor(2,1,'whale'));
});
test('new challenge and application records survive valid backups but do not rewrite old progress',()=>{
 const s=initialState(),p=s.profiles[0];p.done=[1,7];
 recordResponse(p,{band:12,mission:2,type:'claim',skill:'comprehension:claim',phase:'apply',correct:true,supported:false,audio:false,model:false,session:'visit-a',at:Date.now()});
 recordResponse(p,{band:2,mission:1,type:'tiles',skill:'decoding:sat',phase:'transfer',correct:true,supported:true,audio:true,model:false,session:'visit-a',at:Date.now()});
 finishJourneyMission(p,12,2);
 const restored=validateSave(JSON.parse(JSON.stringify(s)));
 assert.deepEqual(restored,s);
 assert.deepEqual(restored.profiles[0].done,[1,7]);
 assert.equal(restored.profiles[0].journey.records[1].phase,'transfer');
 const malicious=JSON.parse(JSON.stringify(s));malicious.profiles[0].journey.records[0].type='arbitrary';assert.throws(()=>validateSave(malicious));
});
