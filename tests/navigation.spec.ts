import {test, expect} from '@playwright/test'

test('guest navigation smoke test', async ({page}) => {
	await page.goto('/')

	await expect(page).toHaveTitle(/Acme Dashboard/)
	await expect(
		page.getByRole('heading', {level: 1, name: 'Acme'}),
	).toBeVisible()

	// Navigate to the log in page
	await page.getByRole('link', {name: 'Log in'}).click()

	await expect(page).toHaveTitle(/Log in/)
	await expect(
		page.getByRole('heading', {level: 1, name: 'Log in'}),
	).toBeVisible()
})

test('guest gets redirected to login for protected routes', async ({page}) => {
	await page.goto('/dashboard')

	await expect(page).toHaveTitle(/Log in/)
	await expect(
		page.getByRole('heading', {level: 1, name: 'Log in'}),
	).toBeVisible()
})
