import { test, expect } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
//import { NavigationPage } from '../page-objects/navigationPage'
//import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
//import { on } from 'events'
//import { DatePickerPage } from '../page-objects/datepickerPage'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')   // this would be executed after every step in every suite

})

test('navigate to form page', async({page}) => {

const pm = new PageManager(page)    
//const navigateTo = new NavigationPage(page)
//await pm.navigateTo().formLayoutsPage()
await pm.navigateTo().datepickerPage()
await pm.navigateTo().smarTablePage()
await pm.navigateTo().toastrPage()
await pm.navigateTo().tooltipPage()


})


test('parameterised methods', async({page}) => {
const pm = new PageManager(page)  

await pm.navigateTo().formLayoutsPage()  // failing on first step - something is wrong with this setup...
await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredAndSelectOption('test@test.com', 'Hello World', 'Option 1')
await pm.onFormLayoutsPage().submitInlineForm('Barry Bushnell', 'Barry@test.com', true)
await pm.navigateTo().datepickerPage()
await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(6)
await pm.onDatePickerPage().selectCommonDatePickerWithRangeFromToday(7, 10)

})






