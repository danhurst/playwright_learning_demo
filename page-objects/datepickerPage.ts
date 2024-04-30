import { Page, expect } from "@playwright/test";

export class DatePickerPage {

    readonly page: Page  // need this since it uses the page methods

    constructor(page: Page) {
        this.page = page
        // playwright recommends the locators are 
    }


    async selectCommonDatePickerDateFromToday(nodays: number){

        await this.page.getByText('Forms').click()
        await this.page.waitForTimeout(200)
        //await this.page.getByText('Common Datepicker').click()
    
        const calendarInput = this.page.getByPlaceholder('Form Picker')
        await calendarInput.click()
    
        const expectedDateFormatted = await this.selectDateInCalendar(nodays)

        

        await expect(calendarInput).toHaveValue(expectedDateFormatted) // can handle different dates...


    }


    async selectCommonDatePickerWithRangeFromToday(startDate: number, endDate: number){

        await this.page.getByText('Forms').click()
        await this.page.waitForTimeout(200)
        //await this.page.getByText('Common Datepicker').click()
    
        const calendarInput = this.page.getByPlaceholder('Range Picker')
        await calendarInput.click()
    
        const expectedDate = await this.selectDateInCalendar(startDate)
        const expectedEndDate = await this.selectDateInCalendar(endDate)
        const dateToAssert = `${expectedDate} - ${expectedEndDate}`
        await expect(calendarInput).toHaveValue(dateToAssert) // 
    


    }

    private async selectDateInCalendar(nodays){

        let date = new Date()
        date.setDate(date.getDate() + nodays)  // t+1
        const expectedDate = date.getDate().toString()
    
        // this is kind of lame - assumes you always want the current month...
        const expectedMonth = date.toLocaleString('En-US', {month: 'short'})
        const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
        const expectedYear = date.getFullYear()
        const expectedDateFormatted = `${expectedMonth} ${expectedDate}, ${expectedYear}`

    
        let calMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent() // gets the cal month/year
        // format is (' mon yyyy ')
    
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `
    
        while(!calMonthAndYear.includes(expectedMonthAndYear)) // test
            {
                // click on the chevron to move the month along +1 until it matches the correct month year combo
                await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()  // move the month along - need to work on these locators - struggling with this syntax!
                calMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent() // set the value again
        }
    
        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).click()

        return expectedDateFormatted



    }

}