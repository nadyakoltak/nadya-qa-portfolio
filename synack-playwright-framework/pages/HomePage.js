import { expect } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.headerMenu = page.locator('header .header-holder');
    this.seeDemoButton = page.getByRole('link', { name: /request a demo/i });
  }

  async open() {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle(/Synack/i);
  }

  async verifyHeaderMenuVisible() {
    await expect(this.headerMenu).toBeVisible();
  }

  async verifySeeDemoButtonVisible() {
    await expect(this.seeDemoButton).toBeVisible();
  }
}

