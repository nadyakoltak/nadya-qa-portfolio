const { test } = require('@playwright/test');
const { PopupHandler } = require('../utils/popupHandler');
const { ProductPage } = require('../pages/ProductPage');

test('End-to-end: Add Tunic to Cart and Go to Checkout', async ({ page }) => {
  const popupHandler = new PopupHandler(page);
  const productPage = new ProductPage(page);

  // Step 1: Home
  await page.goto('/');
  await popupHandler.closeIfVisible();

  // Step 2: Clothing → Tunics
  await productPage.navigateToTunics();
  await popupHandler.tryCloseAgain();  // 👈 check for popup again

  // Step 3: First product
  await productPage.selectFirstProduct();
  await popupHandler.tryCloseAgain();  // 👈 popup may reappear on product page

  // Step 4–7 as before
  await productPage.selectSizeS();
  await productPage.addToCart();
  await popupHandler.tryCloseAgain();  // 👈 sometimes shows after adding to cart
  await productPage.proceedToCheckout();
  await productPage.verifyCheckoutPage();
});

