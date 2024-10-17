fixture('Getting Started')
    .page('https://google.com');

test('First test', async t => {

    //Test code
    await t.typeText('#APjFqb','Udemy')
    await t.click('.gNO89b')
    await t.wait(2000)
})

