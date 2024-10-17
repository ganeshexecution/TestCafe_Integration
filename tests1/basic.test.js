import { Selector } from "testcafe";

fixture `Getting started with TestCafe`
   .page`https://devexpress.github.io/testcafe/example/`

   .beforeEach(async b=>{

  //  await b.setPageLoadTimeout(0)
    await b.setTestSpeed(0.01)

   })
test('My first TestCase',async t=> {

    //Test Code
    //await t.setTestSpeed(0.01)
    const name_input = Selector('#developer-name')
    const submit_button = Selector('#submit-button')
    const article_Text = Selector('#article-header')

    //await t.takeScreenshot({fullPage: true})
  //  await t.takeElementScreenshot(submit_button)
    await t.typeText(name_input,'Tony')
    await t.click(submit_button)

    //Assertion
    await t.expect(article_Text.innerText).contains('John')
})