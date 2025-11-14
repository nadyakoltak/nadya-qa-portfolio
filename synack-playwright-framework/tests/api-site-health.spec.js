// tests/api-site-health.spec.js
import { test, expect } from '@playwright/test';

test.describe('Synack Site Health Checks', () => {

  test('Homepage responds with status 200 and loads fast', async ({ request }) => {
    const start = Date.now();

    const response = await request.get('https://www.synack.com/');
    const duration = Date.now() - start;

    // Verify the site is up
    expect(response.status()).toBe(200);

    // Verify page contains key text (brand)
    const body = await response.text();
    expect(body).toContain('Synack');

    // Log load time
    console.log(`🌐 Response time: ${duration}ms`);

    // Performance check (less than 2 seconds)
    const EXP_LATENCY = 2000;
    expect(duration).toBeLessThan(EXP_LATENCY);
  });

  test('Blog page responds with status 200', async ({ request }) => {
    const response = await request.get('https://www.synack.com/blog/');
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain('Blog');
  });

  test('Contact page responds with status 200', async ({ request }) => {
    const response = await request.get('https://www.synack.com/contact/');
    expect(response.status()).toBe(200);
  });

});
