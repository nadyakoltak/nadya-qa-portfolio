export class TechnologyPage {
  constructor(page) {
    this.page = page;

    this.heading = page.locator(
      'strong:has-text("Security Testing for the Technology Industry")'
    );
  }

}



