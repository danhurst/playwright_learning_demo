import { test, expect } from '@playwright/test'


test.beforeEach(async ({ page }) => {
    await page.goto('/')   // this would be executed after every step in every suite
    await page.getByText('Forms').click()  // 
    await page.getByText('Form Layouts').click()
})





test('Locator syntax rules', async ({ page }) => {


    //by tag name
    await page.locator('input').first().click()


    // by id pre-pend with #
    await page.locator('#inputEmail1').click()

    // by class pre-pend with .
    await page.locator('.shape-rectangle').first().click()

    // by attribute pre-pend with []
    await page.locator('[placeholder=Email]').first().click()

    // by class (full value) put in []

    await page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]').first().click()

    // combine diff selectors just put them all in one go...

    await page.locator('input[placeholder="Email"][nbinput]').first().click()

    // by Xpath

   // await page.locator('//*[@id=inputEmail1]').click()  // NOT RECOMMENDED - flaky...

    // by partial text match

   // await page.locator(':text("Using"').click()

    // exact text match

   // await page.locator(':text-is("Using the Grid"').click()




})

test('User Facing Locators', async ({ page }) => {

    await page.getByRole('textbox', { name: "Email" }).first().click()
    await page.getByRole('button', { name: "Sign in" }).first().click()

    await page.getByLabel('Email').first().click()
    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    await page.getByTestId('SignIn').click()   // not a user facing locator self defined...basicaally add it into the source code and rebuild it. 

    //  await page.getByTitle('Iot dashboard').click()
})

test('Locating Child Elements', async ({ page }) => {
    // find option 1...

    await page.locator('nb-card nb-radio :text-is("Option 1")').click()  // parent child text is... all in one go..seperated by space
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()  // same but chained.

    //await page.locator('nb-card').getByRole('button', { name: "Sign-in" }).first().click()   //  can mix and match //try not ot use first really...

    await page.locator('nb-card').nth(3).getByRole('button').click()  // find by index - not preferred method
})


test('Locating Parent Elements', async ({ page }) => {

    await page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" }).click()

    await page.locator('nb-card', { has: page.locator('#inputEmail1') }).getByRole('textbox', { name: "Email" }).click()

    await page.locator('nb-card').filter({ hasText: "Basic Form" }).getByRole('textbox', { name: "Email" }).click()   // use a locator as a filter

    await page.locator('nb-card').filter({ has: page.locator('.status-danger') }).getByRole('textbox', { name: "Password" }).click()

    await page.locator('nb-card')
        .filter({ has: page.locator('nb-checkbox') })
        .filter({ hasText: "Sign in" })
        .getByRole('textbox', { name: "Email" }).click()  // can layout like this!

    // last one - not recommended

    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', { name: "Email" }).click()  // xpath to next level up...

})


test('Reusing the locators', async ({ page }) => {

    const basicForm = page.locator('nb-card').filter({ hasText: "Basic Form" }) // just a straight replace with a constant
    const emailFiled = basicForm.getByRole('textbox', { name: "Email" })// can chain them as well

    await emailFiled.fill('test@test.com')
    await basicForm.getByRole('textbox', { name: "Password" }).fill('hello123')
    await basicForm.getByRole('button').click()

    await expect(emailFiled).toHaveValue('test@test.com')  // an assertion...

})


test('extracting values', async ({ page }) => {
// single values
    const basicForm = page.locator('nb-card').filter({ hasText: "Basic Form" }) // just a straight replace with a constant
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')
// all text values
//e.g. the radio buttons

   const allRadioButtonLabels = await page.locator('nb-radio').allTextContents()
   expect(allRadioButtonLabels).toContain("Option 1")

   //find value of input value - input values aren't actually displayed in the DOM. 

   const emailField = basicForm.getByRole('textbox', {name: 'Email'})
   await emailField.fill('test@test.com')
   const val = await emailField.inputValue();
    expect(val).toEqual('test@test.com')

    // get the value of an attribute. 

    const placeholderValue = await emailField.getAttribute('placeholder') //easy!
    expect(placeholderValue).toEqual('Email')

    
})


test('assertion types', async ({ page }) => {

     const basicFormButton = page.locator('nb-card').filter({ hasText: "Basic Form" }).locator('button') // just a straight replace with a constant
    // general assertions

    const value = 5
    expect(value).toEqual(5)  // asserts straight awaay

    
    const text = await basicFormButton.textContent()
    expect(text).toEqual('Submit')

    // locator assertion - pass a locator in- get a list of 'locator assertions, which are different...
    expect(basicFormButton).toHaveText('Submit')  // will wait up to 5 seconds by default

    // soft assertion - can continue after fail

    await expect.soft(basicFormButton).toHaveText('Submit')  // will fail
    await basicFormButton.click() // but since a soft assertion will still execute
})

