import {deleteInvoice, fetchInvoices} from '$lib/server/db/invoices'
import type {Actions, PageServerLoad} from './$types'
import {z} from 'zod'

const SearchSchema = z.object({
	query: z.string().nullable(),
	page: z
		.string()
		.nullable()
		.transform((value) => (value ? parseInt(value) : 1)),
})

const ITEM_LIMIT = 6
export const load: PageServerLoad = async ({url}) => {
	const {query, page} = SearchSchema.parse({
		query: url.searchParams.get('query'),
		page: url.searchParams.get('page'),
	})

	const invoices = await fetchInvoices({
		query,
		take: ITEM_LIMIT,
		skip: (page - 1) * ITEM_LIMIT,
	})

	return {invoices}
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
