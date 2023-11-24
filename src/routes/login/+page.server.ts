import {redirect} from '@sveltejs/kit'
import * as m from '$m'

import type {PageServerLoad} from './$types'

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession()
	if (session?.user) throw redirect(303, '/dashboard')

	return {
		metadata: {
			title: m.login({languageTag: event.locals.locale}),
			description:
				'Login with GitHub to see the dashboard. Other providers available on request.',
		},
	}
}
