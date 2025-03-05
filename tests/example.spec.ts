import { test, expect } from '../hooks.ts';
import { PlaywrightDevPage } from './../page_object_models/playwright_dev_page';
import { PlaywrightIntroPage } from './../page_object_models/playwright_intro_page.ts';

test.describe('Playwright Home Page', { tag: ['@playwrightHomePage', '@debug'] }, () => {

  /** Background actions */
  test.beforeEach(async ({ page }) => {
    const devPage = new PlaywrightDevPage(page);
    await page.goto(devPage.url);
  });

  test('Landing page has title', { tag: '@title' }, async ({ page }) => {
    const devPage = new PlaywrightDevPage(page);
    await expect(page, 'Verifying web browser tab title')
      .toHaveTitle(devPage.expected.title);
  });

  test('Using the Get Started link', { tag: '@link' }, async ({ page }) => {
    const devPage = new PlaywrightDevPage(page);

    // Click the get started link to navigate to the Intro page
    await devPage.clickGetStarted();
    const introPage = new PlaywrightIntroPage(page);

    // Expect the Intro page URL
    await expect(page, 'Verifying the URL of the Intro page')
      .toHaveURL(introPage.url);

    // Expect the Intro page title to be present
    await expect(page, 'Verifying web browser tab title')
      .toHaveTitle(introPage.expected.title);

    // Expect the Intro page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' }), 'Verifying page contents for heading text')
      .toBeVisible();
  });

  test('Global header search field with invalid input', { tag: ['@header', '@search', '@validation']}, async ({ page }) => {
    const devPage = new PlaywrightDevPage(page);

    // Define string to input that has no search results
    const invalidSearchText = 'qwertyuiop asdfghjkl zxcvbnm';

    // Click the Search button
    await devPage.clickSearchButton();

    // Input text into the Search field
    await devPage.inputSearch(invalidSearchText);

    // Verify the Search results
    const actualText = await devPage.getSearchResultValidationMessage();
    expect(actualText)
      .toBe(`No results for "${invalidSearchText}"`);
  });
});
