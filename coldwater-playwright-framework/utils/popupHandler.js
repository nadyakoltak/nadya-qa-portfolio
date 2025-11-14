exports.PopupHandler = class PopupHandler {
  constructor(page) {
    this.page = page;

    // 🍪 Cookie banner (OneTrust)
    this.cookieCloseButton = page.locator(
      '#onetrust-banner-sdk button.onetrust-close-btn-handler'
    );

    // 🪟 Marketing popup (iframe-based)
    this.offerFrame = page.frameLocator('iframe[id^="fcopt-offer-"][id$="-content"]');
    this.offerCloseButton = this.offerFrame.locator(
      'button[aria-label*="Close"], button:has-text("X"), [data-close-promo], .close'
    );
  }

  async closeIfVisible() {
    // Step 1: wait a moment for popups to appear
    await this.page.waitForTimeout(1500);

    // 🍪 Step 2: Cookie banner
    try {
      if (await this.cookieCloseButton.isVisible()) {
        await this.cookieCloseButton.click({ force: true });
        console.log("🍪 Cookie banner closed");
        await this.page.waitForTimeout(800);
      }
    } catch {
      console.log("No cookie banner appeared");
    }

    // 🪟 Step 3: Marketing popup (iframe)
    try {
      if (await this.offerCloseButton.isVisible({ timeout: 5000 })) {
        await this.offerCloseButton.click({ force: true });
        console.log("✅ Marketing popup closed (iframe)");
        await this.page.waitForTimeout(800);
      }
    } catch (err) {
      console.log("⚠️ Could not close marketing popup:", err.message);
    }

    // 🧊 Step 4: DOM-based popup (body id='site_coldwater')
    try {
      const bodyId = await this.page.evaluate(() => document.body.id);
      if (bodyId === "site_coldwater") {
        console.log("🧊 Detected site_coldwater popup, trying to close...");

        // 1️⃣ Try close button inside visible popup region only
        const domPopupRegion = this.page.locator('body#site_coldwater');
        const domCloseButton = domPopupRegion.locator(
          'button[aria-label="Close"], .offer-control.close, button:has-text("X"), [title="Close"]'
        );

        if (await domCloseButton.first().isVisible({ timeout: 1500 })) {
          await domCloseButton.first().click({ force: true });
          console.log("✅ DOM popup closed with button");
        } else {
          // 2️⃣ If no visible button, click outside popup area
          console.log("⚙️ No visible close button — clicking outside overlay...");
          await this.page.mouse.click(50, 50, { delay: 100 }); // corner click
          await this.page.waitForTimeout(500);

          // 3️⃣ If still not closed, send Escape key
          const stillHasOverlay = await this.page.evaluate(
            () => document.body.id === "site_coldwater"
          );
          if (stillHasOverlay) {
            console.log("⌨️ Overlay still visible — sending Escape key...");
            await this.page.keyboard.press("Escape");
          }

          console.log("✅ DOM popup closed by fallback actions");
        }

        await this.page.waitForTimeout(800);
      }
    } catch (err) {
      console.log("⚠️ DOM popup check skipped:", err.message);
    }
  }

  async tryCloseAgain() {
    try {
      await this.closeIfVisible();
    } catch (err) {
      console.log("⚠️ Popup check skipped:", err.message);
    }
  }
};





