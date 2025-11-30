import { test, expect } from "@playwright/test";

test("Login page enforces HTTPS, HSTS, and Secure cookies", async ({ page }) => {
  // 1. Try loading HTTP version
  const response = await page.goto("http://login.synack.com");

  // Make sure redirect happened
  expect(page.url()).toBe("https://login.synack.com/");

  // 2. Fetch headers
  const headers = response.headers();

  // 3. HSTS validation — critical for preventing downgrade attacks
  expect(headers["strict-transport-security"]).toBeTruthy();

  // 4. Cookie security check
  const cookies = await page.context().cookies();

  for (const cookie of cookies) {
    // Only check cookies for login.synack.com domain
    if (cookie.domain.includes("synack.com")) {
      expect(cookie.secure).toBe(true);
      expect(cookie.httpOnly).toBe(true);
      expect(["Lax", "Strict", "None"]).toContain(cookie.sameSite);
    }
  }

  console.log("HTTPS enforced, HSTS present, cookies secured.");
});
