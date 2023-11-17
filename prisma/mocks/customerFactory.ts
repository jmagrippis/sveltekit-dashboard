import {faker} from '@faker-js/faker'

const possibleStatuses = ['paid', 'pending']

const invoicesFactory = (n: number) =>
	[...Array(n).keys()].map(() => ({
		amount: faker.number.float({min: 45, max: 500, precision: 2}) * 100,
		date: faker.date.recent({days: 120}),
		status:
			possibleStatuses[Math.floor(Math.random() * possibleStatuses.length)],
	}))

export const customerFactory = (n: number) =>
	[...Array(n).keys()].map(() => ({
		name: faker.person.fullName(),
		email: faker.internet.email({provider: 'example.com'}),
		image_url: `https://i.pravatar.cc/64?u=${faker.string.uuid()}}`,
		invoices: {
			create: invoicesFactory(3),
		},
	}))
