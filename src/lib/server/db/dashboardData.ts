import {prisma} from './prisma'

export const fetchAllRevenue = () => prisma.revenue.findMany()

export const fetchLatestInvoices = () =>
	prisma.invoice.findMany({include: {customer: true}})

export type CardData = {
	amountCollected: number
	amountPending: number
	totalInvoices: number
	totalCustomers: number
}

export const fetchCardData = async (): Promise<CardData> => {
	const [
		amountCollectedResult,
		amountPendingResult,
		totalInvoices,
		totalCustomers,
	] = await Promise.all([
		prisma.invoice.aggregate({_sum: {amount: true}, where: {status: 'paid'}}),
		prisma.invoice.aggregate({
			_sum: {amount: true},
			where: {status: 'pending'},
		}),
		prisma.invoice.count(),
		prisma.customer.count(),
	])

	return {
		amountCollected: amountCollectedResult._sum.amount || 0,
		amountPending: amountPendingResult._sum.amount || 0,
		totalInvoices,
		totalCustomers,
	}
}
