import { Selector } from "testcafe";
import xlsx from 'xlsx';


const loadTestData = () => {
    const workbook = xlsx.readFile('.//tests1//Book1.xlsx');
    const sheetName = workbook.SheetNames[2];
    if (!workbook.SheetNames.includes(sheetName)) {
        throw new Error(`Sheet named "${sheetName}" not found in the Excel file.`);
    }
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    console.log('Data from Excel file in Json format:', data);

    if (data.length === 0) {

        console.log('No data found in the Excel file.');
        return;
    }
    return data;

};


fixture("Test 3")
    .page("http://automationexercise.com")
    .skipJsErrors()

test('Getting products from excel and adding them to cart', async b => {
    await new Promise(resolve => setTimeout(resolve, 100));

        const products = Selector('a').withText('Products')
        const testDataArray = loadTestData();

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');       
        const parent1 = Selector('.modal-footer');
        const continueButton = parent1.child('button').withText('Continue Shopping');

      //  await b.maximizeWindow()
        await b.click(products) ;   

    for (const [index, row] of testDataArray.entries()) 
    {
        const productSelector = Selector('.productinfo').child('p').withText(row.Products);
        const addToCartButton = productSelector.sibling('a.add-to-cart');

        const productExists = await productSelector.visible;
        if(productExists)
            {
            for (let i = 0; i < row.Quantity; i++) 
                {
                await b
               .scrollIntoView(productSelector)
                    .click(addToCartButton)
                    .wait(3000);
   
                await b.click(continueButton)
                    .wait(2000);
                }
            console.log(row.Products + ' is added to cart ' + row.Quantity + ' times');
        }
        else
        {
            console.log(row.Products +' does not exists in the application')
        }
    }

    await b.wait(2000)
   const topCart = Selector('a').withText('Cart')
    await b.click(topCart)
    .wait(2000)
    .takeScreenshot( `Cart-Product-Details-${timestamp}.png`)
 
 
    const parent = Selector('tr')
    const child = parent.find('td').withAttribute('class', 'cart_delete')
    const grandchild = child.find('.cart_quantity_delete')
    const count = await grandchild.count;
    console.log('Rows count:'+ count)
 
    for (let i = 0; i < count; i++) {
        const price = Selector('tr').find('td').withAttribute('class', 'cart_price');
        const totalPrice = Selector('tr').find('td').withAttribute('class', 'cart_total');
        const quantity = Selector('tr').find('td').withAttribute('class', 'cart_quantity');
        const productName=Selector('tr').find('td').withAttribute('class','cart_description').child('h4')
       
        const priceText=await price.innerText;
        const totalPriceText=await totalPrice.innerText;
        const quantityText=await quantity.innerText
        const productNameText=await productName.innerText
 
        console.log('Product ' + (i+1) +' details')
        console.log('Product Name :'+ productNameText)
        console.log( 'Price :'+ priceText)
        console.log( 'Total price :'+ totalPriceText)
        console.log( 'Quantity :'+ quantityText)
        console.log('------------------------------')
 
        const onlyPrice=priceText.split('.')[1];
        let Price=parseInt(onlyPrice,10)
        let Quantity=parseInt(quantityText,10);
       
        let money=Price*Quantity
        //validating total price with actual price
 
        const onlyTotalPrice=totalPriceText.split('.')[1];
        let TotalPrice=parseInt(onlyTotalPrice,10)
        await b.expect(TotalPrice).eql(money);
        console.log('Product ' + (i+1) + ' details are correct')
 
        await b.click(grandchild.nth(0))
        console.log('Product ' + (i + 1) + ' is deleted')
        console.log('------------------------------')
        await b.wait(2000)
 
    }
 
 
    console.log('Cart cleared')
    await b.takeScreenshot(`Empty Cart-${timestamp}.png`);
 
})