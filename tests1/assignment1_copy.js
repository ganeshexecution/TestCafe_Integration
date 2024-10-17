import path from "path";
import xlsx from 'xlsx';
import { Selector } from "testcafe";
 
fixture("ToolsQA")
    .page("https://demoqa.com/automation-practice-form/")
    .skipJsErrors();
 
test("Submission Form Validation", async t => {
 
    //selectors
    let fileInput = Selector('#uploadPicture');
    let fileUpload = path.resolve('.//TestCafeTests//dataDrivenTesting//CGEmployeeNames.xlsx');
    let monthDropdown = Selector('.react-datepicker__month-select');
    let month = monthDropdown.child('option').withText('April');
    let yearDropdown = Selector('.react-datepicker__year-select');
    let year = yearDropdown.child('option').withText('2020');
    let day = Selector('.react-datepicker__day').withText('22');
    let selectState = '#state > div > div.css-1hwfws3 > div.css-1wa3eu0-placeholder';
    let selectCity = '#city > div > div.css-1hwfws3 > div.css-1wa3eu0-placeholder';
    let expectedMsg = Selector('#example-modal-sizes-title-lg').innerText;
    let hobby_1= Selector('label').withAttribute('for','hobbies-checkbox-1')
    let hobby_2= Selector('label').withAttribute('for','hobbies-checkbox-2')
    let hobby_3= Selector('label').withAttribute('for','hobbies-checkbox-3')
    let radio1=Selector('label').withAttribute('for','gender-radio-1')
    let radio2=Selector('label').withAttribute('for','gender-radio-2')
    let radio3=Selector('label').withAttribute('for','gender-radio-3')
 
 
    const filePath = path.resolve('.//tests//Book1.xlsx');
    console.log("Full file path:" + filePath);
 
    //Reading data from Excel
    const workbook = xlsx.readFile(filePath);
    const sheetName = 'Data';
 
    if (!workbook.SheetNames.includes(sheetName)) {
        throw new Error(`Sheet named "${sheetName}" not found in the Excel file.`);
    }
 
    const sheet = workbook.Sheets[sheetName];
 
    // Convert excel into json
    const data = xlsx.utils.sheet_to_json(sheet);
    console.log('Data from Excel file in Json format:', data);
 
    if (data.length === 0) {
        console.log('No data found in the Excel file.');
        return;
    }
 
    for (const row of data) {
        await t
            .maximizeWindow()
            .wait(5000)
            .scroll(0, 400)
            .typeText("#firstName", row.Firstname)
            .typeText("#lastName", row.Lastname)
            .typeText('#userEmail', row.Email)
            .wait(3000)
 
        async function selectGender(gender) {
            if (gender === 'Male') {
                await t.click(radio1)
               
            } else if (gender === 'Female') {
                await t.click(radio2)
            } else if (gender === 'Other') {
                await t.click(radio3)
            }
        }
        selectGender(row.Gender);
 
        await t
            .typeText('#userNumber', row.Mobile)
        async function calender() {
            await t
                .click('#dateOfBirthInput')
                .click(monthDropdown)
                .click(month)
                .click(yearDropdown)
                .click(year)
                .click(day)
        }
        calender();
        await t
            .typeText('#subjectsContainer > div > div.subjects-auto-complete__value-container.subjects-auto-complete__value-container--is-multi.css-1hwfws3', row.Subjects)
            .pressKey('enter')
 
        async function selectHobbies() {
            const hobbies = (row.Hobby).split(',');
 
            for (let hobby in hobbies) {
                if (hobbies[hobby] == 'Sports') {
                    await t.click(hobby_1)
                }
                if (hobbies[hobby] == 'Reading') {
                    await t.click(hobby_2)
                }
                if (hobbies[hobby] == 'Music') {
                    await t.click(hobby_3)
                }
            }
        }
        selectHobbies();
        // await t
        //   //  .setFilesToUpload(fileInput, fileUpload)
        //   //  .typeText('#currentAddress', row.address)
        //     .scroll(0, 800)
 
        // async function selectStateAndCity() {
        //     await t
        //    //     .typeText(selectState, row.state)
        //         .pressKey('enter')
        //         .wait(5000)
        //      //   .typeText(selectCity, row.city)
        //         .pressKey('enter')
        //}
      //  selectStateAndCity();
        await t
            .wait(3000)
            .click('#submit')
            .wait(5000)
        await t.expect(expectedMsg).contains('Thanks for submitting the form')
        await t.takeScreenshot("screenshot.png")
        await t.navigateTo('https://demoqa.com/automation-practice-form/');
       
    }
 
});