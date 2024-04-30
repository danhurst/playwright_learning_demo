import { Page } from "@playwright/test"; // not sure we actually need this tbh
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase {  // example of using the helper class

   // readonly page: Page  // need this since it uses the page methods -- don't need this if extending.

    constructor(page: Page) {
       super(page)  // need to use the page from the superclass ie. the helper base instance of the page fixture

    }
    async formLayoutsPage() {
      //  await this.page.getByText('Forms').click()
      await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Form Layouts').click()

    }

    async datepickerPage() {
       // await this.page.getByText('Forms').click()
        await this.selectGroupMenuItem('Forms')
      //  await this.page.waitForTimeout(500)
      await this.waitForNumberOfSeconds(1)   // this is now using the helper class method...
        await this.page.getByText('Datepicker').click()

    }

    
    async smarTablePage() {
        //await this.page.getByText('Tables & Data').click()
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()

    }

    
    async toastrPage() {
      //  await this.page.getByText('Modals & Overlays').click()
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()

    }


    async tooltipPage() {
     //  await this.page.getByText('Modals & Overlays').click()
     await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()

    }

    private async selectGroupMenuItem(groupItemTitle: string) {  // pass it a string
     // console.log(groupItemTitle)
       const groupMenuItem = this.page.getByTitle(groupItemTitle)
       const expandedState = await groupMenuItem.getAttribute('aria-expanded')

       if (expandedState == 'false')
        await groupMenuItem.click()

    }



}
