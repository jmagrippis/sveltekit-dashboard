import {deleteInvoice} from '$lib/server/db/invoices'
import type {Actions} from './$types'
import {z} from 'zod'

const DeleteInvoiceSchema = z.object({
	id: z.string(),
})

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
