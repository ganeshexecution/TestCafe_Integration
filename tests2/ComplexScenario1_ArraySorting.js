import { Selector } from "testcafe";
import data from './ObjectFile';

fixture("Test 1")
    .page("http://automationexercise.com")
    .skipJsErrors()

    const d = new data()
test('Array Sorting', async b=>{
 
    await b.maximizeWindow()
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    await d.login(b);
     
    const productsPrice=Selector('.features_items').find('h2').withText('Rs.');
    const productsCount=await productsPrice.count;
 
    //Storing products in an array
    let prices=[];
    for(let i=0;i<productsCount;i++){
        const priceText=await productsPrice.nth(i).innerText;
        const price= priceText.split('.')
        prices.push(price[1]);
 
    }
    console.log("Price List before sorting:");
    console.log(prices);
    console.log(productsCount);
 
    //sorting high to low
    const sortedPrices=prices;
    sortedPrices.sort(function(a, b){return b - a});
    console.log("Price List after sorting:");
    console.log(sortedPrices);
 
    //Unique product list
    const uniqueItems=[...new Set(sortedPrices)];
   
    console.log('Unique price list:')
    console.log(uniqueItems)
    const secondHighestProduct=uniqueItems[1]
    console.log('Second highest price:'+ secondHighestProduct);
    const uniqueItemsCount=uniqueItems.length;
    const secondLowestProduct=uniqueItems[uniqueItemsCount-2]
    console.log('Second lowest price:'+ secondLowestProduct);  
    await b.wait(5000);
 
    await d.logout(b);
 
});