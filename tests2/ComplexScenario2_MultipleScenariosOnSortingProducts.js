import { Selector } from "testcafe";
import xlsx from 'xlsx';
import data from './ObjectFile';

fixture("Test 2")
    .page("http://automationexercise.com")
    .skipJsErrors()

    const d = new data()

test('Multiple Scenarios on Sorting Products', async b => {

    await b.maximizeWindow()
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');


    await d.login(b);

    const productsPrice = Selector('.features_items').find('h2').withText('Rs.');
    const productsName = Selector('.features_items').find('p');
    const productsPriceCount = await productsPrice.count;
    const productsNameCount = await productsName.count;

    //Storing products in an array
    let products = [];
    for (let i = 0; i < productsPriceCount; i++) 
    {
        const priceText = await productsPrice.nth(i).innerText;
        const productNameText = await productsName.nth(i + 2).innerText;
        const price = priceText.split('.')
        const final_price = price[1].trim()
        products.push({ final_price, productsName: productNameText.trim() });

    }


    //  Code for removing duplicate items
    const uniqueProducts = Array.from(new Set(products.map(p => JSON.stringify(p))))
        .map(p => JSON.parse(p));

    console.log("Unique Product List:");
    console.log(uniqueProducts);

   // console.log(productsPriceCount);
    console.log('Total no of Products = '+ (productsNameCount - 2));
    const uniqueItemsCount=uniqueProducts.length;
    console.log('Total no of Unique Products = '+uniqueItemsCount)
    
    //printing prices
    const finalPrices = uniqueProducts.map(product => product.final_price);
    //console.log('Final Prices:', finalPrices);

     //Sorting values
    const sortedProducts = uniqueProducts.sort((a, b) => Number(a.final_price) - Number(b.final_price));
    // Print sorted products
    let firstTenProducts = [];
    console.log("\nFirst 10 products:");
    console.log('-------------------------------');
    for (let i = 0; i < 10; i++) {
        const product = sortedProducts[i];
        firstTenProducts.push(product);
       console.log(`Product Name : ${product.productsName},  Price: ${product.final_price}`);
    }

    console.log('-------------------------------');
    console.log('-------------------------------');

    let lastTenProducts = [];
    console.log("\nLast 10 products:");
    console.log('-------------------------------');
    for (let i = (sortedProducts.length) - 10; i <= (sortedProducts.length) - 1; i++) {
        const product = sortedProducts[i];
        lastTenProducts.push(product);
        console.log(`Product Name : ${product.productsName},  Price: ${product.final_price}`);
    }

    await d.logout(b);

        //exporting data 
        const workbook1 = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(uniqueProducts);
       
        const workbook = './/tests1//ExportData.xlsx';
     
        xlsx.utils.book_append_sheet(workbook1, worksheet, 'Data');
        xlsx.writeFile(workbook1, workbook);
    

});