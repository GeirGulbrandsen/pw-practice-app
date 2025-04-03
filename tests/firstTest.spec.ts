import {test} from '@playwright/test'

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:4200')
})


test.describe.skip('firstTests', () => {

  test.beforeEach(async ({page}) => {
    await page.getByText('Forms').click()
  })

  test('the first test', async ({page}) => {
    await page.getByText('Form Layouts').click()
    await page.getByText('Option 2').click()
    await page.locator('nb-card').filter({has: page.getByRole('checkbox')}).filter({has:page.getByRole('button', {name:'Sign in'})}).getByRole('textbox', {name:'Email'}).fill('Test')
  })

// test('navigate to datepicker', async ({page}) => {
//   await page.getByText('Datepicker').click()
//
//   // await page.pause()
// })


})


