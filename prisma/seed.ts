import {PrismaClient} from '@prisma/client'
import {userFactory} from './mocks/userFactory'
import {customerFactory} from './mocks/customerFactory'
import {revenueFactory} from './mocks/revenueFactory'
const prisma = new PrismaClient()

try {
	const users = userFactory(3)
	await prisma.user.createMany({data: users})
	const customers = customerFactory(10)
	customers.forEach(async (customer) => {
		await prisma.customer.create({data: customer})
	})
	const revenue = revenueFactory(12)
	await prisma.revenue.createMany({data: revenue})

	await prisma.$disconnect()
} catch (error) {
	console.error(error)
	await prisma.$disconnect()
	process.exit(1)
}
