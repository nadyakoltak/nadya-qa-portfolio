const { test } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { SearchComponent } = require('../pages/SearchComponent');
const { PopupHandler } = require('../utils/popupHandler');

test('Search for a product on Coldwater Creek', async ({ page }) => {
  const homePage = new HomePage(page);
  const popupHandler = new PopupHandler(page);
  const searchComponent = new SearchComponent(page);

  await homePage.openHomePage();
  await popupHandler.closeIfVisible();
  await searchComponent.searchProduct('Sweater');
});


