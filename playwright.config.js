import {defineConfig} from '@playwright/test';
export default defineConfig({
 testDir:'./tests',testMatch:'**/*.browser.spec.js',
 timeout:70000,expect:{timeout:8000},retries:0,
 use:{baseURL:'http://127.0.0.1:4173',trace:'retain-on-failure'},
 reporter:[['list'],['html',{open:'never'}]],
 projects:[
  {name:'desktop',use:{browserName:'chromium',viewport:{width:1280,height:800}}},
  {name:'narrow-iphone-emulation',use:{browserName:'chromium',viewport:{width:375,height:812},isMobile:true,hasTouch:true,deviceScaleFactor:3}},
  {name:'landscape-phone-emulation',use:{browserName:'chromium',viewport:{width:812,height:375},isMobile:true,hasTouch:true,deviceScaleFactor:2}}
 ],
 webServer:{command:'python3 -m http.server 4173 --directory dist',url:'http://127.0.0.1:4173/',reuseExistingServer:!process.env.CI,timeout:30000}
});
