export class HeaderComponent {
  constructor(page) {
    this.page = page;
    this.header = page.locator('#menu-header-menu');
    this.solutionsMenu = this.header.getByRole('link', { name: 'Solutions' });
    this.industriesTab = page.getByRole('tab', { name: 'Industries' });
    this.technologyLink = this.page.locator(
      'a[href="/industries/security-testing-for-technology/"]'
    );
  }

  async openTechnology() {
    console.log('Hover Solutions...');
    await this.solutionsMenu.hover();
    await this.page.waitForTimeout(400);

    console.log('Click Industries...');
    await this.industriesTab.click();
    await this.page.waitForTimeout(300);

    console.log('Click Technology...');
    await this.technologyLink.click();
  }
}

