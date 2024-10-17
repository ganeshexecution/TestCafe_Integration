import { Selector,b } from "testcafe";
 
export async function login_account(username,password) 
{
    //First Page
    //Sign up
    const signUpButton = Selector('a').withText('Signup / Login')
    await b.click(signUpButton)
    await b.wait(3000)

    //Second Page
    //Email
    const loginEmail = Selector('input').withAttribute('data-qa', 'login-email')
    await b.typeText(loginEmail, username)
    await b.wait(1000)

    //Password
    const loginPassword = Selector('input').withAttribute('data-qa', 'login-password')
    await b.typeText(loginPassword, password)
    await b.wait(1000)

    //Login button
    const loginButton = Selector('button').withAttribute('data-qa', 'login-button')
    await b.click(loginButton)

    return new Promise((resolve) => setTimeout(resolve, 1000));
}