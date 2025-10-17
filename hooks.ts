import { test as base } from "@playwright/test";

export const test = base.extend<{ testHook: void }>({
  testHook: [
    async ({}, use) => {
      await use();
    },
    { auto: true },
  ],
});

// // After each hook to log test info for all tests
// test.afterEach(async ({}, testInfo) => {
//   console.log('Test status:', testInfo.status);
//   console.log('Output directory:', testInfo.outputDir);

//   // Loop through attachments to find trace(s)
//   for (const attachment of testInfo.attachments) {
//     if (attachment.name === 'trace' && attachment.path) {
//       console.log('Trace available at:', attachment.path);
//       // Optionally do something with it here, e.g., copy, archive, or report
//     }
//   }
// });

export { expect } from "@playwright/test";

