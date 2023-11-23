import type {Invoice} from '@prisma/client'
import {faker} from '@faker-js/faker'

const possibleStatuses = ['paid', 'pending']

export const generateMockInvoices = (
	n: number,
	partial: Pick<Invoice, 'customer_id'>,
) =>
	[...Array(n).keys()].map(() => ({
		amount: faker.number.float({min: 45, max: 500, precision: 2}) * 100,
		date: faker.date.recent({days: 120}),
		status:
			possibleStatuses[Math.floor(Math.random() * possibleStatuses.length)],
		...partial,
	}))
