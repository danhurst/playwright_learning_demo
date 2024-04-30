// This class gives you the ability to invoke the page objects from one call rather than repeatedly invoking them from each test. 


import { Page } from "@playwright/test";
import { NavigationPage } from '../page-objects/navigationPage'
import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
import { DatePickerPage } from '../page-objects/datepickerPage'

export class PageManager {

    private readonly page: Page  // need this since it uses the page methods
    private readonly navigationPage: NavigationPage
    private readonly formLayoutsPage: FormLayoutsPage
    private readonly datepickerPage: DatePickerPage


    constructor(page: Page) {
        this.page = page
        this.navigationPage = new NavigationPage(this.page) // create new instances of all the page objects
        this.formLayoutsPage = new FormLayoutsPage(this.page)
        this.datepickerPage = new DatePickerPage(this.page)
    }

    navigateTo() {
        return this.navigationPage // returns the instance of the page object for the calling test to use...
    }

    onFormLayoutsPage() {
        return this.formLayoutsPage
    }

    onDatePickerPage() {
        return this.datepickerPage
    }

}