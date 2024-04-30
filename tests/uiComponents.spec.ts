import { test, expect } from '@playwright/test'


test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')   // this would be executed after every step in every suite

})





test.describe('Form Layouts Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()

    })


    test('input fields', async ({ page }) => {
        const useGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" })

        await useGridEmailInput.fill('test@test.com')
        await page.waitForTimeout(2000)
        await useGridEmailInput.clear()
        await useGridEmailInput.pressSequentially('blah@blah.com') // can add , {delay: 500}to slow input...
        // gereric assertion
        const inputValue = await useGridEmailInput.inputValue() // will extract the input
        expect(inputValue).toEqual('blah@blah.com')

        //locator assertion

        await expect(useGridEmailInput).toHaveValue('blah@blah.com')


    })


    test('radio buttons', async ({ page }) => {
        const useGridForm = page.locator('nb-card', { hasText: "Using the Grid" })

        await useGridForm.getByLabel('Option 1').check({ force: true })  // won't work if is 'visually hidden' class - bypass this by adding parameter force=true
        // preferred method...
        await useGridForm.getByRole('radio', { name: 'Option 1' }).check({ force: true })
        const radioStatus = await useGridForm.getByRole('radio', { name: 'Option 1' }).isChecked()

        expect(radioStatus).toBeTruthy()

        await expect(useGridForm.getByRole('radio', { name: 'Option 1' })).toBeChecked()

        await useGridForm.getByRole('radio', { name: 'Option 2' }).check({ force: true })
        await expect(useGridForm.getByRole('radio', { name: 'Option 1' })).toBeFalsy
        await expect(useGridForm.getByRole('radio', { name: 'Option 2' })).toBeChecked()

    })



})

test('checkboxes', async ({ page }) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    await page.getByRole('checkbox', { name: 'Hide on click' }).uncheck({ force: true })  // preferred method by name... can check or uncheck
    await page.getByRole('checkbox', { name: 'Prevent arising of duplicate toast' }).check({ force: true })

    // or can loop through all of htem.

    const allBoxes = page.getByRole('checkbox')

    for (const box of await allBoxes.all()) {

        await box.uncheck({ force: true })
        expect(await box.isChecked()).toBeFalsy()
        await page.waitForTimeout(500)

    }

    for (const box of await allBoxes.all()) {

        await box.check({ force: true })
        expect(await box.isChecked()).toBeTruthy()
        await page.waitForTimeout(500)

    }


})

test('lists and dropdowns', async ({ page }) => {
    const dropDownMenu = page.locator('ngx-header nb-select')
    await dropDownMenu.click()

    page.getByRole('list')  // when the list has a UL tag
    page.getByRole('listitem')  //when the list item has a li tag

    const optionList = page.locator('nb-option-list nb-option')  // use parent child syntax to step down the dom to the dropdown
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]) // check the options 
    await optionList.filter({ hasText: "Cosmic" }).click()  // find and click

    // check that selecting the dropdown has had an effect - changing the background colour
    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    // that was for one selection - can loop through it instead...

    // declare a json array
    const colours = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }

    await dropDownMenu.click()
    for (const colour in colours) {
        await optionList.filter({ hasText: colour }).click()
        await expect(header).toHaveCSS('background-color', colours[colour])
        if (colour != "Corporate") {
            await dropDownMenu.click()
        }
    }
})


test('tooltips', async ({ page }) => {
    // if you can't find the source of the tooltip as the tooltop will dissappear from teh DOM as soon as you click off it, then press f8 in windows to freeze the browser
    // then ctrl shift c to select the element

    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const toolTipCard = page.locator('nb-card', { hasText: "Tooltip Placements" })
    await toolTipCard.getByRole('button', { name: "Top" }).hover() // get the tooltip to open

    //page.getByRole('tooltip')  // if you have ta role called tooltip in your dom

    const tooltip = await page.locator('nb-tooltip').textContent() // get the text....
    expect(tooltip).toEqual('This is a tooltip')

})


test('dialogue boxes', async ({ page }) => {
    // 2 types in the dom and in the browser (the lame ones!)
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    // invoke the browser popup by clicking the trashcan icon....
    //live in a table - id the table, then the table row tr...


    await page.getByRole('table').locator('tr', { hasText: "mdo@gmail.com" }).locator('.nb-trash').click() // so clicking this invokes the arrow function listener above...

    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
    // table, row with that email, class for nb-trash


    // need to create a listener to listen for the dialogue event  since it appears then dissappears. placement of this doesn't appear to matter. 
    // read up about these - I don't quite understand them...
    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })


})

test('web tables', async ({ page }) => {
    // this example clicks on the edit for a particular row and edits the age...
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()


    // get the row by any text in this row....

    const targetRow = page.getByRole('row', {name: "twitter@outlook.com"}) // id the row since email is unique
    await targetRow.locator('.nb-edit').click()
     // once clicked the edit, its now changed the layout , the name is not text any more its a property, so can't re-use the original locator. 
     // so need a different property instead to update the age
     await page.locator('input-editor').getByPlaceholder('Age').clear()
     await page.locator('input-editor').getByPlaceholder('Age').fill('35')
     await page.locator('.nb-checkmark').click()
   
     // 2nd bit - goto 2nd page of table and update email based on ID. 
   await page.locator('.ng2-smart-pagination-nav').getByText('2').click() // click on the 2nd page
   const targetRowById = page.getByRole('row', {name: "11"}).filter({has: page.locator('td').nth(1).getByText('11')}) // this won't work because there are 2 matches for 11 in this table. but this will filter on matches that match in the column we want (the first 1)
   await targetRowById.locator('.nb-edit').click();
   // could just use the filter and filter by 11, like I did on IBT
   
   await page.locator('input-editor').getByPlaceholder('E-mail').clear()
   await page.locator('input-editor').getByPlaceholder('E-mail').fill('barry@yahoo.com')
   
   await page.locator('.nb-checkmark').click()
   await expect(targetRowById.locator('td').nth(5)).toHaveText('barry@yahoo.com')
    
    // test the filter works

    const ages = ["20", "30", "40", "200"]  // 200 will return empty...

    for (let age of ages) {

        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500)
        const ageRows = page.locator('tbody tr')  // get all the rows after hte filter applied

        for (let row of await ageRows.all()) {
            const cellValue = await row.locator('td').last().textContent()  // this is the last column I think
           if (age == "200")
           { expect (await page.getByRole('table').textContent()).toContain('No data found')}
           else
            {expect(cellValue).toEqual(age)}
        }
    }


})

test('datepicker', async({page}) =>{

    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInput = page.getByPlaceholder('Form Picker')
    await calendarInput.click()

    // this is kind of lame - assumes you always want the current month...

    await page.locator('[class="day-cell ng-star-inserted"]').getByText('1', {exact: true}).click()
    await expect(calendarInput).toHaveValue('Apr 1, 2024') // sucks. need to get the actual month...

})

test('datepicker2', async({page}) =>{

    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInput = page.getByPlaceholder('Form Picker')
    await calendarInput.click()

    let date = new Date()
    date.setDate(date.getDate() + 14)  // t+1
    const expectedDate = date.getDate().toString()

    // this is kind of lame - assumes you always want the current month...
    const expectedMonth = date.toLocaleString('En-US', {month: 'short'})
    const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
    const expectedYear = date.getFullYear()
    const expectedDateFormatted = `${expectedMonth} ${expectedDate}, ${expectedYear}`

    let calMonthAndYear = await page.locator('nb-calendar-view-mode').textContent() // gets the cal month/year
    // format is (' mon yyyy ')

    const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `

    while(!calMonthAndYear.includes(expectedMonthAndYear)) // test
        {
            // click on the chevron to move the month along +1 until it matches the correct month year combo
            await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()  // move the month along - need to work on these locators - struggling with this syntax!
            calMonthAndYear = await page.locator('nb-calendar-view-mode').textContent() // set the value again
    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()
    await expect(calendarInput).toHaveValue(expectedDateFormatted) // can handle different dates...

})


test('sliders', async({page}) =>{

   // await page.getByText('IoT Dashboard').click()
    

    // 2 methods - 1st one, update the attribute  cx and cy = x and y coordinates. 

const  tempGuage = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')

await tempGuage.evaluate(node => {node.setAttribute('cx', '232.60'),  node.setAttribute('cy', '232.60') }) // this sets the value but doesn't update the page - need to trigger an event for the UI to update
await tempGuage.click()  // trigger an event...

})

test('sliders mouse', async({page}) =>{
// 2nd method simulate the actual mouse movement in the guage
//    await page.getByText('IoT Dashboard').click()
    

// define an area to work in
const  tempBox= page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
// make sure the area is in view

await tempBox.scrollIntoViewIfNeeded() // nice 

const box = await tempBox.boundingBox() // this method creates x, y coords from the top left of the location of the element (0, 0)

const x = box.x + box.width / 2 // middle
const y = box.x + box.height / 2  // middle
console.log(x, y)

await page.mouse.move(x, y)
await page.mouse.down()
await page.mouse.move(x+100, y) // move horizontal
await page.mouse.move(x+100, y+100)
await page.mouse.up()
await expect(tempBox).toContainText('27')

})


