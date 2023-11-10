import {
	fetchAllRevenue,
	fetchCardData,
	fetchLatestInvoices,
} from '$lib/server/db/dashboardData'
import type {PageServerLoad} from './$types'

export const load = (async () => {
	const cardData = fetchCardData()
	const latestInvoices = fetchLatestInvoices()
	const allRevenue = fetchAllRevenue()

	return {
		streamed: {cardData, allRevenue, latestInvoices},
	}
}) satisfies PageServerLoad
