import {test, expect, Locator} from "@playwright/test";

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:4200');
})


test.describe('Form Layouts page', () => {
  test.beforeEach(async ({page}) => {
    await page.getByTitle('Forms').click()
    await page.getByTitle('Form Layouts').click()
  })

  // Find the Using The grid email field
  // Fill it with something
  // Clear it
  // write something in it slowly
  // Use general assertion
  // Use locator assertion

  test('input fields', async ({ page }) => {
    // Find the Using The grid email field
    const usingTheGridEmail: Locator = page.getByText('Using the Grid').locator('..').getByRole('textbox',{name: 'Email'});
    await usingTheGridEmail.click()
    const emailValue = 'test@example.com';

    // Fill it with something
    await usingTheGridEmail.fill(emailValue);
    let emailInputValue = await usingTheGridEmail.inputValue()
    expect(emailInputValue).toEqual(emailValue);

    // Clear it
    await usingTheGridEmail.clear();
    await expect(usingTheGridEmail).toHaveValue('');

    // write something in it slowly
    await usingTheGridEmail.pressSequentially(emailValue, { delay: 100 });
    await expect(usingTheGridEmail).toHaveValue(emailValue);
  })

  test('radio buttons', async ({page}) => {
    const usingTheGridEmail: Locator = page.getByText('Using the Grid').locator('..')
    const gridRadio: Locator = usingTheGridEmail.getByRole('radio',{name: 'Option 1'});
    await expect(gridRadio).not.toBeChecked()
    await gridRadio.check({force: true}) //For some reason this radio button is visibly hidden, and we need to use force to check it
    // await expect(usingTheGridEmail).toHaveScreenshot()
    await expect(gridRadio).toBeChecked()
  })

})

test.describe('Modal & Overlays', () => {
  test.beforeEach(async ({page}) => {
    await page.getByTitle('Modal & Overlays').click()
    await page.getByTitle('Toastr').click()
  })

  test('checkboxes', async ({page}) => {
    const checkbox1 = page.getByRole('checkbox', {name: 'Hide on click'});
    await checkbox1.check()
    await expect(checkbox1).toBeChecked()
    await checkbox1.uncheck({force: true})
    await expect(checkbox1).not.toBeChecked()
  })

  test('all checkboxes', async ({page}) => {
    const checkboxes = page.getByRole('checkbox')
    await expect(checkboxes).toHaveCount(3) // On my computer the first for loop is skipped if we don't have this line.

    for (const checkbox of await checkboxes.all()) {
      await checkbox.check({force: true})
      expect(await checkbox.isChecked()).toBeTruthy()
    }

    for (const checkbox of await checkboxes.all()) {
      await checkbox.uncheck({force: true})
      expect(await checkbox.isChecked()).toBeFalsy()
    }
  })

})
