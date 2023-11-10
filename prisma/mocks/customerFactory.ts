import {faker} from '@faker-js/faker'

const possibleStatuses = ['paid', 'pending']

const invoicesFactory = (n: number) =>
	[...Array(n).keys()].map(() => ({
		amount: faker.number.int({min: 45, max: 500}) * 100,
		date: faker.date.recent({days: 120}),
		status:
			possibleStatuses[Math.floor(Math.random() * possibleStatuses.length)],
	}))

export const customerFactory = (n: number) =>
	[...Array(n).keys()].map(() => ({
		email: faker.internet.email(),
		name: faker.person.fullName(),
		image_url: faker.internet.avatar(),
		invoices: {
			create: invoicesFactory(3),
		},
	}))
