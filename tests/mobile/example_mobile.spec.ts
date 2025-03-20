import { test, expect } from '../../hooks.ts';
import { PlaywrightDevPage } from '../../page_object_models/playwright_dev_page.ts';

// We can skip tests based on conditions at the file level, or below at the test level
test.skip(({ isMobile }) => isMobile !== true, 'Test is only for mobile devices');

test.describe('Example mobile tests', { tag: ['@exampleMobile'] }, () => {

  /** Background actions */
  test.beforeEach(async ({ page }) => {
    const devPage = new PlaywrightDevPage(page);
    await page.goto(devPage.url);
  });

  test('Mobile landing page has title', async ({ page }) => {
    const devPage = new PlaywrightDevPage(page);
    await expect(page, 'Verifying web browser tab title')
      .toHaveTitle(devPage.expected.title);
  });

});
