import { test } from '@playwright/test'


test.beforeEach(async ({ page }) => {
    await page.goto('/')   // replaced with global from config...

})


test.describe('suite1', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()  // this would be executed after every step in suite 1
    })


    test('the first test', async ({ page }) => {

        await page.getByText('Form Layouts').click()
    })


    test('navigate to date picker page', async ({ page }) => {

        await page.getByText('Datepicker').click()
    })

})


