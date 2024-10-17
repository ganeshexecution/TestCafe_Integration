import { Selector } from 'testcafe';
import https from 'https';
import axios from 'axios';
 
fixture ('API Data Test')
.page `http://automationexercise.com`;

// const fs = require('fs');

const agent = new https.Agent({
   rejectUnauthorized: false 
});
 
async function fetchData(url) {
    const response = await fetch(url, { httpsAgent: agent });
    return await response.json();
}
 
test('Test with API Data', async t => {
    const apiUrl = 'https://randomuhejdsser.me/'; 
    let data;
    await t.maximizeWindow()
 
    try {
        // Fetch the data from the API
        data = await fetchData(apiUrl);
        
        console.log(JSON.stringify((data),null,4)); 
    } catch (error) {
        console.error('Error fetching data:', error);
        await t.expect(false).ok('Failed to fetch data from API'); 
    }

    const homeLink = Selector('a').withText('Signup / Login');
    const name = Selector('input').withAttribute('data-qa', 'signup-name');
    const email = Selector('input').withAttribute('data-qa', 'signup-email');
    const signupBtn = Selector('button').withAttribute('data-qa', 'signup-button');
 
    await t
        .click(homeLink)
        .typeText(name, data.results[0].name.first)
        .typeText(email, data.results[0].email)
        .click(signupBtn);

        //User details
    const title = Selector('input').withAttribute('value', 'Mr');
    const password = Selector('#password');
    const dayDropdown = Selector('#days');
    const day = Selector('option').withText('6');
    const monthDropdown = Selector('#months');
    const month = Selector('option').withText('April');
    const yearDropdown = Selector('#years');
    const year = Selector('option').withText('2007');
 
    await t
        .wait(3000)
        .click(title)
        .typeText(password, data.results[0].login.password)
        .click(dayDropdown)
        .click(day)
        .click(monthDropdown)
        .click(month)
        .click(yearDropdown)
        .click(year)
 
    const firstname = Selector('#first_name');
    const lastname = Selector('#last_name');
    const company = Selector('#company');
    const address1 = Selector('#address1');
    const address2 = Selector('#address2');
    const countrydropDown = Selector('#country');
    const country = Selector('option').withAttribute('value', 'Canada');
    const state = Selector('#state');
    const city = Selector('#city');
    const zipcode = Selector('#zipcode');
    const mobileNumber = Selector('#mobile_number');
    const createAccount = Selector('button').withText('Create Account');
    const Message = Selector('#form > div > div > div > h2 > b').innerText;
    const continueBtn = Selector('a').withText('Continue');
    const user = Selector('a').withText('Logged in as');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
 
    await t
        .typeText(firstname, data.results[0].name.first)
        .typeText(lastname, data.results[0].name.last)
        .typeText(company, 'CG')
    await t.scroll(0, 700);
    await t.wait(2000);
    await t
        .typeText(address1, data.results[0].location.street.name)
        .typeText(address2, data.results[0].location.street.name)
        .click(countrydropDown)
        .click(country)
        .typeText(state, data.results[0].location.state)
        .typeText(city, data.results[0].location.city)
        .typeText(zipcode, (data.results[0].location?.postcode).toString())
        .typeText(mobileNumber, (data.results[0].phone))
        .click(createAccount)
        .takeScreenshot(`Create Account - ${timestamp}.png`)
        .expect(Message).eql('ACCOUNT CREATED!')
        console.log(await Message)
        .click(continueBtn)
        .wait(2000)
        .expect(user.innerText).contains(data.results[0].name.first)
        console.log(await user.innerText)
 
    
});