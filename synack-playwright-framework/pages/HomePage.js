// pages/HomePage.js
import { expect } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;

    // locators
    this.headerMenu = page.locator('#header > div.header-wrap > div.header-holder');
    this.seeDemoButton = page.getByRole('link', { name: /see a demo/i });
  }

  async openHomePage() {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle(/Synack/);
  }

  async verifyHeaderMenuVisible() {
    await expect(this.headerMenu).toBeVisible();
  }

  async verifySeeDemoButtonVisible() {
    await expect(this.seeDemoButton).toBeVisible();
  }
}
