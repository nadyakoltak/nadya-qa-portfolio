// pages/TechnologyPage.js
import { expect } from '@playwright/test';

export class TechnologyPage {
  constructor(page) {
    this.page = page;
    this.heading = page.locator('strong', { hasText: 'Security Testing for the Technology Industry' });
  }

  async verifyHeroTextVisible() {
    console.log('Verifying page heading text is visible...');
    await expect(this.heading).toBeVisible({ timeout: 10000 });

    console.log('Verifying URL contains /security-testing-for-technology/');
    await expect(this.page).toHaveURL(/security-testing-for-technology/);
  }
}

