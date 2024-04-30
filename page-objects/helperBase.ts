import { Page } from "@playwright/test";

export class HelperBase {

    readonly page: Page  // need this since it uses the page methods

    constructor(page: Page) {
        this.page = page
        // playwright recommends the locators are 
    }

    //can put common functions in here and then extend this class in the other pages to get its methods, so end up with common 'helper' methods

    async waitForNumberOfSeconds(timeInSeconds: number){
        await this.page.waitForTimeout(timeInSeconds * 1000)
    }


}