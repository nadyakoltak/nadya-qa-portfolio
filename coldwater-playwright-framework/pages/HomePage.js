const { expect } = require('@playwright/test');

exports.HomePage = class HomePage {
  constructor(page) {
    this.page = page;
  }

  async openHomePage() {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle(/Coldwater Creek/);
  }
};
