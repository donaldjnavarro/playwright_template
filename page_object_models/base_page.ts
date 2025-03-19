import { type Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly url: string;
  readonly expected: { title: string };

  constructor(page: Page) {
    this.page = page;
    this.url = '';
    this.expected = {
      title: '',
    };
  }
}
