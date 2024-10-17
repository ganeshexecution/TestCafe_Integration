import { Selector,t } from "testcafe";
 
class navbar{
 
    constructor()
    {
        this.signBtn=Selector("span").withText("Sign in")
        this.createAccountLink=Selector("a").withText("No account? Create one here")
        this.RegistrationPage=Selector(".page-header").child("h1").withText("Create an account")
        this.socialTitle=Selector("#field-id_gender-2")
        this.firstName=Selector("#field-firstname")
        this.lastName=Selector("#field-lastname")
        this.email=Selector("#field-email")
        this.password=Selector("#field-password")
        this.showPassword=Selector("[data-action='show-password']")
        this.hidePassword=Selector("[data-text-hide='Hide']")
        this.DOB=Selector("#field-birthday")
        this.termsAndConditions=Selector("[name='psgdpr']")
        this.saveBtn=Selector("button").withAttribute('data-link-action','save-customer')
        this.userName=Selector('span').withAttribute('class','hidden-sm-down')
    
    }
 
    async navigationPage()
    {
        await t
        .click(this.signBtn)
        .click(this.createAccountLink)
        .expect(this.RegistrationPage.exists).ok('Nagivated to Registration Page')
 
    }
}
 
export default navbar