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
		metadata: {
			title: 'Dashboard',
			description:
				'View your latest stats at a glance, navigate to manage your invoices and revenue',
		},
	}
}) satisfies PageServerLoad
