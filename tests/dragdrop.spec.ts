import {expect} from '@playwright/test'
import {test} from '../test-options' // since this extends test and has 'globalsQARUL env variable defined in it'

test('drag and drop', async({page, globalsQAURL}) =>{

    await page.goto(globalsQAURL)
    const consent = page.locator('.fc-cta-consent') // in uk there is a consent form that needs closing first...
    await consent.click();
   
    //what is iframe? its an embedded html document inside a page - not easily accessible 
   
    const myFrame = page.frameLocator('[rel-title="Photo Manager"] iframe') // need to switch to the iframe, then continue as usual. 
    //1st method use dragTo method
   
   await myFrame.locator('li', {hasText:"High Tatras 2"}).dragTo(myFrame.locator('#trash'))
   
   // mouse control
   
   await myFrame.locator('li', {hasText:"High Tatras 4"}).hover()
   await page.mouse.down()
   await myFrame.locator('#trash').hover()
   await page.mouse.up()
   
   await expect(myFrame.locator('#trash li h5')).toHaveText(["High Tatras 2","High Tatras 4"])
   
   
    })