const { expect } = require('@playwright/test');

exports.ProductPage = class ProductPage {
  constructor(page) {
    this.page = page;

    // 🧭 Navigation locators
    this.clothingMenu = page.getByRole('link', { name: 'Clothing', exact: true });
    this.tunicsLink = page.locator('a[href="/clothing/tunics"]');

    // 🛍️ Product list locators
    this.firstProductCard = page.locator('.ss_results-wrapper .product-card-top-wrapper').first();

    // 👕 Product detail locators
    this.sizeSOption = page.locator('div[data-size="S"] input[type="radio"]');
    this.addToBagButton = page.locator('button#form-action-addToCart-no-options');

    // 💳 Checkout locators
    this.checkoutButton = page.locator('.modal-body a[href="/checkout"]');
  }

  // Step 1: navigate to Clothing → Tunics
  async navigateToTunics() {
    await this.page.waitForLoadState('networkidle');
    await this.clothingMenu.click();
    await this.tunicsLink.waitFor({ state: 'visible', timeout: 5000 });
    await this.tunicsLink.click();
    console.log('🛍️ Navigated to Tunics page');
  }

  // Step 2: select the first product
  async selectFirstProduct() {
    await this.page.waitForSelector('.ss_results-wrapper', { timeout: 10000 });
    await this.firstProductCard.scrollIntoViewIfNeeded();
    await this.firstProductCard.click({ force: true });
    console.log('👕 Selected first product');
    await this.page.waitForLoadState('networkidle');
  }

  // Step 3: select size S
  async selectSizeS() {
    await this.sizeSOption.waitFor({ state: 'visible', timeout: 8000 });
    await this.sizeSOption.scrollIntoViewIfNeeded();
    await this.sizeSOption.check({ force: true });
    console.log('📏 Selected size S');
  }

  // Step 4: add to cart
async addToCart() {
  console.log('🛒 Trying to add product to bag...');

  // The real button that appears after selecting a size
  const realAddToBag = this.page.locator('input#form-action-addToCart.all-options-selected');

  // Wait until it's visible and enabled
  await realAddToBag.waitFor({ state: 'visible', timeout: 10000 });
  await expect(realAddToBag).toBeEnabled();

  // Click it with force in case any overlays or animations block it
  await realAddToBag.click({ force: true });
  console.log('🛒 Clicked real Add to Bag button');

  // Wait for spinner to finish and network requests to settle
  await this.page.waitForLoadState('networkidle', { timeout: 10000 });
  await this.page.waitForTimeout(1500); // give the site a moment to render mini-cart if it will
  console.log('✅ Add to Bag submitted — waiting for mini cart...');
}


  // Step 5: proceed to checkout
async proceedToCheckout() {
  console.log('🕒 Waiting for mini cart (checkout popup)...');

  const miniCartModal = this.page.locator('#previewModal .modal-content, #modal .modal-content');
  const bagButton = this.page.locator('.navUser-item-cart .navUser-action');
  
  try {
    // Try to detect the mini-cart popup
    await miniCartModal.waitFor({ state: 'visible', timeout: 8000 });
    console.log('🛍️ Mini cart popup appeared!');

    const checkoutButton = miniCartModal.locator(
      'a[href*="/checkout"], button:has-text("Checkout"), input[value*="Checkout"]'
    );
    await checkoutButton.first().click({ force: true });
    console.log('🚀 Proceeded to checkout from mini cart');

  } catch {
    console.warn('⚠️ Mini cart not found — clicking Bag icon instead...');
    await bagButton.click({ force: true });
    await this.page.waitForTimeout(2000); // give mini cart a moment to appear

    // If that still doesn’t show the modal, go straight to cart page
    const stillNoModal = await miniCartModal.count() === 0;
    if (stillNoModal) {
      console.warn('⚠️ Still no mini cart — navigating directly to cart.php...');
      await this.page.goto('/cart.php', { waitUntil: 'networkidle' });
    }

    // Find and click Checkout button (either from modal or cart page)
    const checkoutButton = this.page.locator(
      'a[href*="/checkout"], button:has-text("Checkout"), input[value*="Checkout"]'
    );
    await checkoutButton.first().click({ force: true });
    console.log('🚀 Proceeded to checkout successfully');
  }

  await this.page.waitForLoadState('networkidle');
}


  // Step 6: verify checkout page
  async verifyCheckoutPage() {
    await expect(this.page.getByText('Customer')).toBeVisible({ timeout: 15000 });
    await expect(this.page.getByText('Shipping')).toBeVisible();
    await expect(this.page.getByText('Billing')).toBeVisible();
    await expect(this.page.getByText('Payment')).toBeVisible();
    console.log('✅ Checkout page verified');
  }
};

