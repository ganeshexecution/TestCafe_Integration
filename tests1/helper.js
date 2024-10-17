import { Selector,t } from "testcafe";
 
export async function delete_account() 
{
    const deleteAccount = Selector('a').withText(' Delete Account')
    await t.click(deleteAccount)
}