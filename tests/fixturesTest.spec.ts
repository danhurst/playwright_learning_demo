import { test } from '../test-options'  // now importing the fixture from test options instead of from playwright-test.
//import { PageManager } from '../page-objects/pageManager'
import { faker } from '@faker-js/faker'    // install with npm install i @faker-js/faker --save-dev --force // this adds it straight to dev-dependencies in the config. 


//test.beforeEach(async ({ page }) => {
  //  await page.goto('/')   // this would be executed after every step in every suite

//})  // run from the fixture...




//test('parameterised methods', async({page, formLayoutsPage}) => { // this version calls the formLayoutsfixture explicitly, but you can tell the fixture to run automatically on import, so it runs immediately
/*test('parameterised methods', async({page}) => {  // this version uses the commented in fixture that self runs by putting it in an arrary (see test-options)
const pm = new PageManager(page)  
const randomFullName   = faker.person.fullName()
const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(10000)}@test.com`

//await pm.navigateTo().formLayoutsPage()  // run from the fixture...no longer need this..

await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 1')
await pm.onFormLayoutsPage().submitInlineForm(randomFullName, randomEmail, true)

})*/


test('parameterised methods', async({pageManager}) => {  // this version also has the new pageManager fixture so can further comment out lines
   // const pm = new PageManager(page)  // no longer need this since its moved to the fixture
    const randomFullName   = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(10000)}@test.com`
    
    //await pm.navigateTo().formLayoutsPage()  // run from the fixture...no longer need this..
    
    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 1')
    await pageManager.onFormLayoutsPage().submitInlineForm(randomFullName, randomEmail, true)
    
    })






