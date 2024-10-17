import { Selector } from "testcafe";
import xlsx from 'xlsx';
import {delete_account} from './helper.js'

const loadTestData = () => 
{
    const workbook = xlsx.readFile('.//tests//Book1.xlsx');
    const sheetName = workbook.SheetNames[1];
    if (!workbook.SheetNames.includes(sheetName)) {
        throw new Error(`Sheet named "${sheetName}" not found in the Excel file.`);
    }
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    console.log('Data from Excel file in Json format:', data);
 
    if (data.length === 0) 
        {
        console.log('No data found in the Excel file.');
        return;
    }
    return data;
 
};

fixture("Getting started with Testcafe")
    .page("http://automationexercise.com")
    .skipJsErrors()

    const testDataArray = loadTestData();
    testDataArray.forEach((row, index) => {

test('Account Creation', async a=>{

    await a.maximizeWindow()
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    //home page validation
    const homePageLogo=Selector('h2').withText('Full-Fledged practice website for Automation Engineers').innerText
    await a.wait(2000)
    console.log(await homePageLogo)
    await a.expect(homePageLogo).contains('Full-Fledged practice website for Automation Engineers')

    //First Page
    //Sign up
    const signUpButton = Selector('a').withText('Signup / Login')
    await a.click(signUpButton)
    await a.wait(3000)

    //Second Page
    //Name
    const signUpName = Selector('input').withAttribute('data-qa','signup-name')
    await a.typeText(signUpName,row.name)
    await a.wait(1000)

    //Email
    const signUpMail = Selector('input').withAttribute('data-qa','signup-email')
    await a.typeText(signUpMail,row.email)
    await a.wait(1000)

    //Signup Button
    const SignUp = Selector('button').withAttribute('data-qa','signup-button')
    await a.click(SignUp)
    await a.wait(3000)

    //Third Page
    //Title
    const title = Selector('input').withAttribute('value', (row.title).toString());
    await a.click(title)
    await a.scroll(0,500)

    //Password
    const password=Selector('input').withAttribute('data-qa','password')
    await a.typeText(password,row.password)
    await a.wait(2000)
    
    //Date
    const dateDropdown = Selector('select').withAttribute('data-qa','days')
    await a.click(dateDropdown)
    const date = dateDropdown.child('option').withAttribute('value',(row.day).toString())
    await a.click(date)
    await a.wait(2000)

    //Month
    const monthDropdown = Selector('select').withAttribute('data-qa','months')
    await a.click(monthDropdown)
    const month = monthDropdown.child('option').withText((row.month).toString())
    await a.click(month)
    await a.wait(2000)

    //Year
    const yearDropdown = Selector('select').withAttribute('data-qa','years')
    await a.click(yearDropdown)
    const year = yearDropdown.child('option').withAttribute('value',(row.year).toString())
    await a.click(year)
    await a.wait(2000)

    //Checkbox
    const checkBox1 = Selector('input').withAttribute('name','newsletter')
    const checkBox2 = Selector('input').withAttribute('name','optin')
    await a.click(checkBox1)
    await a.click(checkBox2)

    //First name
    const firstName = Selector('input').withAttribute('data-qa','first_name')
    await a.typeText(firstName,row.firstname)
    await a.wait(1000)

    //Last name
    const lastName = Selector('input').withAttribute('data-qa','last_name')
    await a.typeText(lastName,row.lastname)
    await a.wait(1000)

    //Company
    const company = Selector('input').withAttribute('data-qa','company')
    await a.typeText(company,row.company)
    await a.wait(1000)

    //Address1
    const address1 = Selector('input').withAttribute('data-qa','address')
    await a.typeText(address1,row.address1)
    await a.wait(1000)

    //Address2
    const address2 = Selector('input').withAttribute('data-qa','address2')
    await a.typeText(address2,row.address2)
    await a.wait(2000)

    //Country
    const countryDropdown = Selector('select').withAttribute('data-qa','country')
    await a.click(countryDropdown)
    const country = countryDropdown.child('option').withAttribute('value',(row.country).toString())
    await a.click(country)
    await a.wait(1000)

    //State
    const state= Selector('input').withAttribute('data-qa','state')
    await a.typeText(state,row.state)
    await a.wait(1000)

    //City
    const city= Selector('input').withAttribute('data-qa','city')
    await a.typeText(city,row.city)
    await a.wait(1000)

    //Zipcode
    const zipcode= Selector('input').withAttribute('data-qa','zipcode')
    await a.typeText(zipcode,(row.zipcode).toString())
    await a.wait(1000)

    //Mobile number
    const number= Selector('input').withAttribute('data-qa','mobile_number')
    await a.typeText(number,(row.mobile).toString())
    await a.wait(1000)

    //Create account
    const createAccountButton = Selector('button').withAttribute('data-qa','create-account')
    await a.click(createAccountButton)
    await a.wait(2000)

    //Fourth Page
    //Account created
    const accountCreatedMessage = Selector('h2').withAttribute('data-qa','account-created').innerText
    console.log(await accountCreatedMessage)
    await a.expect(accountCreatedMessage).contains('ACCOUNT CREATED!')
    await a.takeScreenshot(`dataset - ${index+1}Account Created_${timestamp}.png`);

    //Continue button
    const continueButton = Selector('a').withAttribute('data-qa','continue-button')
    await a.click(continueButton)


});

test.only('Login', async b=>{
  
    await b.maximizeWindow()
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    //First Page
    //Sign up
    const signUpButton = Selector('a').withText('Signup / Login')
    await b.click(signUpButton)
    await b.wait(3000)

    //Second Page
    //Email
    const loginEmail = Selector('input').withAttribute('data-qa','login-email')
    await b.typeText(loginEmail,row.email)
    await b.wait(1000)

    //Password
    const loginPassword = Selector('input').withAttribute('data-qa','login-password')
    await b.typeText(loginPassword,row.password)
    await b.wait(1000)

    //Login button
    const loginButton = Selector('button').withAttribute('data-qa','login-button')
    await b.click(loginButton)
    await b.wait(3000)
    await b.takeScreenshot(`dataset -${index+1} Login Successful_${timestamp}.png`);

    //Third Page 
    //User validation
    const username = Selector('a').withText(' Logged in as ').innerText
    await b.expect(username).contains(row.firstname)
    console.log(await username)

    //Products
    const products = Selector('a').withText(' Products')
    await b.click(products)

    //Adding products to cart
    const product1 = Selector('a').withAttribute('data-product-id','1')
    const contiueShoppingButton = Selector('button').withText('Continue Shopping')
    await b.click(product1)
    await b.wait(2000)
    await b.click(contiueShoppingButton)
    const product2 = Selector('a').withAttribute('data-product-id','4')
    await b.click(product2)
    await b.wait(2000)
    await b.click(contiueShoppingButton)
    const product3 = Selector('a').withAttribute('data-product-id','2')
    await b.click(product3)
    await b.wait(2000)
    await b.click(contiueShoppingButton)

    //View cart
    const cart = Selector('a').withText('Cart')
    await b.click(cart)
    await b.wait(2000)

    //Fourth page
    //Cart page validation
    const proceedToCheckoutButton = Selector('a').withText('Proceed To Checkout').innerText
    await b.expect(proceedToCheckoutButton).contains('Proceed To Checkout')

    //Procced to checkout
    const checkoutButton = Selector('a').withText('Proceed To Checkout')
    await b.click(checkoutButton)
    await b.wait(2000)
    await b.scroll(0,2000)

    //Fifth page
    //Validating delivery address
    const delivery_name=Selector('#address_delivery').find('li').nth(1).innerText;
        const delivery_company=Selector('#address_delivery').find('li').nth(2).innerText
        const delivery_state=Selector('#address_delivery').find('li').nth(5).innerText
        const delivery_country=Selector('#address_delivery').find('li').nth(6).innerText
        const delivery_phone=Selector('#address_delivery').find('li').nth(7).innerText
        await b
        .expect(delivery_name).contains(row.firstname)
        .expect(delivery_company).contains(row.company)
        .expect(delivery_state).contains(row.state)
        .expect(delivery_country).contains(row.country)
        .expect(delivery_phone).contains(row.mobile)

    //Validating billing address 
    const billing_name=Selector('#address_invoice').find('li').nth(1).innerText;
        const billing_company=Selector('#address_invoice').find('li').nth(2).innerText
        const billing_state=Selector('#address_invoice').find('li').nth(5).innerText
        const billing_country=Selector('#address_invoice').find('li').nth(6).innerText
        const billing_phone=Selector('#address_invoice').find('li').nth(7).innerText
        await b
        .expect(billing_name).contains(row.firstname)
        .expect(billing_company).contains(row.company)
        .expect(billing_state).contains(row.state)
        .expect(billing_country).contains(row.country)
        .expect(billing_phone).contains(row.mobile)

    //Place order
    const placeOrderButton = Selector('a').withText('Place Order')
    await b.click(placeOrderButton)
    await b.wait(2000)

    //Sixth Page
    //Name on card
    const nameOnCard = Selector('input').withAttribute('data-qa','name-on-card')
    await b.typeText(nameOnCard,row.cardName)
    await b.wait(1000)

    //Card number
    const cardNumber = Selector('input').withAttribute('data-qa','card-number')
    await b.typeText(cardNumber,(row.cardNumber).toString())
    await b.wait(1000)

    //CVV
    const cvc = Selector('input').withAttribute('data-qa','cvc')
    await b.typeText(cvc,(row.cvc).toString())
    await b.wait(1000)

    //Expiry month
    const expiryMonth = Selector('input').withAttribute('data-qa','expiry-month')
    await b.typeText(expiryMonth,(row.expiryMonth).toString())
    await b.wait(1000)

    //Expiry year
    const expiryYear = Selector('input').withAttribute('data-qa','expiry-year')
    await b.typeText(expiryYear,(row.expiryYear).toString())
    await b.wait(1000)
    
    //Pay button
    const payButton = Selector('button').withAttribute('data-qa','pay-button')
    await b.click(payButton)
    await b.wait(2000)

    //Seventh page
    //Order message validation
    const orderMessage = Selector('p').withText('Congratulations! Your order has been confirmed!').innerText
    await b.expect(orderMessage).contains('Congratulations! Your order has been confirmed!')
    console.log(await orderMessage)
    await b.wait(2000)
    await b.takeScreenshot(`dataset - ${index+1} Order Confirmed${timestamp}.png`);

    //Download invoice
    const downloadButton = Selector('a').withText('Download Invoice')
    await b.click(downloadButton)

    //Delete account
    if (row.deleteAccount === 'Yes')
     {
        await delete_account();
        //Delete account  message Validation
        const deleteMessage = Selector('h2').withAttribute('data-qa', 'account-deleted').innerText
        await b.expect(deleteMessage).contains('ACCOUNT DELETED')
        console.log(await deleteMessage)
        await b.wait(2000)
        await b.takeScreenshot(`dataset - ${index+1} Delete Account${timestamp}.png`);
    }

    //Continue button
    const finalContinue = Selector('a').withAttribute('data-qa','continue-button')
    await b.click(finalContinue)

    //home page validation
    const homePageLogo=Selector('h2').withText('Full-Fledged practice website for Automation Engineers').innerText
    await b.wait(2000)
    console.log(await homePageLogo)
    await b.expect(homePageLogo).contains('Full-Fledged practice website for Automation Engineers')

})
})
