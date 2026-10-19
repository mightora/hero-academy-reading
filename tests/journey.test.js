import test from 'node:test';
import assert from 'node:assert/strict';
import {bands,missions,validateJourneyContent,selectableMission,CONTENT_VERSION} from '../dist/journey-content.js';
import {segmentWord} from '../dist/learning.js';
import {initialState,validateSave,freshProfile} from '../dist/state.js';
import {recordResponse,readingSummary,finishJourneyMission,missionKey,suggestBand,nextPractices} from '../dist/journey.js';

const response=(overrides={})=>({band:2,mission:1,type:'tiles',skill:'decoding:sat',phase:'apply',correct:true,supported:false,audio:false,model:false,session:'morning',at:Date.now(),...overrides});
test('Twelve skill bands expose exactly twelve distinct playable missions, all directly selectable',()=>{
 assert.equal(bands.length,12);assert.equal(missions.length,144);assert.equal(validateJourneyContent(),true);
 for(let band=1;band<=12;band++)for(let id=1;id<=12;id++){
  assert.ok(selectableMission(band,id));assert.equal(missions.filter(m=>m.band===band&&m.id===id).length,1);
 }
 assert.equal(selectableMission(13,1),false);assert.equal(selectableMission(1,13),false);
});
test('Grapheme tokens stay intact; sound teams are not split into letter names',()=>{
 for(const [word,parts] of [['ship',['sh','i','p']],['thin',['th','i','n']],['ring',['r','i','ng']],['night',['n','igh','t']],['train',['t','r','ai','n']],['moon',['m','oo','n']],['coin',['c','oi','n']]])assert.deepEqual(segmentWord(word),parts);
});
test('Band catalogue declares a teaching order and preserves authored text references',()=>{
 for(const m of missions){assert.ok(m.skill);assert.ok(m.scene);if(m.type==='evidence'){assert.ok(m.text);assert.ok(m.question);}if(m.type==='tiles')assert.equal(m.tiles.join(''),m.target);}
 assert.ok(CONTENT_VERSION.length>8);
});
test('V1 saves migrate without treating historical answers as new skill evidence',()=>{
 const old=initialState();old.version=1;delete old.profiles[0].journey;
 old.profiles[0].done=[9];old.profiles[0].attempts=[{mission:1,task:0,correct:true,supported:false,at:1}];
 const migrated=validateSave(JSON.parse(JSON.stringify(old)));
 assert.equal(migrated.version,2);assert.deepEqual(migrated.profiles[0].done,[9]);assert.equal(migrated.profiles[0].attempts.length,1);
 assert.equal(migrated.profiles[0].journey.records.length,0);assert.equal(migrated.profiles[0].journey.completed.length,0);
});
test('Starting band and selected adventure belong separately to each local hero',()=>{
 const save=initialState();save.profiles.push(freshProfile('Second hero'));
 save.profiles[0].journey.startBand=11;save.profiles[0].journey.theme='mystery';
 save.profiles[1].journey.startBand=2;save.profiles[1].journey.theme='robot';
 assert.deepEqual(validateSave(JSON.parse(JSON.stringify(save))),save);
 assert.equal(save.profiles[0].journey.startBand,11);assert.equal(save.profiles[1].journey.startBand,2);
});
test('Intro suggestions are optional heuristics; they do not write progress',()=>{
 const p=freshProfile();assert.equal(suggestBand([false,false,false]),2);assert.equal(suggestBand([true,true,true]),11);assert.deepEqual(p.journey.records,[]);
});
test('Separate independent, supported, error and repeated-session evidence',()=>{
 const p=freshProfile();
 recordResponse(p,response({supported:true,phase:'practice'}));
 recordResponse(p,response({correct:false,phase:'apply'}));
 recordResponse(p,response({supported:true,phase:'apply'}));
 let row=readingSummary(p).bands[1];assert.equal(row.supported,1);assert.equal(row.independent,0);assert.equal(row.practice,true);
 recordResponse(p,response({session:'morning'}));recordResponse(p,response({session:'evening'}));
 row=readingSummary(p).bands[1];assert.equal(row.independent,2);assert.equal(row.visits,2);assert.equal(row.practice,false);
 assert.equal(readingSummary(p).areas.decoding.independent,2);
});
test('Completion stars are independent from answers and replay cannot award a second star',()=>{
 const p=freshProfile();
 assert.equal(finishJourneyMission(p,12,12),true);assert.equal(finishJourneyMission(p,12,12),false);
 assert.deepEqual(p.journey.completed,[missionKey(12,12)]);
 assert.deepEqual(p.done,[]);
 assert.deepEqual(nextPractices(p).every(x=>Number.isInteger(x)),true);
});
test('Malformed backups fail closed and invalid records never become valid skills',()=>{
 const s=initialState();
 for(const change of [x=>x.startBand=42,x=>x.completed=['12-01','12-01'],x=>x.records=[{correct:true}],x=>x.theme='invalid']){
  const copy=JSON.parse(JSON.stringify(s));change(copy.profiles[0].journey);assert.throws(()=>validateSave(copy));
 }
 assert.throws(()=>recordResponse(s.profiles[0],response({skill:'x'.repeat(100)})));
 assert.equal(s.profiles[0].journey.records.length,0);
});
