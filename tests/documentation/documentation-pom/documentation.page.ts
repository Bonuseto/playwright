/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Page, expect } from '@playwright/test';

export enum Product {
  NoChanges = '',
  AllProducts = 'All Products',
  VeeamDataPlatform = 'Veeam Data Platform',
  VeeamDataPlatformAdvanced = 'Veeam Data Platform Advanced',
  VeeamDataPlatformEssentials = 'Veeam Data Platform Essentials',
  VeeamBackupAndReplication = 'Veeam Backup & Replication',
  VeeamDataCloudforMicrosoft365 = 'Veeam Data Cloud for Microsoft 365',
  VeeamDataCloudforMicrosoftAzure = 'Veeam Data Cloud for Microsoft Azure',
  VeeamBackupforMicrosoft365 = 'Veeam Backup for Microsoft 365',
  VeeamBackupforSalesforce = 'Veeam Backup for Salesforce',
  VeeamONE = 'Veeam ONE',
  VeeamServiceProviderConsole = 'Veeam Service Provider Console',
  VeeamAgentforMicrosoftWindows = 'Veeam Agent for Microsoft Windows',
  VeeamAgentforLinux = 'Veeam Agent for Linux',
  VeeamBackupforNutanixAHV = 'Veeam Backup for Nutanix AHV',
  VeeamBackupforAWS = 'Veeam Backup for AWS',
  VeeamBackupforMicrosoftAzure = 'Veeam Backup for Microsoft Azure',
  VeeamBackupforGoogleCloud = 'Veeam Backup for Google Cloud',
  VeeamBackupforRedHatVirtualization = 'Veeam Backup for Red Hat Virtualization',
  VeeamManagementPackforMicrosoftSystemCenter = 'Veeam Management Pack for Microsoft System Center',
  VeeamRecoveryOrchestrator = 'Veeam Recovery Orchestrator',
  VeeamAgentforMac = 'Veeam Agent for Mac',
  VeeamAgentforIBMAIX = 'Veeam Agent for IBM AIX',
  VeeamAgentforOracleSolaris = 'Veeam Agent for Oracle Solaris',
  VeeamServiceProviderConsolefortheEnterprise = 'Veeam Service Provider Console for the Enterprise',
  NutanixMinewithVeeam = 'Nutanix Mine with Veeam',
  KastenK10byVeeam = 'Kasten K10 by Veeam',
  Freetools = 'Free tools',
  VeeamBackupAndReplicationCommunityEdition = 'Veeam Backup & Replication Community Edition',
  VeeamAgentforMicrosoftWindowsFREE = 'Veeam Agent for Microsoft Windows FREE',
  VeeamAgentforLinuxFREE = 'Veeam Agent for Linux FREE',
  VeeamBackupforMicrosoft365CommunityEdition = 'Veeam Backup for Microsoft 365 Community Edition',
  VeeamBackupforSalesforceCommunityEdition = 'Veeam Backup for Salesforce Community Edition',
  VeeamONECommunityEdition = 'Veeam ONE Community Edition',
  VeeamTaskManagerforHyperV = 'Veeam Task Manager for Hyper-V',
  VeeamReportLibraryforMicrosoftSystemCenter = 'Veeam Report Library for Microsoft System Center',
  VeeamFastSCPforMicrosoftAzure = 'Veeam FastSCP for Microsoft Azure',
  VeeamFastSCP = 'Veeam FastSCP',
  AddonsAndPlugins = 'Add-ons & Plug-ins'
}

export enum Type {
  NoChanges = '',
  AllTypes = 'All types',
  ProductGuides = 'Product guides',
  Datasheets = 'Datasheets',
  ReleaseNotes = 'Release notes',
  WhatsNew = "What's new",
  Other = 'Other'
}

export enum Language {
  NoChanges = '',
  English = 'English',
  German = 'Deutsch',
  French = 'Français',
  Italian = 'Italiano',
  Dutch = 'Nederlands',
  Turkish = 'Türkçe',
  Czech = 'Česky',
  Polish = 'Polski',
  Spanish_Spain = 'Español (España)',
  Spanish_LatinAmerica = 'Español (Latinoamérica)',
  Portuguese_Brazil = 'Português (Brasil)',
  Chinese_Simplified = '中文（简体）',
  Japanese = '日本語',
  Korean = '한국어',
  Russian = 'Русский',
  Chinese_HongKong_Macau_Traditional = '中文（香港/澳門繁體)',
  Chinese_Traditional = '中文（繁體）',
  Thai = 'ไทย',
  Vietnamese = 'Tiếng Việt'
}

export class DocumentationPage {
  private readonly page: Page;

  constructor (page: Page) {
    this.page = page;
  }

  async goto () {
    await this.page.goto('https://www.veeam.com/documentation-guides-datasheets.html?productId=8&version=product%3A8%2F221');
    await this.page.waitForLoadState();
  }

  async clickButton () {
    await this.page.click('#cookiescript_accept');
  }

  async clickOnComboboxWithLabelText (labelText: string, value: string) {
    await this.page.waitForTimeout(2000);

    const combobox = this.page.locator(`div[aria-label="Combobox"] > span.form-label:has-text("${labelText}")`);
    await combobox.waitFor({ state: 'visible' });
    await combobox.click();

    const valueInSelector = this.page.getByRole('option').getByText(value, { exact: true });
    await valueInSelector.waitFor({ state: 'visible' });
    await valueInSelector.click();
  }

  async checkLink (expectedUrl: string) {
    const tableLocator = this.page.locator('.veeam-table-wrapper table');
    const firstLinkLocator = tableLocator.locator('a[href^="https://www.veeam.com/"]');

    // await firstLinkLocator.waitFor({ state: 'attached' });

    // await this.page.mouse.move(0, 100);
    await this.page.waitForTimeout(1000);
    await firstLinkLocator.first().click();

    const newPage = await this.page.waitForEvent('popup');

    await newPage.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });

    const currentURL = newPage.url();
    expect(currentURL).toBe(expectedUrl);
  }

  async selectProduct (product: Product) {
    await this.clickOnComboboxWithLabelText('Product:', product);
  }

  async selectType (type: Type) {
    await this.clickOnComboboxWithLabelText('Type:', type);
  }

  async selectVersion (version: string) {
    await this.clickOnComboboxWithLabelText('Version:', version);
  }

  async selectLanguage (language: Language) {
    await this.clickOnComboboxWithLabelText('Language:', language);
  }

  async testDocPresence (
    product: Product,
    type: Type,
    version: string,
    language: Language,
    expectedUrl: string
  ) {
    if (product !== '') {
      await this.selectProduct(product);
    }
    if (type !== '') {
      await this.selectType(type);
    }
    if (version !== '') {
      await this.selectVersion(version);
    }
    if (language !== '') {
      await this.selectLanguage(language);
    }
    await this.checkLink(expectedUrl);
  }
}
