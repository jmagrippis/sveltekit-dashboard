import {faker} from '@faker-js/faker'

export const userFactory = (n: number) =>
	[...Array(n).keys()].map(() => ({
		email: faker.internet.email(),
		name: faker.person.fullName(),
		password: faker.internet.password(),
	}))
