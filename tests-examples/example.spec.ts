import { test, expect } from '../hooks.ts';

test('Landing page has title', { tag: '@title' }, async ({ page }) => {
  
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('Using the Get Started link', { tag: '@link' }, async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('Global header search field with invalid input', { tag: ['@header', '@search', '@validation']}, async ({ page }) => {
  // Input string that has no search results
  const invalidSearchText = 'qwertyuiop asdfghjkl zxcvbnm';

  // Navigate to the page
  await page.goto('https://playwright.dev/');

  // Click the Search button
  await page.locator('//button//*[text() = \'Search\']//ancestor::button')
    .click();

  // Input text into the Search field
  await page.locator('//input[@placeholder = \'Search docs\']')
    .fill(invalidSearchText);

  // Verify the Search results
  await expect(await page.locator('//*[text() = \'No results for\']'))
    .toHaveText(`No results for "${invalidSearchText}"`);
});
