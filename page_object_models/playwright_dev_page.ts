import { type Page } from '@playwright/test';
import { BasePage } from './base_page';

export class PlaywrightDevPage extends BasePage {
  readonly page: Page;
  readonly url: string;
  readonly expected: { title: string };

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.url = 'https://playwright.dev';
    this.expected = {
      title: 'Fast and reliable end-to-end testing for modern web apps | Playwright',
    };
  }

  /**
   * Click the Search button
   */
  async clickSearchButton () {
    try {
      await this.page.locator('//button//*[text() = \'Search\']//ancestor::button')
        .click();
    } catch (err) {
      throw new Error(`Error while clicking the Search button: ${(err as Error).message}`);
    }
  }

  /**
   * Click the Get Started button
   */
  async clickGetStarted () {
    try {
      await this.page.getByRole('link', { name: 'Get started' }).click();
    } catch (err) {
      throw new Error(`Error while clicking the Get Started button: ${(err as Error).message}`);
    }
  }

  /**
   * Type text into the search field
   */
  async inputSearch (searchText: string) {
    try {
      await this.page.locator('//input[@placeholder = \'Search docs\']')
        .fill(searchText);
    } catch (err) {
      throw new Error(`Error while inputting text into the Search field: ${(err as Error).message}`);
    }
  }

  /**
   * Get the validation message when no search results are found
   * @returns {string} the validation message
   */
  async getSearchResultValidationMessage (): Promise<string | null> {
    try {
      return await this.page.locator('//*[text() = \'No results for\']')
        .textContent();
    } catch (err) {
      throw new Error(`Error while getting the validation message from the search results: ${(err as Error).message}`);
    }
  }
}
