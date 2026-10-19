import {test,expect} from '@playwright/test';
import {missions,bands} from '../dist/journey-content.js';
test.setTimeout(180000);
test('all twelve bands can be opened and a representative mission can be completed',async({page})=>{
 await page.goto('/');
 if(await page.locator('#modal [data-close]').count())await page.locator('#modal [data-close]').first().click();
 await expect(page.locator('nav [data-action="levels"]')).toBeVisible();
 for(const band of bands){
  await page.locator('nav [data-action="levels"]').click();
  await page.locator('#j-all').click();
  await page.locator('#modal [data-band="'+band.id+'"]').click();
  await page.locator('#modal [data-mission="1"]').click();
  await page.locator('#j-independent').click();
  const m=missions.find(x=>x.band===band.id&&x.id===1);
  if(m.type==='evidence')await page.locator('#modal [data-pick="'+m.evidence+'"]').click();
  else if(m.type==='sound'){
   const options=page.locator('#modal button[data-pick]');
   const choices=await options.allTextContents();const index=choices.findIndex(x=>x.trim()===m.target);
   expect(index).toBeGreaterThanOrEqual(0);await options.nth(index).click();
  }else{
   for(const token of m.tiles){
    const options=page.locator('#modal button[data-tap]');
    const choices=await options.allTextContents();const index=choices.findIndex(x=>x.trim()===token);
    expect(index).toBeGreaterThanOrEqual(0);await options.nth(index).click();
   }
  }
  await page.locator('#j-check').click();
  await expect(page.locator('#modal')).toContainText('Mission complete');
  const overflow=await page.evaluate(()=>{const x=document.querySelector('.journey-shell');return x.scrollWidth>x.clientWidth+3;});
  expect(overflow).toBe(false);
 }
 await page.locator('#modal [data-jclose]').click();
 await page.locator('nav [data-action="levels"]').click();
 await page.locator('#j-resume').click();
 await expect(page.locator('#modal [data-mission]').first()).toBeVisible();
});
test('optional try-it activity never creates progress or locks a starting band',async({page})=>{
 await page.goto('/');
 if(await page.locator('#modal [data-close]').count())await page.locator('#modal [data-close]').first().click();
 await page.locator('nav [data-action="levels"]').click();
 await expect(page.locator('#modal [data-entry]')).toHaveCount(6);
 await page.locator('#pick-help').click();
 await page.locator('#probe-start').click();
 for(let i=0;i<3;i++)await page.locator('#probe-skip').click();
 await expect(page.locator('#modal')).toContainText('not a test');
 await page.locator('#other-suggestion').click();
 await expect(page.locator('#modal [data-band]')).toHaveCount(12);
});
