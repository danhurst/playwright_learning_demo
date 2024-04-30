import { Page } from "@playwright/test";

export class FormLayoutsPage {

    readonly page: Page  // need this since it uses the page methods

    constructor(page: Page) {
        this.page = page
        // playwright recommends the locators are 
    }


    async submitUsingTheGridFormWithCredAndSelectOption(email: string, password: string, optionText: string){

        const useGridForm = this.page.locator('nb-card', { hasText: "Using the Grid" })
        await useGridForm.getByRole('textbox', {name: "Email"}).fill(email)
        await useGridForm.getByRole('textbox', {name: "Password"}).fill(password)
        await useGridForm.getByRole('radio', {name: optionText}).check({force: true})
        await useGridForm.getByRole('button').click()



    }


/**
 * This method fills out the inline form - looks liek if you use TS it can do this automatically. 
 * @param name - should be first and last name
 * @param email - valid email address
 * @param rememberMe -true or false
 */

    async submitInlineForm(name: string, email: string, rememberMe: boolean){

        const inLineForm = this.page.locator('nb-card', { hasText: "Inline Form" })
        await inLineForm.getByRole('textbox', {name: "Jane Doe"}).fill(name)
        await inLineForm.getByRole('textbox', {name: "Email"}).fill(email)
        if(rememberMe)
        await inLineForm.getByRole('checkbox').check({force: true})
        await inLineForm.getByRole('button').click()



    }





}