const dialog = require('../../pageObjects/dialog.page')
const data = require('../../data/data')
const expect = require('chai').expect
 
describe('Cancel Dialogs', async () => {
    // Execute a block of code at the start of the test suite
    before(async () => {
        console.log('Test started.')
        // driver.pause(3500)
        // driver.setImplicitTimeout(50000)
        await dialog.appBtn.click()
        await dialog.alertDialogBtn.click()
    })
    
    it('Verify that the cancel dialog short message is correct and displays', async () => {
        await dialog.cancelDialogMsgBtn.click()
        expect(await dialog.getDialogModalTitle()).equal(await data.shortCancelDialog.title)
        await dialog.dialogOkBtn.click()
    })
    
    it('Verify that the cancel dialog long message is correct and displays', async () => {
        await dialog.cancelLongDialogMsgBtn.click()
        expect(await dialog.getDialogModalTitle()).equal(await data.longCancelDialog.title);
        expect(await dialog.getDialogModalMsg()).equal(await data.longCancelDialog.msg)
        await dialog.dialogOkBtn.click()
    })
    
    it('Verify that the cancel dialog ultra long message is correct', async () => {
        await dialog.cancelUltraLongDialogMsgBtn.click()
        expect(await dialog.getDialogModalTitle()).equal(await data.ultraLongCancelDialog.title)
        expect(await dialog.getDialogModalMsg()).equal(await data.ultraLongCancelDialog.msg)
        await dialog.dialogOkBtn.click()
    })

    // Execute a block of code at the end of the test suite
    after(async () => {
        console.log('Test Completed')
    })
})
