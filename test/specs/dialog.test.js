const dialog = require('../../pageObjects/dialog.page')
const expect = require('chai').expect

describe('Dialog', async () => {
    // Execute a block of code before every test
    beforeEach(async () => {
        console.log('Step started.')
        // driver.pause(3500)
        // driver.setImplicitTimeout(50000)
    });

    it('Verify that the text entry dialog username & password fields are editable', async () => {
        await dialog.appBtn.click()
        await dialog.alertDialogBtn.click()
        await dialog.textEntryDialogBtn.click()

        await dialog.userNameField.addValue("Test User")
        await dialog.userNameField.clearValue();
        await dialog.userNameField.addValue("Actual User")

        await dialog.passwordField.clearValue()
        await dialog.passwordField.addValue("Test Pass")

        let text = await dialog.userNameField.getText()
        console.log(text)
        expect(await text).equal("Actual User")

        await dialog.dialogOkBtn.click()
    })

    it('Verify that the app adjust when orientation is switched', async () => {
        console.log(await driver.getOrientation())
        await driver.setOrientation('LANDSCAPE')

        await driver.saveScreenshot('./screenshots/landscape.png')
        await dialog.appBtn.click();

        await driver.setOrientation('PORTRAIT')
        await driver.back();
        await driver.saveScreenshot('./screenshots/portrait.png');
    });

    it.only('Verify isSelected, isEnabled & isDisplayed', async () => {
        await dialog.viewBtn.click()
        await driver.touchAction([
            { action: 'press', x: 500, y: 1400 },
            { action: 'moveTo', x: 500, y: 300 },
            'release',
            { action: 'press', x: 500, y: 1400 },
            { action: 'moveTo', x: 500, y: 300 },
            'release',
            { action: 'press', x: 500, y: 1400 },
            { action: 'moveTo', x: 500, y: 300 },
            'release'
        ])

        await dialog.tabsBtn.click()
        await dialog.contentByIdBtn.click()

        let isEnabled, isSelected, isDisplayed

        for (let i = 0; i < 3; i++) {
            isEnabled = await dialog.tabs[i].isEnabled()
            isSelected = await dialog.tabs[i].isSelected()
            isDisplayed = await dialog.tabs[i].isDisplayed()

            console.log(`Tab ${i + 1}`)
            console.log('isEnabled:', await isEnabled)
            console.log('isSelected:', await isSelected)
            console.log('isDisplayed:', await isDisplayed)

            if (await isEnabled && await isSelected) {
                console.log("Tab 1 isDisplayed:", await dialog.tab1Details.isDisplayed())
                console.log("Tab 2 isDisplayed:", await dialog.tab2Details.isDisplayed())
                console.log("Tab 3 isDisplayed:", await dialog.tab3Details.isDisplayed())
            }
        }
    })

    it('Verify Timeouts', async () => {
        //driver.setImplicitTimeout(10000);
        //driver.setTimeouts(10000);
        //driver.pause(10000);

        await dialog.viewBtn.click()
        //dialog.tabsBtn.click();
    })

    it('Verify the repeat alarm options has attribute checked set to true when selected',  async () => {
        let isChecked, text

        await dialog.appBtn.click()
        await dialog.alertDialogBtn.click()
        await dialog.repeatAlarmBtn.click()

        text = await dialog._weekdayCheckbox(0)
        let txt = await text.getText()
        expect(await txt).equal('Every Monday')

        isChecked = await dialog._weekdayCheckbox(0)
        let isChckd = await isChecked.getAttribute('checked')
        expect(await isChckd).equal('false');

        let wkdChkbx = await dialog._weekdayCheckbox(0)
        await wkdChkbx.click()

        isChecked = await dialog._weekdayCheckbox(0)
        let isChckd2 = await isChecked.getAttribute('checked')
        expect(await isChckd2).equal('true');
    })

    // Execute a block of code after every test
    afterEach(async () => {
        await driver.reset();
    })
})