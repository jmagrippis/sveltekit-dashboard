import {faker} from '@faker-js/faker'

export const generateMockCustomers = (n: number) =>
	[...Array(n).keys()].map(() => ({
		name: faker.person.fullName(),
		email: faker.internet.email({provider: 'example.com'}),
		image_url: `https://i.pravatar.cc/64?u=${faker.string.uuid()}}`,
	}))
