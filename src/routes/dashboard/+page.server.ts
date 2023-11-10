import {
	fetchAllRevenue,
	fetchCardData,
	fetchLatestInvoices,
} from '$lib/server/db/dashboardData'
import type {PageServerLoad} from './$types'

export const load = (async () => {
	const [allRevenue, latestInvoices, cardData] = await Promise.all([
		fetchAllRevenue(),
		fetchLatestInvoices(),
		fetchCardData(),
	])

	return {
		allRevenue,
		latestInvoices,
		cardData,
	}
}) satisfies PageServerLoad
