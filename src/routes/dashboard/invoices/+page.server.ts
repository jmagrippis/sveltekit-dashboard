import {deleteInvoice, fetchInvoices} from '$lib/server/db/invoices'
import type {Actions, PageServerLoad} from './$types'
import {z} from 'zod'

const ONE_MINUTE_IN_SECONDS = 60

const SearchSchema = z.object({
	query: z.string().nullable(),
	page: z
		.string()
		.nullable()
		.transform((value) => (value ? parseInt(value) : 1)),
})

const ITEM_LIMIT = 6
export const load: PageServerLoad = async ({url, setHeaders}) => {
	const {query, page} = SearchSchema.parse({
		query: url.searchParams.get('query'),
		page: url.searchParams.get('page'),
	})

	const {invoices, invoicesCount} = await fetchInvoices({
		query,
		take: ITEM_LIMIT,
		skip: (page - 1) * ITEM_LIMIT,
	})

	setHeaders({
		'cache-control': `private, max-age=${ONE_MINUTE_IN_SECONDS}`,
	})

	return {
		invoices,
		invoicesCount,
		totalPages: Math.ceil(invoicesCount / ITEM_LIMIT),
	}
}

const DeleteInvoiceSchema = z.object({id: z.string()})

export const actions = {
	delete: async ({request}) => {
		const formData = await request.formData()
		const {id} = DeleteInvoiceSchema.parse({
			id: formData.get('id'),
		})

		await deleteInvoice(id)

		return {success: true}
	},
} satisfies Actions
