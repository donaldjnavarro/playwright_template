import { type Page } from '@playwright/test';
import { BasePage } from './base_page';

export class PlaywrightTodoPage extends BasePage {
  readonly page: Page;
  readonly url: string;
  readonly expected: { title: string };

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.url = 'https://demo.playwright.dev/todomvc';
    this.expected = {
      title: 'React • TodoMVC',
    };
  }

  /**
   * Input text into the Todo field
   * @param {string} todoText the text to type into the field
   */
  async inputTodo (todoText: string): Promise<void> {
    try {
      const newTodo = this.page.getByPlaceholder('What needs to be done?');
      await newTodo.fill(todoText);
      await newTodo.press('Enter');
    } catch (err) {
      throw new Error(`Error while inputting text (${todoText}) into Todo field: ${(err as Error).message}`);
    }
  }

  async clickCheckBox (itemString: string): Promise<void> {
    await this.page.locator(`//label[text() = '${itemString}']/preceding-sibling::input[@type = 'checkbox']`)
      .click();
  }

  async isItemChecked (itemString: string): Promise<boolean> {
    return (await this.page.locator(`//label[text() = '${itemString}']/preceding-sibling::input[@type = 'checkbox']`)
      .isChecked());
  }

  async clickToggleAll (): Promise<void> {
    await this.page.locator('//input[@id = \'toggle-all\']')
      .click();
  }
}
