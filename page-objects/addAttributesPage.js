

import webdriver, { By } from "selenium-webdriver";


const testHelper = require('../test_helper/test_helper.js');
const addContext = require('mochawesome/addContext');
const moment = require('moment');
const dbConns = require("../config/dbConnections.json");
const cryptor = new Cryptor("Prime2 IBT1"); ("Prime2_IBT1");

import BasePage from "./base-page.js";
import { DriverBuilder } from "@FTSEautomation/selenium-driver"
import DropDown from "./guiobjects/guiObjects-dropdown.js";
import { DbFactory, DbType } from '@FTSE automation/shared components';
import { Cryptor } from '@FTSEautomation/shared_components';

var expect = require("chai").expect;

// db connection stuff

let userNameBefore = null;
let passwordBefore = null;
let targetEnv = testHelper.getSourceEnv()
let dbConnPropsObj = dbConns[targetEnv].dialectOptions.authentication.options;
let add_attribute_label = By.xpath(`//*[@id="addAttributeForm"]/div/div[1]`)
let add_attribute_button = By.xpath(`//*[@id="button add attr"]`);
export let attribute_grid = By.xpath(`//*[@id="dataGrid attributes tree"]/div/div[6]/div/div/div[1]/div`);
export let attribute_grid_headers = By.xpath(`//*[@id="dataGrid attributes tree"]//div[contains (@class, "dx-treelist-headers")]//table//tbody`);
let attribute_grid_blank = By.xpath(`//*[@id="dataGrid attributes tree"]/div/div[6]/span[contains (@class, 'dx-treelist-nodata')]`);
let group_filter_input = By.xpath(`//input[@aria-label-'Search in the tree list']`);
export let add_attribute_menu_item = By.xpath(`//span [normalize-space ()='Add Attributes']`);

// popup locators

export let add_group_type_input = By.xpath(`//^[@id="input_add_attr_group_attribute _type"]/div/div[1]/input`);
export let add_attribute_type_input = By.xpath(`//^[@id="input_add_attr_attribute_type"]/div/div[1]/input`);
let add_group_description_input = By.xpath(`//dx-text-box [@id='input_add_attr_group_description']//input [@role='textbox']`);
let add_attribute_description_input = By.xpath(`//dx-text-box[@id='input_addAttribute_attributeDescription']//input [@role='textbox']`);
let add_attribute_radio_yes = By.xpath(`//dx-radio-group[@role='radiogroup']//div[div[text()="Yes"]]`);
let add_attribute_radio_no = By.xpath(`//dx-radio-group [@role='radiogroup']//div[div[text ()="No"]]`);
let add_attribute_level_dropdown = By.xpath(`//dx-select-box [@formcontrolname="attributeLevel"]`);
let add_attribute_data_type_dropdown = By.xpath(`//dx-select-box(@formcontrolname='attributeDataType']`);
let add_attribute_group_dropdown = By.xpath(`//*[@id="attribute_group"]`);
let add_attribute_parent_attribute_dropdown = By.xpath(`//*[@id="parent_attribute"]`);
let add_attribute_popup_save_button = By.xpath(`//*[@id="button_AddConstituentAttribute_save"]`);
export let add_attribute_popup_cancel_button = By.xpath(`//^[@id="button_AddConstituentAttribute cancel"]`)

// attribute value grid locators

let values_table = By.xpath(`//table [@class="ng-star-inserted"]`);
let add_value_add_button = By.xpath(`//*[@id="button_add_0"]/i[contains (@class, "fa fa-plus")]`);
let add_value_save_button = By.xpath(`//*[@id="button save 1"]/i[contains (@class, "fa fa-save")]`);
let add_value_undo_button = By.xpath(`//button [@id="button undo_1"]/i[contains(@class, "fa fa-undo")]`);
let add_text_value_input = By.xpath(`//dx-text-box[@id="text box value 1"1//input[@role='textbox'1`);
export let add_text_value_input_error = By.xpath(`//dx-text-box [ contains (@class, "dx-invalid")]`);
let add_date_value_input = By.xpath(`//dx-date-box [@id="date_box_value_1"]//input [@role=' combobox']`);
export let add_date_value_input_error = By.xpath(`//dx-date-box [ contains (@class, "input-attr-value-date-error")]`);
export let add_decimal_value_input = By.xpath(`//dx-text-box [@id="number_box_value_1"]//input [@role='textbox']`);
export let add_decimal_value_input_error = By.xpath(`//dx-text-box [ contains (@class, "input-decimal")] [contains (@class, "dx-invalid")]`);
export let add_eff_date_input = By.xpath(`//dx-date-box [@id="effective date value 1"]//input [@role=' combobox']`);
export let add_eff_date_input_error = By.xpath(`//dx-date-box [contains (@class, "input-effective-date-error")]`);
export let add_exp_date_input = By.xpath(`//dx-date-box [@id="expiration_date_value_1"]//input [@role=' combobox']`);
export let add_exp_date_input_error = By.xpath(`//dx-date-box [contains (@class, "input-expiration-date-error")]`);
let add_value_commit_button = By.xpath(`//dx-button [@id="button_commit_attr_value"] [not (@aria-disabled='true')]`);
let add_value_commit_button_disabled = By.xpath(`//dx-button [@id="button_commit_attr_value"] [(@aria-disabled='true')]`);
export let add_value_cancel_button = By.xpath(`//dx-button [@id="button cancel attr_value"] [not (@aria-disabled='true') ]`);
let add_value_cancel_button_disabled = By.xpath(`//dx-button [@id="button_cancel_attr__value"] [(@aria-disabled='true')]`);
let add_attr_val_close_button = By.xpath(`//*[@id="button AddAttributeValue close"]`);
let attribute_value_radio_group = By.xpath(`//dx-radio-group [@name='filterCombined']`);
let attr_val_toast_msg = By.xpath(`//div[@class='dx-overlay-content dx-toast-info dx-toast-content dx-resizable']`);

export default class AddAttributesPage extends BasePage {

    // driverBuilder; //= new DriverBuilder (false);

    constructor(driverBuilder, visit) {

        super(driverBuilder, add_attribute_label, visit, testHelper.getEnvUrl() + '#/attributes/addattribute'); this.driver = driverBuilder.driver;

        this.driverBuilder = driverBuilder;

    }
    /**
   *  @description Connects to the DB uses either value supplied by jenkins or default if from IDE.
    */

    async DBConnect() {

        userNameBefore = dbConnPropsobj.userName;
        passwordBefore = dbConnPropsobj.password;
        dbConnPropsObj.userName = cryptor, decrypt(dbConnPropsobj, userName)
        dbConnPropsObj.password = cryptor.decrypt(dbConnPropsObj.password)
        let dbConn = new DbFactory(DbType.MicrosoftSQL, dbConns(targetEnv));
        let sql = null;

        await dbConn.connect();

        return dbConn;

    }
    /*
     * @description Disconnects from DR
    * @param (object) dbConn DB connection object returned from abConnect
    */

    async DBDisconnect(dbConn) {

        await dbConn.disconnect();

        //reset the username

        dbConnPropsObj.userName = userNameBefore;

        dbConnPropsObj.password

            =

            passwordBefore;

    }

    /**
    * @description Insert row to Prime DB for testing attribute values that are linked to stocks
    * @param {string} action insert/delete determines whether adding/removing link
    * @param {string} entity_type entity/security/instrument
    * @param {string} data_type date/string/decimal
    * @param {integer) constituent_id the constituent id being linked to
    * @param {string} fld_code fld/code mapping to attribute_name?
    * @param {string} attribute_value
    * @param {date) start_date - date you want to start linking the constituent with the attribute value
    * @param {date} end_date - date you want to end linking the constituent with the attribute value
    * @param {string} targetEnv - the db you want to connect to TBC
    */

    async LinkConstituentsDB(_this, action, entity_type, data_type, constituent_id, fld_code, attribute_value, start_date, end_date, dbConn) {

        data_type = data_type.toLowerCase();
        let sql = null;
        if (entity_type == 'instrument') { entity_type = 'instr'; } // DB table is 'instr' not instrument
        if (entity_type == 'security') { entity_type = 'sec'; }

        if (action.toUpperCase() === 'INSERT') {

            sql = `insert into PRIME. PRIME.$(entity_type)_attr_${data_type}_value (${entity_type}_id, ${entity_type}_attr_fld_code, effective_date, expiration_date, val, locked, locked_reason, la 
    values ($(constituent_id), '${fld_code}', '${start_date}', '${end_date}', $(attribute_value), 0, NULL, USER_NAME(), GETDATE(), NULL)`

        }

        else if (action.toUpperCase() === 'DELETE') {

            sql = `delete from PRIME. PRIME.$(entity type) attr ${data_type} value where $(entity type) id ${constituent_id} and $(entity type)_attr_fld_code = '${fld_code}' and val = ${attribute}`
        }
        else { throw new Error(`Invalid action $(action), must be either INSERT or DELETE`); };

        console.log('SQL:', sql);

        await dbConn.query(sql); // execute the SQL

        addContext(_this, {
            title: 'SQL used for test step',
            value: $(sql)

        })

    }

    
/*
* @description Locates and clicks on Add Attribute button to open popup
*/
    async clickAddAttributeButton() {

await this.driverBuilder.driver.sleep(1000);
await this.driverBuilder.click(add_attribute_button);

} 

/*
* @description Puts text into xpath and locates it on the page
* @param (string) text the input text to find
*/

async findTextOnPage(text, retries = 3){
    await this.driverBuilder.waitForLocated(By.xpath("//^[contains(text(), '$(text)"), retries);
}

/*
* @description Presses Commit button and checks that is becomes disabled
*/

async commit_change() {

await this.driverBuilder.click (add_value_commit_button);
await this.driverBuilder.waitForElementAbsence (add_value_commit_button);
await this.driverBuilder.waitForLocated (add_value_commit_button_disabled, 4);
}

/** 
* @description Presses Cancel Values button, checks message, checks cancel button disabled, checks value not in grid 
* @param (string) value The Value to check is not in grid
* @param (string) effective date Start date of row to check not in grid 
*@param (string) expiration_date End date of row to check not in grid
*/


async cancel_change (value, effective_date, expiration_date, msg) {

await this.driverBuilder.click (add_value_cancel_button);
await this.driverBuilder.waitForLocated (By.xpath (attr_val_toast_msg.value + `//div[contains(text (), 'S(msg)')]`));
await this.driverBuilder.waitForLocated (add_value_commit_button_disabled, 4);
let res_array = await this._getValueGridValues();
let row_num = await this._isValueInGrid(value, effective_date, expiration_date, res_array);
 expect (row_num, `Error, $(value) still in grid after cancel`).to.be.null;
}

async undoChange (value, effective_date, expiration_date, msg) {

await this.driverBuilder.waitForLocated (add_value_undo_button, 4);
await this.driverBuilder.click (add_value_undo_button);
await this.driverBuilder.waitForLocated (By.xpath (attr_val_toast_msg.value + `//div[contains(text(), '${msg}')]`)); 
await this.driverBuilder.waitForLocated (add_value_commit_button_disabled, 4);
let res_array = await this.getValueGridValues();
let row_num = await this._isValueInGrid (value, effective_date, expiration_date, res_array);

expect (row_num, `Error, $value) still in grid after undo`).to.be.null;
}

async checkFieldHighlighted (locator) {

await this.driverBuilder.driver.sleep (500);
let res = await this.driverBuilder.driver.findElement (locator).getCssValue ("border-left-color"); expect (res, 'border colour should be red after error').to.equal('rgba(255, 0, 0, 1)');
}




async checkInputWarningMessage (locator, message) {

await this.driverBuilder.click (locator);
await this.findTextOnPage (message);
}

/**
* @description Adds a new attribute value
* @param {string} attribute name the attribute to add a value to
* @param {string} datatype TEXT, DECIMAL or DATE
* @param {string} attribute_value the value to add to the attribute
* @param {string) effective_date the start date of the value
* @param (string) expiration_date the end date of the value
*/

async addAttributeValue (attribute_name, datatype, attribute_value, effective_date, expiration_date, message = 'New value added'){}



    }