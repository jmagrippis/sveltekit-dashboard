import {SvelteKitAuth} from '@auth/sveltekit'
import GitHub from '@auth/core/providers/github'
import {GITHUB_ID, GITHUB_SECRET} from '$env/static/private'
import {sequence} from '@sveltejs/kit/hooks'
import {redirect, type Handle} from '@sveltejs/kit'
import {PrismaAdapter} from '@auth/prisma-adapter'
import Negotiator from 'negotiator'
import {prisma} from '$lib/server/db/prisma'
import {
	availableLocales,
	defaultLocale,
	type AvailableLocale,
} from './i18n/i18n'

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

const localization: Handle = async ({event, resolve}) => {
	const acceptedLanguageHeader = event.request.headers.get('Accept-Language')

	let locale: AvailableLocale = defaultLocale
	if (acceptedLanguageHeader) {
		locale =
			new Negotiator({
				headers: {
					'accept-language': acceptedLanguageHeader,
				},
			}).language(availableLocales) || defaultLocale
	}

	event.locals.locale = locale

	return resolve(event, {
		transformPageChunk: ({html}) => html.replace('%lang%', locale),
	})
}

export const handle: Handle = sequence(
	SvelteKitAuth({
		adapter: PrismaAdapter(prisma),
		providers: [GitHub({clientId: GITHUB_ID, clientSecret: GITHUB_SECRET})],
	}),
	authorization,
	localization,
)
