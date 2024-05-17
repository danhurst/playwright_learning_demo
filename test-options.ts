import { test as gimlet } from '@playwright/test'
import { PageManager } from './page-objects/pageManager'

export type TestOptions = {
    globalsQAURL: string
    formLayoutsPage: string
    pageManager: PageManager
}

/*export const test = gimlet.extend<TestOptions>({
    globalsQAURL: ['', { option: true }],

    formLayoutsPage: async ({ page }, use) => {

        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        await use('') // what does this actually do? 

    }

    // can call the import anything you like! This is a fixture
})*/

export const test = gimlet.extend<TestOptions>({
    globalsQAURL: ['', { option: true }],

    formLayoutsPage: /*[*/async ({ page }, use) => {  // this version is in an array and also has option to tell it to run automatically, thus it will run on import, doesn't need to be called explicitly...

        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        await use('') // what does this actually do? await this to be used - then do something...
        // anything running after this part is part of the tear down = after use()...
        console.log('we are tearing down')

    }, //{ auto: true }],    // you can comment out the auto bit and have it run as a dependency of pageManager instead see below

    //pageManager: async({page}, use) => {  // this just runs on its own
        pageManager: async({page, formLayoutsPage}, use) => { // this version callthe the formsLayoutsPage first
        const pm = new PageManager(page)
        await use(pm)
    }

})

