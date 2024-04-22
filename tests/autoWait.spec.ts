import { test, expect } from '@playwright/test'


test.beforeEach(async ({ page }, testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax')   // this would be executed after every step in every suite
    await page.getByText('Button Triggering AJAX Request').click()  // 
     testInfo.setTimeout(testInfo.timeout + 2000) // global override for all tests.
  
})



test('AutoWait', async ({ page }) => {

const successButton = page.locator('.bg-success') // the class

//await successButton.click();

//const text = await successButton.textContent()

//await successButton.waitFor({state: "attached"}) // adds a wait...
//const text = await successButton.allTextContents() // doesn't wait for the payload to turn up...can add a new wait above...

//expect(text).toContain('Data loaded with AJAX get request.')

await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})  // increased default timeout to 20s from 5s...

})

test('AlternativeWaits', async ({ page }) => {


    const successButton = page.locator('.bg-success') // the class
    // wait for element...
   // await page.waitForSelector('.bg-success')

    // wait for particular response

   // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')  // wait for a network response to complete...

    // wait for network calls to be completed ('not recommended!)

   // await page.waitForLoadState('networkidle')  // wait for a network response to complete...

   await page.waitForTimeout(5000) // hard coded -not great. there are various other 'waitFor....' type fuctions. 

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
    
    })


    test('timeouts', async ({ page }) => {
test.setTimeout(10000)  // overrides the command timeout so will fail...
test.slow()  // this will increase the default timoeut x3. // so will pass again...
        const successButton = page.locator('.bg-success')
        await successButton.click({timeout: 16000});  //override actionTimeout defined in config...
        
        })