import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage.js";
import { HeaderComponent } from "../components/HeaderComponent.js";
import { TechnologyPage } from "../pages/TechnologyPage.js";

test("Solutions → Industries → Technology page loads correctly", async ({
  page,
}) => {
  const home = new HomePage(page);
  const header = new HeaderComponent(page);
  const tech = new TechnologyPage(page);

  await home.open();
  await header.openTechnology();

  await expect(tech.heading).toBeVisible({ timeout: 10000 });
  await expect(page).toHaveURL(/security-testing-for-technology/);
});
