import { test, expect } from '@playwright/test';

export const endUserTest = test('Visit https://aliandrada.vercel.app/ as an end user and interact with page', async ({ page }) => {
  await page.goto('https://aliandrada.vercel.app/');

  await expect(page).toHaveTitle('Projects')

  const headerProjects = page.locator('button#headerProjects')
  const headerAboutMe = page.locator('button#headerAboutMe')

  await expect(headerProjects).toHaveText('Projects')
  await expect(headerAboutMe).toHaveText('About Me')

  await headerAboutMe.click()
  await expect(page).toHaveURL(/,*aboutme/)
  const linkIcons = await page.$$('.linkIcon')
  await linkIcons.forEach(e=>e.click())
  await headerProjects.click()
  await expect(page).toHaveURL(/,*/)
});
