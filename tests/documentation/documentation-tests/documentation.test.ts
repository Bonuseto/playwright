import { test, expect } from '@playwright/test';
import { DocumentationPage, Product, Type } from '../documentation-pom/documentation.page';
import { chromium } from 'playwright';

async function runTestWithRetry(description: string, testFunction: () => Promise<void>, maxRetries: number) {
  let retryCount = 0;
  while (retryCount < maxRetries) {
    try {
      await test(description, async ({}) => {
        await testFunction();
      });
      return; // If the test passes, exit the loop
    } catch (error) {
      retryCount++;
      console.log(`Test failed. Retrying... Attempt ${retryCount}/${maxRetries}`);
    }
  }
  throw new Error(`Test failed after ${maxRetries} retries.`);
}

test.describe('Documentation Availability Test', () => {
  let documentationPage: DocumentationPage;
  let browser: any; // Declare browser outside of beforeEach scope

  test.beforeEach(async () => {
    // Launch Chrome browser
    browser = await chromium.launch({ headless: false }); // or { headless: true } for headless mode
    const context = await browser.newContext();
    const page = await context.newPage();
    
    documentationPage = new DocumentationPage(page);
    await documentationPage.goto();
});

  test('Verify Documentation Availability', async ({}, testInfo) => {
    await documentationPage.clickButton();
    await documentationPage.testDocPresence(Product.VeeamDataPlatformAdvanced, Type.ProductGuides, 
    "Veeam Availability Suite 11", "", "https://www.veeam.com/veeam_backup_11_0_user_guide_vsphere_pg.pdf")
    //testInfo.setTimeout(60000);
  });

});