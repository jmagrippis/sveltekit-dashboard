import {faker} from '@faker-js/faker'

export const revenueFactory = (n: number) =>
	[...Array(n).keys()].map(() => ({
		month: faker.date.month(),
		revenue: faker.number.int({min: 2_500, max: 10_000}) * 100,
	}))
