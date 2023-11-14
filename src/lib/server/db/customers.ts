import {prisma} from './prisma'

export const fetchCustomers = () =>
	prisma.customer.findMany({select: {id: true, name: true}})
