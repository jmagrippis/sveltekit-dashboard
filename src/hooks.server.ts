import {SvelteKitAuth} from '@auth/sveltekit'
import GitHub from '@auth/core/providers/github'
import {GITHUB_ID, GITHUB_SECRET} from '$env/static/private'
import {sequence} from '@sveltejs/kit/hooks'
import {redirect, type Handle} from '@sveltejs/kit'

const authorization: Handle = async ({event, resolve}) => {
	// Protect all routes under /dashboard
	if (event.url.pathname.startsWith('/dashboard')) {
		const session = await event.locals.getSession()
		if (!session) {
			throw redirect(303, '/login')
		}
	}

	return resolve(event)
}

export const handle: Handle = sequence(
	SvelteKitAuth({
		providers: [GitHub({clientId: GITHUB_ID, clientSecret: GITHUB_SECRET})],
	}),
	authorization,
)
