import { type Page } from '@playwright/test';
import { BasePage } from '@pom/base_page';

export class PlaywrightIntroPage extends BasePage {
  readonly page: Page;
  readonly url: string;
  readonly expected: { title: string };

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.url = 'https://playwright.dev/docs/intro';
    this.expected = {
      title: 'Installation | Playwright',
    };
  }

}
