
/*
PRIME-14197 - Attribute Promotion - Screen Controls Default Test

Jira Story
ALM Subject
ALM Test Id
ALM Test Name
: PRIME-14947
:Subject\Projects\Prime Capability Team 1^
:PRIME-14969 UI - Menu Item on IBT Main Menu

Design Steps

PRIME-14982 UI - Create Attribute Search
PRIME-19541 UI - Create Selected Attributes Grid
PRIME-19553 UI - Confirm and Promote Attribute section
PRIME-22933 UI - Fix alignment of promotion confirmation

1. Create some attributes and values via SQL
2. Search filter for those attributes, check selected grid works
3. Add attributes to selected grid, check works
4. Check other controls
5. Delete attributes via DB call.
*/

import config from "config";
import Home_Page from "../../../pages/home-page.js";
import Attribute_PromotionPage from "../pages/attribute-promotion-page.js"; 
import { DriverBuilder } from "@FTSEautomation/selenium-driver";
import LoadAttributeValuesPage from "../pages/load-attribute-values-page.js";

var expect = require("chai").expect;
const addContext = require('mochawesome/addContext');
const testHelper = require('../../../test helper/test helper.js');
const locators = require('../../../pages/attribute-promotion-page.js');

/** @type { DriverBuilder } */ let driverBuilder = null;
/** @type { Attribute Promotion Page} */ let page = null;
/** @type { LoadAttributeValues Page } */ let attributes = null;

let home = null;
let search_grid = null;
let selected_grid = null; selected_grid
let dbConnection = null;
let randomString = testHelper.generateRandomString(5);

let attrData = {
    "is_group": 0,
    "attr_name": "AUTO TEST " + randomString,
    "attr_desc": "promotion automation test attr", "parent attr_id": null,
    "attr_level": "Security",
    "attr_data_type": "Text"
}

let attrData2 = {

    "is group": 0,
    "attr_name": "AUTO TEST2" + randomString,
    "attr_desc": "promotion automation test attr2", "parent attr id": null,
    "attr_level": "Instrument",
    "attr data type": "Text"
}


let attrData3 = {
    "is group": 0,
    "attr_name": "AUTO TEST3 " + randomString,
    "attr_desc": "promotion automation test attr2",
    "parent_attr_id": null, // set this once we know what ID attr2 is
    "attr_level": "Instrument",
    "attr_data_type": "Text"

}

let valueData = [

    { "attributeValue": "ATTR PROM AUTO TEST VALI1", "effectiveDate": "2002-01-12", "expirationDate": "9999-12-31" }, { "attributeValue": "'ATTR PROM AUTO TEST VAL2", "effectiveDate": "2022-01-10", "expirationDate": "2022-12-23" },
]

let valueData2 = [

    { "attributeValue": "ATTR PROM AUTO TEST VAL3'", "effectiveDate": "2002-01-12", "expirationDate": "9999-12-31" }, { "attributeValue": "ATTR PROM AUTO TEST VAL4'", "effectiveDate": "2022-01-10", "expirationDate": "2022-12-23" },
]
let valueData3 = [

    { "attributeValue": "ATTR PROM AUTO TEST VALS'", "effectiveDate": "2002-01-12", "expirationDate": "9999-12-31" }, { "attributeValue": "ATTR PROM AUTO TEST VAL6", "effective Date": "2022-01-10", "expirationDate": "2022-12-23" },
]

describe('IBUI - PRIME 14947-1 - Attribute Promotion test Screen Controls $35097-108 @attribute @attribute Promotion', function () {
    this.timeout(config.get('mochaTimeoutMS'));

    // hooks

    before(async function () {
        driverBuilder = new DriverBuilder(); await driverBuilder.initialize();
    });



    afterEach(async function () {

        if (this.currentTest.state = 'failed') {
            addContext(this, await driverBuilder.takeScreenshot(config.get('mochawesome ReporterOptions.reportDir')));
        }
    });



    after(async function () {

        await driverBuilder.deleteAllCookies()
        await driverBuilder.close(); await driverBuilder.quit();

    });



    step('Given I have opened the IBT Application' + testHelper.getEnvUrl(), async function () {

        home = new HomePage(driverBuilder, true);
        await driverBuilder.driver.sleep(1000);
        let version = await home.getVersion();

        addContext(this, {
            title: `IBT Version`,
            value: version
        });


    });
    step(`Given I have created some attributes, nested attributes and values`, async function () {

        attributes = new LoadAttributeValuesPage(driverBuilder, false);
        dbConnection = await attributes.DBConnect();

        let attributeId = await attributes.createAttributeDB(this, attrData, dbConnection);

        await attributes.createAttributeValuesDB(this, attributeId, attrData.attr_data_type, valueData, dbConnection); attributeId = await attributes.createAttributeDB(this, attrData2, dbConnection);

        await attributes.createAttributeValuesDB(this, attributeId, attrData2.attr_data_type, valueData2, dbConnection);

        attrData3.parent_attrid = attributeId;

        attributeId = await attributes.createAttributeDB(this, attrData3, dbConnection);

        //

        await attributes.createAttributeValuesDB(this, attributeId, attrData3.attr_data_type, valueData3, dbConnection); await attributes.uploadAttributeValuesDB(this, consCode, attrData.attr_name, valueData, dbConnection);

    });

    step(`and I open the promote attributes page via the 'attribute promotion menu item`, async function () {

        page = new AttributePromotionPage(driverBuilder.false);

        // probably a menu item click going on here...missing the code!
    });

    step(`And the promote button is horizontally aligned with the source/destination controls. $35130 `, async function () {

        let btn_alignment = await driverBuilder.driver.findElement(locators.promote_attributes_button).getRect();
        let dest_alignment = await driverBuilder.driver.findElement(locators.select_target_env_dropdown).getRect();

        expect(btn_alignment.y).to.equal(dest_alignment.y);

        addContext(this, {
            title: 'Promote Button v Destination Server DropDown Y Cordinates:',
            value: btn_alignment.y + ' ' + dest_alignment.y
        });

    });

    step(`And the selected row checkbox is disabled`, async function () {
        await page.checkSelectedRowIsDisabled(attrData2.attr_name);
        await page.checkSelectedRowIsDisabled(attrData.attr_name);
    });

  

    step(`Given I have reset the search filter on the search grid then the selected rows should still be disabled`, async function () {



        await driverBuilder.driver.findElement(locators.attribute_grid_attribute_filter).clear();

        await driverBuilder.sendKeys(locators.attribute_grid_attribute_filter, randomString);

        await driverBuilder.driver.sleep(1000);

        await page.checkSelectedRowIsDisabled(attrData2.attr_name);

        await page.checkSelectedRowIsDisabled(attrData.attr_name);
    });
    step(`Given I have attributes in the selected attributes grid When I click the trash icon then the attribute is removed from the selected grid`, async function () {

        await page.removeSelectedAttribute(attrData.attr_name, selected_grid);
        await page.removeSelectedAttribute(attrData2.attr_name);

    });


    // fill in the gaps....

    step(`Then the 'select attributes button should become enabled'`, async function () {

        await driverBuilder.validate(locators.add_selected_attributes_button, 'aria-disabled', null);
    });



    step(`And the selected row checkbox is checked`, async function () {
        search_grid = await page.getSearchResultsGrid(randomString);

        let status = await page.getAttributeCheckedStatus(attrData2.attr_name, search_grid);
        expect(status, `attribute $(attrData2.attr_name) not selected in search grid`).to.be.true

        status = await page.getAttributeCheckedStatus(attrData.attr_name, search_grid);

        expect(status, `attribute(attrData.attr_name) not selected in search grid`).to.be.true
    

        });


    step(`Given I have checked a row in the search grid, when I press the selected attributes button`, async function () {
    
 
    await driverBuilder.click (locators. add_selected_attributes_button);

});
    
    step (`Then the selected index should appear in the selected attributes grid below the search grid`, async function () {
    
            selected_grid = await page.getSelectedResultsGrid(); selected_grid

            await page.checkRowIsSelected(attrData2.attr_name, selected_grid);
            await page.checkRowIsSelected(attrData.attr_name, selected_grid);

        });

        step(`And the selected attributes grid should be visible with columns 'Code', 'Description', 'Attribute Level', Data Type $35103`, async function () {

            await page.validateGridHeaders(locators.selected_grid_headers, ['', 'Code', 'Description', 'Attribute Level', 'Data Type']);

        });

    step(`And there should be a selected attributes summary cound which should display the total rows selected $35104`, async function () {

        await driverBuilder.validate(locators.summary_selected_label, 'innerText', 'Total: 3 Attributes');


        // more to go in here
        _
    });



    step(`And the attributes should become selectable in the search arid results again`, async function () {

        search_grid = await page.getSearchResultsGrid('AUTO_TEST');

        let res = await page.getAttributeCheckedStatus(attrData2.attr_name, search_grid);

        expect(res, `attribute $(attrData2.attr_name) selected in search grid`).to.be.false
        res = await page.getAttributeCheckedStatus(attrData, attr_name, search_grid);

        expect(res, `attribute ${attrData.attr_name} selected in search grid`).to.be.false

    });


    step(`Post Test Step - clear down the attributes from the DB`, async function () {

        await attributes.deleteAttributeValuesDB(this, attrData3.attr_level, attrData3.attr_data_type, attrDataß.attr_name, dbConnection)
        await attributes.deleteAttributeValuesDB(this, attrData2.attr_level, attrData2.attr_data_type, attrData2.attr_name, dbConnection)
        await attributes.deleteAttributeValuesDB(this, attrData.attr_level, attrData.attr_data_type, attrData.attr_name, dbConnection)
        await attributes.DBDisconnect(dbConnection);

    })

})



