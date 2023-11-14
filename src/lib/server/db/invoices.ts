import {prisma} from './prisma'

export const fetchInvoices = async ({
	query = '',
	skip = 0,
	take = 10,
}: {
	query?: string
	skip?: number
	take?: number
}) => {
	try {
		return prisma.invoice.findMany({
			select: {
				id: true,
				amount: true,
				date: true,
				status: true,
				customer: {select: {name: true, image_url: true, email: true}},
			},
			where: {
				customer: {
					name: {
						contains: query,
						mode: 'insensitive',
					},
				},
			},
			take,
			skip,
			orderBy: {date: 'desc'},
		})
	} catch (error) {
		console.log('fetchInvoices ERROR', error)
		return []
	}
}

export const fetchInvoice = async (id: string) =>
	prisma.invoice.findUnique({where: {id}})

export const createInvoice = async ({
	amountInCents,
	status,
	customerId,
}: {
	amountInCents: number
	status: 'paid' | 'pending'
	customerId: string
}) =>
	prisma.invoice.create({
		data: {
			status,
			customer_id: customerId,
			amount: amountInCents,
		},
	})

export const updateInvoice = async ({
	id,
	amountInCents,
	status,
	customerId,
}: {
	id: string
	amountInCents: number
	status: 'paid' | 'pending'
	customerId: string
}) =>
	prisma.invoice.update({
		data: {
			status,
			customer_id: customerId,
			amount: amountInCents,
		},
		where: {id},
	})

export const deleteInvoice = async (id: string) =>
	prisma.invoice.delete({where: {id}})
