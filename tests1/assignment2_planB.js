const { Selector } = require("testcafe");

fixture`Learning TestCafe`
    .page`https://www.google.co.in/`
    .skipJsErrors();

test('Assignment 2', async a => {

    const searchbox = Selector('.gLFyf')
    const shoppingbtn = Selector('.YmvwI').nth(1)
   
    const reebok1 = Selector('a.vjtvke').withText('Reebok')
    const HighToLowPrice=Selector(".YpcDnf.OSrXXb").withText("Price – high to low");

    await a
        .maximizeWindow()
        .click(searchbox)
        .typeText(searchbox, 'shoes')
        .pressKey('enter')
        .wait(2000)
        .click(shoppingbtn)
        .wait(2000)
        .click(reebok1)
        .click(".Yf5aUd")
        .click(HighToLowPrice)
        .wait(4000)
        .takeScreenshot({fullPage:true})
        


});