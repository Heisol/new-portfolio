import { test, expect } from '@playwright/test'

test.beforeEach(async ({page}, testInfo)=>{
    await page.goto('https://aliandrada.vercel.app/admin')
    await expect(page).toHaveURL(/,*admin/)
})

test(
    'Visit https://aliandrada.vercel.app/admin and login succesfully (Can see posts)',
    async ({page})=>{
        const emailField = page.locator('input#emailField')
        const passwordField = page.locator('input#passwordField')
        const loginButton = page.locator('button#signInButton')
        await emailField.type('alidejando@gmail.com')
        await passwordField.type('@TotallyRusty1129')
        const loginStatus = await loginButton.click().then(()=>true)
        if (loginStatus) await expect(page.locator('.post')).toBeVisible
})
test(
    'Visit https://aliandrada.vercel.app/admin and login unsuccesfully (Cannot see posts)',
    async ({page})=>{
        const emailField = page.locator('input#emailField')
        const passwordField = page.locator('input#passwordField')
        const loginButton = page.locator('button#signInButton')
        await emailField.type('alidejando@gmail.com')
        await passwordField.type('@TotallyWrongCredentials')
        await loginButton.click()
        await expect(page.locator('.post')).toHaveCount(0)
})
