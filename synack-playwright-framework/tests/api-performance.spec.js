// tests/api-performance.spec.js
import { test, expect } from '@playwright/test';

test('Measure homepage performance', async ({ request }) => {
  const iterations = 5;
  let total = 0;

  for (let i = 1; i <= iterations; i++) {
    const start = Date.now();
    const response = await request.get('https://www.synack.com/');
    const duration = Date.now() - start;
    console.log(`⏱️ Run ${i}: ${duration}ms`);
    total += duration;

    expect(response.status()).toBe(200);
  }

  const avg = total / iterations;
  console.log(`⚡ Average response time over ${iterations} runs: ${avg.toFixed(2)}ms`);

  expect(avg).toBeLessThan(1500); // optional performance threshold
});
