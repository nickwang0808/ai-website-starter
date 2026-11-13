import { expect, test } from '@playwright/test';
import site from '../../src/data/site.json' with { type: 'json' };

test('homepage renders business content without overflow or broken requests', async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', (response) => {
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
  });

  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(site.name);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(site.headline);
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );

  if (!site.publishReady) {
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex, nofollow',
    );
    await expect(page.getByText('Local draft', { exact: false })).toBeVisible();
  }
  if (site.contact.href) {
    await expect(page.locator('#contact a')).toHaveAttribute('href', site.contact.href);
  } else {
    await expect(page.locator('#contact')).toContainText('No form submissions are collected');
    await expect(page.locator('form')).toHaveCount(0);
  }
  await page.screenshot({ path: testInfo.outputPath('homepage.png'), fullPage: true });
  expect(errors).toEqual([]);
});

test('keyboard skip link, section navigation, and FAQ work without application JavaScript', async ({
  page,
}) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();

  await page.getByRole('navigation').getByRole('link', { name: 'Services', exact: true }).click();
  await expect(page).toHaveURL(/#services$/);
  await expect(page.locator('#services')).toBeInViewport();
  const question = page.locator('details').first();
  await question.locator('summary').click();
  await expect(question).toHaveAttribute('open', '');
  await expect(question.locator('p')).toBeVisible();
});

test('unknown page returns the custom 404 and a working home link', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText("This page isn't here.");
  await page.getByRole('link', { name: 'Back to the homepage' }).click();
  await expect(page).toHaveURL('/');
});
