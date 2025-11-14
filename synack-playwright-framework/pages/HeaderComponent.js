// pages/HeaderComponent.js
export class HeaderComponent {
  constructor(page) {
    this.page = page;

    // Scope to top header container
    this.header = page.locator('#header > div.header-wrap > div.header-holder');

    // "Solutions" span (not a link)
    this.solutionsMenu = this.header.getByText('Solutions', { exact: true });

    // Technology link (scoped only to header)
    this.technologyLink = this.header.locator(
      '.sub-menu a.submenu-link[href="https://www.synack.com/industries/security-testing-for-technology/"]'
    );
  }

  async hoverSolutionsAndOpenTechnology() {
    console.log('Checking for chat widget...');
    const chatFrame = this.page.locator('#q-messenger-frame');
    if (await chatFrame.isVisible()) {
      console.log('Chat widget detected — hiding it temporarily');
      await this.page.evaluate(() => {
        const chat = document.querySelector('#q-messenger-frame');
        if (chat) chat.style.display = 'none';
      });
    }

    console.log('Hovering over Solutions menu...');
    await this.solutionsMenu.hover();

    // Wait for dropdown animation
    await this.page.waitForTimeout(800);

    console.log('Waiting for Technology link...');
    await this.technologyLink.waitFor({ state: 'visible', timeout: 5000 });

    console.log('Clicking Technology link...');
    await this.technologyLink.click({ force: true }); // extra safety
  }
}

