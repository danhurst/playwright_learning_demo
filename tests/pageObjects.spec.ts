import { test, expect } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import { faker } from '@faker-js/faker'    // install with npm install i @faker-js/faker --save-dev --force // this adds it straight to dev-dependencies in the config. 
import { argosScreenshot } from "@argos-ci/playwright";

test.beforeEach(async ({ page }) => {
    await page.goto('/')   // this would be executed after every step in every suite

})

test('navigate to form page @smoke', async({page}) => {  // same as mocha, probably is the same...for tags

const pm = new PageManager(page)    
//const navigateTo = new NavigationPage(page)
await pm.navigateTo().formLayoutsPage()
await pm.navigateTo().datepickerPage()
await pm.navigateTo().smarTablePage()
await pm.navigateTo().toastrPage()
await pm.navigateTo().tooltipPage()


})


test('parameterised methods', async({page}) => {
const pm = new PageManager(page)  
const randomFullName   = faker.person.fullName()
const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(10000)}@test.com`

await pm.navigateTo().formLayoutsPage()  // failing on first step - something is wrong with this setup...
await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 1')
await pm.onFormLayoutsPage().submitInlineForm(randomFullName, randomEmail, true)
await page.locator('nb-card', {hasText: "Inline form"}).screenshot({path:  'screenshots/inlineform.png'})
//await pm.navigateTo().datepickerPage()
//await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(6)
//await pm.onDatePickerPage().selectCommonDatePickerWithRangeFromToday(7, 10)

})

test.only('testing with argos ci', async({page}) => {
const pm = new PageManager(page)    
//const navigateTo = new NavigationPage(page)
await pm.navigateTo().formLayoutsPage()
await argosScreenshot(page, "formLayoutsPage")
await pm.navigateTo().datepickerPage()
await argosScreenshot(page, "datepickerPage")


})






