import type {PageServerLoad} from './$types'
import {createInvoice} from '$lib/server/db/invoices'
import type {Actions} from './$types'
import {z} from 'zod'
import {fetchCustomers} from '$lib/server/db/customers'
import {redirect} from '@sveltejs/kit'

export const load = (async () => {
	const customers = await fetchCustomers()

	return {
		customers,
		metadata: {
			title: 'Create Invoice | Dashboard',
			description:
				'Create a new invoice for a customer, set the amount and status',
		},
	}
}) satisfies PageServerLoad

const InvoiceSchema = z.object({
	id: z.string(),
	customerId: z.string(),
	amount: z.coerce.number(),
	status: z.enum(['pending', 'paid']),
	date: z.string(),
})

const CreateInvoice = InvoiceSchema.omit({id: true, date: true})

export const actions = {
	default: async ({request}) => {
		const formData = await request.formData()
		const {customerId, amount, status} = CreateInvoice.parse({
			customerId: formData.get('customerId'),
			amount: formData.get('amount'),
			status: formData.get('status'),
		})

		await createInvoice({
			status,
			customerId,
			amountInCents: amount * 100,
		})

		throw redirect(303, '/dashboard/invoices')
	},
} satisfies Actions
