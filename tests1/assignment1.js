const { Selector } = require("testcafe");
import xlsx from 'xlsx';
import path from 'path';

const loadTestData = () => {
    const workbook = xlsx.readFile('.//tests//Book1.xlsx');
    const sheetName = workbook.SheetNames[0];
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

}


fixture`Learning TestCafe`
    .page`https://demoqa.com/automation-practice-form`
    .skipJsErrors();

const testDataArray = loadTestData();
testDataArray.forEach((row, index) => 
    {
    test(`Submit form with data set ${index + 1}`, async a => 
        {



        await a
            .maximizeWindow()
            .wait(5000)
            .scroll(0, 400)

        const firstName = Selector('#firstName')
        const lastName = Selector('#lastName')
        const email = Selector('#userEmail')
        const gender_1 = Selector('label').withAttribute('for', 'gender-radio-1')
        const gender_2 = Selector('label').withAttribute('for', 'gender-radio-2')
        const gender_3 = Selector('label').withAttribute('for', 'gender-radio-3')
        const mobile = Selector('#userNumber')
        const subjects = Selector('#subjectsContainer > div > div.subjects-auto-complete__value-container.subjects-auto-complete__value-container--is-multi.css-1hwfws3')
        const hobby_1 = Selector('label').withAttribute('for', 'hobbies-checkbox-1')
        const hobby_2 = Selector('label').withAttribute('for', 'hobbies-checkbox-2')
        const hobby_3 = Selector('label').withAttribute('for', 'hobbies-checkbox-3')
        const submit_btn = Selector('#submit')
        const dateInput = Selector('#dateOfBirthInput')
        const date_picker = Selector('.react-datepicker__day')
        const month_picker = Selector('.react-datepicker__month-select')
        const year_picker = Selector('.react-datepicker__year-select')
        const close_form = Selector('#closeLargeModal')
        const current_address = Selector('#currentAddress')
        const fileUploadbtn = Selector('#uploadPicture')

        // const month_name='January'
        // const year_no='2000'
        // const date_no='27'


        
            //name
            await a
                .typeText(firstName, row.Firstname)
                .typeText(lastName, row.Lastname)

                //email
                .typeText(email, row.Email)

            //gender
            if (row.Gender === 'Male')
                await a.click(gender_1)
            else if (row.Gender === 'Female')
                await a.click(gender_2)
            else if (row.Gender === 'Other')
                await a.click(gender_3)

            //mobile
            await a
                .typeText('#userNumber', row.Mobile)

            //subject
            await a
                .typeText('#subjectsContainer > div > div.subjects-auto-complete__value-container.subjects-auto-complete__value-container--is-multi.css-1hwfws3', row.Subjects)
                .pressKey('enter')

            //hobby
            if (row.Hobby === 'Sports') {
                await a.click(hobby_1)
                await a.wait(2000)
            }
            else if (row.Hobby === 'Music') {
                await a.click(hobby_3)
                await a.wait(2000)
            }
            else if (row.Hobby === 'Reading')
                await a.click(hobby_2)

            await a.wait(2000)

            // //date of birth
            await a
                .click(dateInput)
                .click(month_picker)
            const month = month_picker.find('option').withText('August')
            await a.click(month)
                .click(year_picker)
            const year = year_picker.find('option').withText('1999')
            await a.click(year)
                .wait(2000)
            const date = date_picker.withText('27')
            await a.click(date)
                .wait(2000)

            //file upload       
    let fileUpload = path.resolve('.//tests//Book1.xlsx');  
    await a.setFilesToUpload(fileUploadbtn, fileUpload)  

            //current address
            await a.typeText(current_address, row.CurrentAddress)


                //submit button
                .click(submit_btn)
               await a.scroll(0,500)
             const timestamp = new Date().toISOString().replace(/[:.]/g,'-'); 
             await a
                .takeScreenshot(`screenshot-${timestamp}_.png`)
                .wait(3000)
            await a.navigateTo('https://demoqa.com/automation-practice-form')
                .wait(2000)

        
    });


    }); 