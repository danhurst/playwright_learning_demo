
import { test, expect } from '@playwright/test'

test('input fields', async ({ page }, testInfo) => {

    await page.goto('/')  // whatever the default is defined to...
    if (testInfo.project.name == 'mobile') {  // so can execute conditional steps for different projects etc, i.e. mobile browsers etc. 
        await page.locator('.sidebar-toggle').click()
    }// this is for lesson 72 using iphone13 as defined in tsconfig project...
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    if (testInfo.project.name == 'mobile') {
        await page.locator('.sidebar-toggle').click()
    }
    const useGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" })
    await useGridEmailInput.fill('test@test.com')
    // await page.waitForTimeout(2000)
    await useGridEmailInput.clear()
    await useGridEmailInput.pressSequentially('blah@blah.com') // can add , {delay: 500}to slow input...
    // gereric assertion




})