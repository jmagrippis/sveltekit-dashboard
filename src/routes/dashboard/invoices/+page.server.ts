import {fetchInvoices} from '$lib/server/db/invoices'
import {z} from 'zod'
import type {PageServerLoad} from './$types'

const FIVE_MINUTES_IN_SECONDS = 5 * 60
const INVOICES_PER_PAGE = 6

const SearchSchema = z.object({
	query: z.string().nullable().default(''),
	page: z
		.string()
		.nullable()
		.transform((val) => (val ? parseInt(val) : 1))
		.pipe(z.number().positive()),
})

export const load: PageServerLoad = async ({url, setHeaders}) => {
	const {query, page} = SearchSchema.parse({
		query: url.searchParams.get('query'),
		page: url.searchParams.get('page'),
	})

	const {invoices, invoicesCount} = await fetchInvoices({
		query,
		take: INVOICES_PER_PAGE,
		skip: (page - 1) * INVOICES_PER_PAGE,
	})

	setHeaders({
		'Cache-Control': `private, max-age=${FIVE_MINUTES_IN_SECONDS}`,
	})

	return {
		invoices,
		invoicesCount,
		totalPages: Math.ceil(invoicesCount / INVOICES_PER_PAGE),
		metadata: {
			title: 'Invoices | Dashboard',
			description: 'Search & filter through all your invoices',
		},
	}
}
