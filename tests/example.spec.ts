import { test, expect } from '../hooks.ts';
import { PlaywrightDevPage } from './../page_object_models/playwright_dev_page';
import { PlaywrightIntroPage } from './../page_object_models/playwright_intro_page.ts';
import { PlaywrightTodoPage } from './../page_object_models/playwright_todo_page.ts';

test.describe('Playwright Home Page', { tag: ['@playwrightHomePage'] }, () => {

  /** Background actions */
  test.beforeEach(async ({ page }) => {
    const devPage = new PlaywrightDevPage(page);
    await page.goto(devPage.url);
  });

  test('Landing page has title', { tag: '@exampleTitle' }, async ({ page }) => {
    const devPage = new PlaywrightDevPage(page);
    await expect(page, 'Verifying web browser tab title')
      .toHaveTitle(devPage.expected.title);
  });

  test('Using the Get Started link', { tag: '@exampleLink' }, async ({ page }) => {
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

  test('Global header search field with invalid input', { tag: ['@exampleValidation']}, async ({ page }) => {
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

test.describe('List functionality examples', { tag: ['@exampleTodos'] }, () => {

  /** Background actions */
  test.beforeEach(async ({ page }) => {
    const todoPage = new PlaywrightTodoPage(page);
    await page.goto(todoPage.url);
  });

  const TODO_ITEMS = [
    'buy some cheese',
    'feed the cat',
    'book a doctors appointment'
  ] as const;

  test('Input items in text fields', { tag: '@exampleInput', }, async ({ page }) => {
    const todoPage = new PlaywrightTodoPage(page);

    /** Input an item to the list */
    await todoPage.inputTodo(TODO_ITEMS[0]);

    /** Verify the list has the input item */
    let currentList = await page.getByTestId('todo-title').allTextContents();
    expect(currentList, 'Expect the list to have the input item')
      .toEqual([
        TODO_ITEMS[0]
      ]);

    /** Input a second item to the list */
    await todoPage.inputTodo(TODO_ITEMS[1]);

    /** Verify the list has all input items */
    currentList = await page.getByTestId('todo-title').allTextContents();
    expect(currentList, 'Expect the list to have all input items')
      .toEqual([
        TODO_ITEMS[0],
        TODO_ITEMS[1]
      ]);
  });

  test('Text input field is cleared after an item is added', { tag: ['@exampleInputReset'] }, async ({ page }) => {
    const todoPage = new PlaywrightTodoPage(page);

    /** Verify text input box is editable */
    const textInput = page.getByPlaceholder('What needs to be done?');
    await expect(textInput, 'Expect text input box to be editable')
      .toBeEditable();

    /** Verify the text input box can be used again after it has been used */
    await todoPage.inputTodo(TODO_ITEMS[0]);
    await expect(textInput, 'Expect text input box to be cleared after submission')
      .toBeEmpty();
    await expect(textInput, 'Expect text input box to be editable after submission')
      .toBeEditable();
  });
});

test.describe('Checkbox functionality examples', { tag: ['@exampleCheckboxes']}, () => {

  /** Background actions */
  test.beforeEach(async ({ page }) => {
    const todoPage = new PlaywrightTodoPage(page);
    await page.goto(todoPage.url);
  });

  const TODO_ITEMS = [
    'buy some cheese',
    'feed the cat',
    'book a doctors appointment'
  ] as const;

  test('Checkboxes can be toggled', { tag: ['@exampleCheckbox'] }, async ({ page }) => {
    const todoPage = new PlaywrightTodoPage(page);

    /** Input an item to the list */
    await todoPage.inputTodo(TODO_ITEMS[0]);
    await todoPage.inputTodo(TODO_ITEMS[1]);
    await todoPage.inputTodo(TODO_ITEMS[2]);

    /** Verify the list has the input item */
    const currentList = await page.getByTestId('todo-title').allTextContents();
    expect(currentList, 'Expect the list to have the input item')
      .toEqual([
        TODO_ITEMS[0],
        TODO_ITEMS[1],
        TODO_ITEMS[2]
      ]);

    /** Check the first checkbox */
    await todoPage.clickCheckBox(TODO_ITEMS[0]);
    expect(await todoPage.isItemChecked(TODO_ITEMS[0]))
      .toBeTruthy();

    /** Uncheck the first checkbox */
    await todoPage.clickCheckBox(TODO_ITEMS[0]);
    expect(await todoPage.isItemChecked(TODO_ITEMS[0]))
      .toBeFalsy();

    /** Check the second checkbox */
    await todoPage.clickCheckBox(TODO_ITEMS[1]);
    expect(await todoPage.isItemChecked(TODO_ITEMS[1]))
      .toBeTruthy();

    /** Uncheck the second checkbox */
    await todoPage.clickCheckBox(TODO_ITEMS[1]);
    expect(await todoPage.isItemChecked(TODO_ITEMS[1]))
      .toBeFalsy();

    /** Check the third checkbox */
    await todoPage.clickCheckBox(TODO_ITEMS[2]);
    expect(await todoPage.isItemChecked(TODO_ITEMS[2]))
      .toBeTruthy();

    /** Uncheck the third checkbox */
    await todoPage.clickCheckBox(TODO_ITEMS[2]);
    expect(await todoPage.isItemChecked(TODO_ITEMS[2]))
      .toBeFalsy();

  });

  test('Toggle all button toggles all checkboxes', { tag: ['@exampleSelectAll', '@debug'] }, async ({ page }) => {
    const todoPage = new PlaywrightTodoPage(page);

    /** Input an item to the list */
    await todoPage.inputTodo(TODO_ITEMS[0]);
    await todoPage.inputTodo(TODO_ITEMS[1]);
    await todoPage.inputTodo(TODO_ITEMS[2]);

    /** Verify the list has the input item */
    const currentList = await page.getByTestId('todo-title').allTextContents();
    expect(currentList, 'Expect the list to have the input item')
      .toEqual([
        TODO_ITEMS[0],
        TODO_ITEMS[1],
        TODO_ITEMS[2]
      ]);

    /** Toggle all checkboxes ON */
    await todoPage.clickToggleAll();
    expect(await todoPage.isItemChecked(TODO_ITEMS[0]))
      .toBeTruthy();
    expect(await todoPage.isItemChecked(TODO_ITEMS[1]))
      .toBeTruthy();
    expect(await todoPage.isItemChecked(TODO_ITEMS[2]))
      .toBeTruthy();

    /** Toggle all checkboxes OFF */
    await todoPage.clickToggleAll();
    expect(await todoPage.isItemChecked(TODO_ITEMS[0]))
      .toBeFalsy();
    expect(await todoPage.isItemChecked(TODO_ITEMS[1]))
      .toBeFalsy();
    expect(await todoPage.isItemChecked(TODO_ITEMS[2]))
      .toBeFalsy();
  });
});
