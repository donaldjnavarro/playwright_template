import { test as base } from "@playwright/test";

export const test = base.extend<{ testHook: void }>({
  testHook: [
    async ({}, use) => {
      // Any code here will be run as a before each hook

      await use();

      // Put any code you want run automatically after each test here
    },
    { auto: true },
  ],
});

// Exporting 'expect' from the base test so you have access in your spec.ts file.
export { expect } from "@playwright/test";
