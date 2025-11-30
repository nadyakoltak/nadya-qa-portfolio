import { expect } from '@playwright/test';

export class TechnologyPage {
  constructor(page) {
    this.page = page;

    this.heading = page.locator(
      'strong:has-text("Security Testing for the Technology Industry")'
    );
  }

  async verifyHeroTextVisible() {
    await expect(this.heading).toBeVisible({ timeout: 10000 });
    await expect(this.page).toHaveURL(/security-testing-for-technology/);
  }
}


