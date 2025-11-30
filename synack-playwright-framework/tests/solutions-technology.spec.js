import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { HeaderComponent } from '../pages/HeaderComponent.js';
import { TechnologyPage } from '../pages/TechnologyPage.js';

test('Solutions → Industries → Technology page loads correctly', async ({ page }) => {
  const home = new HomePage(page);
  const header = new HeaderComponent(page);
  const tech = new TechnologyPage(page);

  await home.open();
  await header.openTechnology();
  await tech.verifyHeroTextVisible();
});




