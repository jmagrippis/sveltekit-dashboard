import {fetchInvoices} from '$lib/server/db/invoices'
import {z} from 'zod'
import type {PageServerLoad} from './$types'

const INVOICES_PER_PAGE = 6

const ONE_MINUTE_IN_SECONDS = 60

const SearchSchema = z.object({
	query: z.string(),
	page: z.number().positive(),
})
export const load: PageServerLoad = async ({url, setHeaders}) => {
	const querySearchParam = url.searchParams.get('query') || ''
	const pageSearchParam = url.searchParams.get('page') || '1'

	const {query, page} = SearchSchema.parse({
		query: querySearchParam,
		page: parseInt(pageSearchParam),
	})

	const {invoices} = await fetchInvoices({
		query,
		take: INVOICES_PER_PAGE,
		skip: (page - 1) * INVOICES_PER_PAGE,
	})

	setHeaders({
		'Cache-Control': `private, max-age=${ONE_MINUTE_IN_SECONDS}`,
	})

	return {invoices}
}
