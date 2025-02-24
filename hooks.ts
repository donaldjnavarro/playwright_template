import { test as base } from "@playwright/test";

export const test = base.extend<{ testHook: void }>({
  testHook: [
    // eslint-disable-next-line no-empty-pattern
    async ({}, use) => {
        //   console.log("BEFORE EACH HOOK FROM FIXTURE");
        // Any code here will be run as a before each hook

        await use();

        //   console.log("AFTER EACH HOOK FROM FIXTURE");
        // Put any code you want run automatically after each test here
    },
    { auto: true },
  ],
});

// Exporting 'expect' from the base test so you have access in your spec.ts file.
export { expect } from "@playwright/test"; 