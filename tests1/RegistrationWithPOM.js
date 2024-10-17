import { Selector } from 'testcafe';
import navbar from './Objects';
 
fixture `Register Page`
    .page `https://teststore.automationtesting.co.uk/index.php`;  // The page to be tested
 
const n =new navbar()
 
test("Register Page", async t=>{
 
    await t
    .maximizeWindow()
    
    n.navigationPage();
 
    await t
    .click(n.socialTitle)
    .typeText(n.firstName,"John")
    .wait(3000)
    .typeText(n.lastName,"Smith")
    .typeText(n.email,"hdbwhj868673@gmail.com")
    .typeText(n.password,"Hello@123")
    .click(n.showPassword)
    .click(n.hidePassword)
    .typeText(n.DOB,"2/11/2000")
    .scrollIntoView(n.termsAndConditions)
    .click(n.termsAndConditions)
    .scrollIntoView(n.saveBtn)
    .click(n.saveBtn)
    .wait(7000)

    const Name = (n.userName).innerText

    await t.expect(Name).contains('John Smith')
    console.log(await Name)

 
});
 
 