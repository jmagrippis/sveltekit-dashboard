import type {Prisma} from '@prisma/client'
import {prisma} from './prisma'

export const fetchInvoices = async ({
	query = '',
	skip = 0,
	take = 100,
}: {
	query?: string | null
	skip?: number
	take?: number
}) => {
	const filters: Prisma.InvoiceWhereInput[] = []

	if (query) {
		filters.push(
			{
				customer: {
					name: {
						contains: query,
						mode: 'insensitive',
					},
				},
			},
			{
				customer: {
					email: {
						contains: query,
						mode: 'insensitive',
					},
				},
			},
			{
				status: {
					equals: query,
					mode: 'insensitive',
				},
			},
		)

		if (parseFloat(query)) {
			filters.push({
				amount: {equals: parseFloat(query) * 100},
			})
		}
	}

	const [invoices, invoicesCount] = await prisma.$transaction([
		prisma.invoice.findMany({
			select: {
				id: true,
				amount: true,
				date: true,
				status: true,
				customer: {select: {name: true, image_url: true, email: true}},
			},
			take,
			skip,
			orderBy: {date: 'desc'},
			...(filters.length ? {where: {OR: filters}} : {}),
		}),
		prisma.invoice.count(filters.length ? {where: {OR: filters}} : undefined),
	])

	return {invoices, invoicesCount}
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
