// pages/documentation.page.ts

import { Page, expect } from '@playwright/test';

export enum Product {
  NoChanges = "",
  AllProducts = "All Products",
  VeeamDataPlatform = "Veeam Data Platform",
  VeeamDataPlatformAdvanced = "Veeam Data Platform Advanced",
  VeeamDataPlatformEssentials = "Veeam Data Platform Essentials",
  VeeamBackupAndReplication = "Veeam Backup & Replication",
  VeeamDataCloudforMicrosoft365 = "Veeam Data Cloud for Microsoft 365",
  VeeamDataCloudforMicrosoftAzure = "Veeam Data Cloud for Microsoft Azure",
  VeeamBackupforMicrosoft365 = "Veeam Backup for Microsoft 365",
  VeeamBackupforSalesforce = "Veeam Backup for Salesforce",
  VeeamONE = "Veeam ONE",
  VeeamServiceProviderConsole = "Veeam Service Provider Console",
  VeeamAgentforMicrosoftWindows = "Veeam Agent for Microsoft Windows",
  VeeamAgentforLinux = "Veeam Agent for Linux",
  VeeamBackupforNutanixAHV = "Veeam Backup for Nutanix AHV",
  VeeamBackupforAWS = "Veeam Backup for AWS",
  VeeamBackupforMicrosoftAzure = "Veeam Backup for Microsoft Azure",
  VeeamBackupforGoogleCloud = "Veeam Backup for Google Cloud",
  VeeamBackupforRedHatVirtualization = "Veeam Backup for Red Hat Virtualization",
  VeeamManagementPackforMicrosoftSystemCenter = "Veeam Management Pack for Microsoft System Center",
  VeeamRecoveryOrchestrator = "Veeam Recovery Orchestrator",
  VeeamAgentforMac = "Veeam Agent for Mac",
  VeeamAgentforIBMAIX = "Veeam Agent for IBM AIX",
  VeeamAgentforOracleSolaris = "Veeam Agent for Oracle Solaris",
  VeeamServiceProviderConsolefortheEnterprise = "Veeam Service Provider Console for the Enterprise",
  NutanixMinewithVeeam = "Nutanix Mine with Veeam",
  KastenK10byVeeam = "Kasten K10 by Veeam",
  Freetools = "Free tools",
  VeeamBackupAndReplicationCommunityEdition = "Veeam Backup & Replication Community Edition",
  VeeamAgentforMicrosoftWindowsFREE = "Veeam Agent for Microsoft Windows FREE",
  VeeamAgentforLinuxFREE = "Veeam Agent for Linux FREE",
  VeeamBackupforMicrosoft365CommunityEdition = "Veeam Backup for Microsoft 365 Community Edition",
  VeeamBackupforSalesforceCommunityEdition = "Veeam Backup for Salesforce Community Edition",
  VeeamONECommunityEdition = "Veeam ONE Community Edition",
  VeeamTaskManagerforHyperV = "Veeam Task Manager for Hyper-V",
  VeeamReportLibraryforMicrosoftSystemCenter = "Veeam Report Library for Microsoft System Center",
  VeeamFastSCPforMicrosoftAzure = "Veeam FastSCP for Microsoft Azure",
  VeeamFastSCP = "Veeam FastSCP",
  AddonsAndPlugins = "Add-ons & Plug-ins"
}

export enum Type {
  NoChanges = "",
  AllTypes = "All types",
  ProductGuides = "Product guides",
  Datasheets = "Datasheets",
  ReleaseNotes = "Release notes",
  WhatsNew = "What's new",
  Other = "Other"
}

export enum Language {
  NoChanges = "",
  English = "English",
  German = "Deutsch",
  French = "Français",
  Italian = "Italiano",
  Dutch = "Nederlands",
  Turkish = "Türkçe",
  Czech = "Česky",
  Polish = "Polski",
  Spanish_Spain = "Español (España)",
  Spanish_LatinAmerica = "Español (Latinoamérica)",
  Portuguese_Brazil = "Português (Brasil)",
  Chinese_Simplified = "中文（简体）",
  Japanese = "日本語",
  Korean = "한국어",
  Russian = "Русский",
  Chinese_HongKong_Macau_Traditional = "中文（香港/澳門繁體)",
  Chinese_Traditional = "中文（繁體）",
  Thai = "ไทย",
  Vietnamese = "Tiếng Việt"
}


export class DocumentationPage {
    private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.veeam.com/documentation-guides-datasheets.html?productId=8&version=product%3A8%2F221');
    await this.page.waitForLoadState();
  }

  async clickButton() {
    await this.page.click("#cookiescript_accept");
  }

  async clickOnComboboxWithLabelText(labelText: string, value: string) {
    const comboboxSelector = `div[aria-label="Combobox"] > span.form-label:has-text("${labelText}")`;
    const combobox = await this.page.locator(comboboxSelector);

    //const comboboxSelectorInside = `div.ss-option[role="option"]:has-text("${value}")`;
    //const comboboxInside = await this.page.getByText(value, {exact: true});
    const comboboxInside = await this.page.getByRole('option', { name: value, exact: true })
    

    
    


    if (combobox && comboboxInside) {
        // Click on the parent div
        await this.page.waitForSelector(comboboxSelector, { state: 'visible' });
        await combobox.click();
        //(await this.page.waitForSelector(comboboxInside)).waitForElementState("visible");
        await comboboxInside.click();
    } else {
        throw new Error(`Combobox with label text "${labelText}" not found.`);
    }
}

async checkLink(expectedUrl: string){
  await this.page.waitForTimeout(3000); 
  await this.page.mouse.move(0, 100)

  // Locate the table containing the links
const tableLocator = await this.page.locator('.veeam-table-wrapper table');

// Ensure the table is found
if (!tableLocator) {
    throw new Error('Table not found.');
}

// Locate the first link within the table
const firstLinkLocator = await tableLocator.locator('a[href^="https://www.veeam.com/"]');

// Ensure the link is found
if (!firstLinkLocator) {
    throw new Error('First link not found within the table.');
}

// Click the first link
await this.page.mouse.move(0, 100)
    await this.page.waitForTimeout(2000);
    await this.page.mouse.move(100, 0)
await firstLinkLocator.first().click();

    const newPage = await this.page.waitForEvent('popup');

    await newPage.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
  });


  // Get the current URL after clicking the link
  const currentURL = newPage.url();
  await this.page.waitForTimeout(5000);

  // Verify if the current URL matches the expected download URL

  //const expectedLink = "https://www.veeam.com/fr/whats-new-backup-replication.html"
  expect(currentURL).toBe(expectedUrl);
  


}

  async selectProduct(product: Product) {
    await this.page.mouse.move(0, 100)
    //await this.page.waitForTimeout(3000); 
    await this.clickOnComboboxWithLabelText("Product:", product);
  }

  async selectType(type: string) {
    await this.page.mouse.move(0, 100)
    await this.page.waitForTimeout(1000); 
    await this.clickOnComboboxWithLabelText("Type:", type);
}

  async selectVersion(version: string) {
    await this.page.mouse.move(0, 100)
    await this.page.waitForTimeout(1000); 
    await this.clickOnComboboxWithLabelText("Version:", version);
}

  async selectLanguage(language: string) {
    await this.page.mouse.move(0, 100)
    await this.page.waitForTimeout(1000); 
    await this.clickOnComboboxWithLabelText("Language:", language);
}

async testDocPresence(
  product: Product, 
  type: string = "", 
  version: string = "", 
  language: string = "", 
  expectedUrl: string
) {
  if (product) {
      await this.selectProduct(product);
  }
  if (type) {
      await this.selectType(type);
  }
  if (version) {
      await this.selectVersion(version);
  }
  if (language) {
      await this.selectLanguage(language);
  }
  await this.checkLink(expectedUrl);
}

//   async documentationExists(): Promise<boolean> {
//     const pageContent = await this.page.textContent('html');
//     return pageContent !== null && pageContent.includes('User Guide');
// }

}