exports.SearchComponent = class SearchComponent {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('#nav-quick-search');
    this.searchButton = page.locator('button.search_button[aria-label="Search Field"]');
  }

  // 👇 async must live inside the class body
  async searchProduct(productName) {
    // Wait for the search input to be ready
    await this.searchInput.waitFor({ state: 'visible', timeout: 5000 });

    // Fill the search term
    await this.searchInput.fill(productName);

    // Check if button exists and is enabled
    const buttonCount = await this.searchButton.count();
    if (buttonCount > 0 && !(await this.searchButton.isDisabled())) {
      console.log('🔍 Clicking the search button');
      await this.searchButton.click();
    } else {
      console.log('⚡ Search triggered automatically, pressing Enter just in case');
      await this.page.keyboard.press('Enter');
    }

    // Wait for results or product list to appear
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
  }
};
