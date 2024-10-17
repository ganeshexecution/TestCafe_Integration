import { Selector,b } from "testcafe";

class data{

    constructor()
    {
        this.signUpButton = Selector('a').withText('Signup / Login')
        this.loginEmail = Selector('input').withAttribute('data-qa','login-email')
        this.loginPassword = Selector('input').withAttribute('data-qa','login-password')
        this.loginButton = Selector('button').withAttribute('data-qa','login-button')
        this.logoutBtn = Selector('a').withText('Logout')

    }

    async login(b)
    {
        await b
        .click(this.signUpButton)
        .typeText(this.loginEmail,'johng0m0124410450@gmail.com')
        .typeText(this.loginPassword,'abCde@12346')
        .click(this.loginButton)
        .wait(2000)

    }

    async logout(b)
    {
        await b.click(this.logoutBtn)
    }
}

export default data