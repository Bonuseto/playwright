import { test, type Page } from '@playwright/test';
import { DocumentationPage, Language, Product, Type } from '../documentation-pom/documentation.page';
import { chromium } from 'playwright';

test.describe('Documentation Availability Test', () => {
  let documentationPage: DocumentationPage;
  let browser: any;

  test.beforeEach(async () => {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page: Page = await context.newPage();

    documentationPage = new DocumentationPage(page);
    await documentationPage.goto();
  });

  test('Verify Documentation Availability', async () => {
    await documentationPage.clickButton();
    await documentationPage.testDocPresence(Product.VeeamDataPlatformAdvanced, Type.ProductGuides,
      'Veeam Availability Suite 11', Language.NoChanges, 'https://www.veeam.com/veeam_backup_11_0_user_guide_vsphere_pg.pdf');
  });

  test('Verify Data Platform Essentials 10 in French', async () => {
    await documentationPage.clickButton();
    await documentationPage.testDocPresence(Product.VeeamDataPlatformEssentials, Type.Datasheets,
      'Veeam Backup Essentials 10', Language.French, 'https://www.veeam.com/fr/veeam_essentials_10_0_datasheet_ds.pdf');
  });

  test('Verify ONE 9.5 Update 4 in Italian', async () => {
    await documentationPage.clickButton();
    await documentationPage.testDocPresence(Product.VeeamRecoveryOrchestrator, Type.WhatsNew,
      'Veeam Availability Orchestrator 3.0', Language.French, 'https://www.veeam.com/fr/whats-new-backup-replication.html');
  });

  test('Verify FastSCP', async () => {
    await documentationPage.clickButton();
    await documentationPage.testDocPresence(Product.VeeamFastSCP, Type.ReleaseNotes,
      '', Language.NoChanges, 'https://www.veeam.com/veeam_fastscp_3_0_3_release_notes_rn.pdf');
  });
});
