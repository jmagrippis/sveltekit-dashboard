import type {PageServerLoad} from './$types'
import {
	createInvoice,
	fetchInvoice,
	updateInvoice,
} from '$lib/server/db/invoices'
import type {Actions} from './$types'
import {z} from 'zod'
import {fetchCustomers} from '$lib/server/db/customers'
import {error, redirect} from '@sveltejs/kit'

export const load = (async ({params}) => {
	const [invoice, customers] = await Promise.all([
		fetchInvoice(params.id),
		fetchCustomers(),
	])

	if (!invoice) {
		throw error(404, {
			message: 'Not found',
		})
	}

	return {
		customers,
		invoice,
	}
}) satisfies PageServerLoad

const InvoiceSchema = z.object({
	id: z.string(),
	customerId: z.string(),
	amount: z.coerce.number(),
	status: z.enum(['pending', 'paid']),
	date: z.string(),
})

const EditInvoice = InvoiceSchema.omit({date: true})

export const actions = {
	default: async ({request}) => {
		const formData = await request.formData()
		const {id, customerId, amount, status} = EditInvoice.parse({
			id: formData.get('id'),
			customerId: formData.get('customerId'),
			amount: formData.get('amount'),
			status: formData.get('status'),
		})

		await updateInvoice({
			id,
			status,
			customerId,
			amountInCents: amount * 100,
		})

		throw redirect(303, '/dashboard/invoices')
	},
} satisfies Actions
