const { Selector } = require("testcafe");

const product = 'ZARA COAT 3';
const username = 'tonystark123@gmail.com';
const password = 'Tony@3127';

fixture('Learning TestCafe')
    .page('https://rahulshettyacademy.com/client')
    
    .beforeEach(async b=>{

        //@before test code
         //login with valid credentials
         await b
         .maximizeWindow()
         .typeText('#userEmail', username)
         .typeText('#userPassword', password)
         .wait(2000)
         .click('#login')

    })

    .afterEach(async a=>{
        await a.click('body > app-root > app-profile > app-sidebar > nav > ul > li:nth-child(5) > button')

    });

test('Successful Login', async l => {

    //login successful validation
    const toastSelector = Selector('#toast-container');
    const toast = toastSelector.innerText;
    await l.expect(toast).contains('Login Successfully')
    console.log('Logged in successfully')

    // product search
    // await l.typeText('#sidebar > form > div:nth-child(1) > input',product)
    // await l.wait(3000)

    // product search validation
    // await l.expect(Selector("#products > div.container > div.row > div > div > div > h5 > b").innerText).contains(product)
    // console.log('Product found')

    //adding product to cart
    const productsInSite = Selector("h5").child('b');
    const product = 'ZARA COAT 3'
    const productsInSiteCount = await productsInSite.count;
    let productnamelist = [];
    for (let i = 0; i < productsInSiteCount; i++) 
        {
        let product = await productsInSite.nth(i).innerText;
        productnamelist.push(product);
    }
    console.log(productnamelist)
    productnamelist.includes(product)

    const addToCart = Selector('.btn.w-10.rounded').withText('Add To Cart')
        await l.click(addToCart)
        await l.wait(3000)


        //cart validation
        await l.click('body > app-root > app-dashboard > app-sidebar > nav > ul > li:nth-child(4) > button')
        await l.expect(Selector('body > app-root > app-profile > div > div.cart > ul > li > div > div:nth-child(1) > h3').innerText).contains(product)
        console.log('Product added to cart successfully')
        await l.wait(3000)

        //product deletion from cart
        const productsInCart = Selector("h5").child('b');

        const productsInCartCount = await productsInCart.count;
        let productnamelistinCart = [];
        for (let i = 0; i < productsInCartCount; i++) {
            let product = await productsInCart.nth(i).innerText;
            productnamelistinCart.push(product);
        }
        //  console.log(productnamelist)
        productnamelistinCart.includes(product)
        await l.click('body > app-root > app-profile > div > div.cart > ul > li > div > div.cartSection.removeWrap > button.btn.btn-danger')
        await l.expect(Selector('body > app-root > app-profile > div > div.ng-star-inserted > h1').innerText).contains('No Products in Your Cart !')
        await l.wait(3000)
        console.log('Cart is empty')


    })




