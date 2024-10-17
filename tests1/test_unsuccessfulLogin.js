const { Selector } = require("testcafe");

fixture('Learning TestCafe')
    .page('https://rahulshettyacademy.com/client');

test('Unsuccessful Login', async l => {

    await l
        .maximizeWindow()
        //login with invalid credentials
        .typeText('#userEmail', 'tonystark@gmail.com')
        .typeText('#userPassword', 'Tony@123')
        .wait(2000)
        .click('#login')

    //invalid login message validation
    const toastSelector = Selector('#toast-container');
    const toast = toastSelector.innerText;
    await l.expect(toast).contains('Incorrect email or password')
    console.log('Logged in Failed')



})