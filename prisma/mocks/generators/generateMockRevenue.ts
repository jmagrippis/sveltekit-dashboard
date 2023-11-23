import {faker} from '@faker-js/faker'

export const generateMockRevenue = (n: number) =>
	[...Array(n).keys()].map((i) => {
		const date = new Date()
		date.setMonth(date.getMonth() - i)
		return {
			month: date.toLocaleString('default', {month: 'short'}),
			revenue: faker.number.int({min: 2500, max: 10000}) * 100,
		}
	})
