import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';

test('Homepage UI elements visible', async ({ page }) => {
  const home = new HomePage(page);

  await home.open();

  await expect(home.headerMenu).toBeVisible();
  await expect(home.seeDemoButton).toBeVisible();
});

