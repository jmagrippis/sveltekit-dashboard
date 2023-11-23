import {PrismaClient} from '@prisma/client'

import {generateMockUsers} from './generators/generateMockUsers'
import {generateMockCustomers} from './generators/generateMockCustomers'
import {generateMockRevenue} from './generators/generateMockRevenue'
import {generateMockInvoices} from './generators/generateMockInvoices'

const prisma = new PrismaClient()

async function main() {
	const users = generateMockUsers(3)
	const usersInsert = await prisma.user.createMany({data: users})
	console.log(`Inserted ${usersInsert.count} users`)

	const customers = generateMockCustomers(10)
	const customersInsert = await prisma.customer.createMany({data: customers})
	console.log(`Inserted ${customersInsert.count} customers`)

	const dbCustomers = await prisma.customer.findMany({select: {id: true}})
	const invoices = dbCustomers.reduce(
		(acc, customer) => {
			acc.push(...generateMockInvoices(3, {customer_id: customer.id}))
			return acc
		},
		[] as {customer_id: string; amount: number; status: string; date: Date}[],
	)
	const invoicesInsert = await prisma.invoice.createMany({data: invoices})
	console.log(`Inserted ${invoicesInsert.count} invoices`)

	const revenue = generateMockRevenue(12)
	const revenueInsert = await prisma.revenue.createMany({data: revenue})
	console.log(`Inserted ${revenueInsert.count} months of revenue`)
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
