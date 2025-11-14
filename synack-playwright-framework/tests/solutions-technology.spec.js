import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { HeaderComponent } from '../pages/HeaderComponent.js';
import { TechnologyPage } from '../pages/TechnologyPage.js';

test('Hover Solutions/Click Technology/Verify Technology page heading', async ({ page }) => {
  const home = new HomePage(page);
  const header = new HeaderComponent(page);
  const tech = new TechnologyPage(page);

  await home.openHomePage();
  await header.hoverSolutionsAndOpenTechnology();
  await tech.verifyHeroTextVisible();
});

