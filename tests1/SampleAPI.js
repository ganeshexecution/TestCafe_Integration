import { Selector } from 'testcafe';

 
fixture `Cat Facts API Test`
    .page `https://catfact.ninja/`;s
 
test('Fetch a random cat fact from Cat Facts API', async t => {
    const apiUrl = 'https://catfact.ninja/fact';
 
    const response = await fetch(apiUrl);
    const data = await response.json();
 
    console.log(data.fact);
 if ((data.fact)===null)
{
    console.log('errors while fetching data')
}
   await t.expect(data.fact).typeOf('string', 'Fact should be a string');
   
});