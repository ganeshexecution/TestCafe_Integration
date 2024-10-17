import { Selector } from "testcafe";
fixture("Getting started with Testcafe")
    .page("https://magento.softwaretestingboard.com/")
    .skipJsErrors()

test('Create Account', async a=>{

    const createAccountButton = Selector('a').withText('Create an Account')
    const firstName = Selector('#firstname')
    const lastName = Selector('#lastname')
    const email = Selector('#email_address')
    const password = Selector('#password')
    const confirmPassword = Selector('#password-confirmation')
    const createButton = Selector('button').withAttribute('title','Create an Account')
    const message = Selector('#maincontent > div.page.messages > div:nth-child(2) > div > div > div').innerText
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    //create an account
    await a
    .maximizeWindow()
    .click(createAccountButton)
    .typeText(firstName,'Siva')
    .typeText(lastName,'Naga')
    .typeText(email,'nagaGanesh123@gmail.com')
    .typeText(password,'Tony@3127')
    .typeText(confirmPassword,'Tony@3127')
    .click(createButton)
    .wait(3000)
    .expect(message).contains('Thank you for registering with Main Website Store.')
    .wait(2000)
     .takeScreenshot(`screenshot1_${timestamp}.png`);

     console.log(await message)
});

test('Login', async b=>{

    const signInButton = Selector('a').withText('Sign In')
    const loginEmail = Selector('input').withAttribute('name','login[username]')
    const loginPassword = Selector('input').withAttribute('name','login[password]')
    const signIn = Selector('span').withText('Sign In')
    const logo =  Selector('span').withAttribute('class','logged-in').innerText
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    

    //login
    await b
    .maximizeWindow()
    .click(signInButton)
    .typeText(loginEmail,'ganesh123@gmail.com')
    .typeText(loginPassword,'Tony@3127')
    .click(signIn)
    .wait(3000)
    .expect(logo).contains('Welcome, Sai Ganesh!')
   .takeScreenshot(`screenshot2_${timestamp}.png`);

   console.log(await logo)

  
    

});

test('Invalid Login', async c=>{
    const signInButton = Selector('a').withText('Sign In')
    const loginEmail = Selector('input').withAttribute('name','login[username]')
    const loginPassword = Selector('input').withAttribute('name','login[password]')
    const signIn = Selector('span').withText('Sign In')
    const errorMessage =  Selector('#maincontent > div.page.messages > div:nth-child(2) > div > div > div').innerText
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    //login with invalid credentials
    await c
    .maximizeWindow()
    .click(signInButton)
    .typeText(loginEmail,'ganesh123@gmail.com')
    .typeText(loginPassword,'Tony123')
    .click(signIn)
    .wait(3000)    
    .expect(errorMessage).contains('The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.')
    .takeScreenshot(`screenshot3_${timestamp}.png`);

    console.log(await errorMessage)
   


});

test('Create Account Invalid', async d=>{

    const createAccountButton = Selector('a').withText('Create an Account')
    const firstName = Selector('#firstname')
    const lastName = Selector('#lastname')
    const email = Selector('#email_address')
    const password = Selector('#password')
    const confirmPassword = Selector('#password-confirmation')
    const createButton = Selector('button').withAttribute('title','Create an Account')
    const duplicateMessage = Selector('#maincontent > div.page.messages > div:nth-child(2) > div > div > div').innerText
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    //create a duplicate account 
    await d
    .maximizeWindow()
    .click(createAccountButton)
    .typeText(firstName,'Sai')
    .typeText(lastName,'Ganesh')
    .typeText(email,'ganesh123@gmail.com')
    .typeText(password,'Tony@3127')
    .typeText(confirmPassword,'Tony@3127')
    .click(createButton)
    .wait(3000)
    .expect(duplicateMessage).contains('There is already an account with this email address. If you are sure that it is your email address, click here to get your password and access your account.')
    .wait(2000)
    .takeScreenshot(`screenshot4_${timestamp}.png`);

    console.log(await duplicateMessage)
    
});

    


 
 