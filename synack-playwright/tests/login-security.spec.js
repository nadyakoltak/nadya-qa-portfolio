import { test, expect } from "@playwright/test";

test("Password field is masked and autocomplete is disabled", async ({ page }) => {
  await page.goto("https://login.synack.com/");

  const emailField = page.locator('input[name="username"], input[type="email"]');
  const passwordField = page.locator('input[name="password"]');

  await expect(passwordField).toHaveAttribute("type", "password");
  await passwordField.fill("MySuperSecret123!");
  const text = await passwordField.inputValue();
  expect(text).toBe("MySuperSecret123!");

  // const autocompleteValue = await passwordField.getAttribute("autocomplete");
  // expect(["off", "new-password", "nope"]).toContain(autocompleteValue);
  const autocompleteValue = await passwordField.getAttribute("autocomplete");
  expect(autocompleteValue).toBe("on"); // EXPECTED TO FAIL — used for your demo

  // const emailAutocomplete = await emailField.getAttribute("autocomplete");
  // expect(["off", "username", "email", "new-password", "nope"]).toContain(emailAutocomplete);
  const emailAutocomplete = await emailField.getAttribute("autocomplete");
  expect(emailAutocomplete).toBe("on"); // EXPECTED TO FAIL


  console.log("Test executed for interview demo, autocomplete expected to fail if the toggle is OFF");
});
