import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';

test('Verify Synack homepage header and See a Demo button', async ({ page }) => {
  const home = new HomePage(page);

  await home.openHomePage();
  await home.verifyHeaderMenuVisible();
  await home.verifySeeDemoButtonVisible();
});

