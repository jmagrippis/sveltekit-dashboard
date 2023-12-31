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
	isAvailableLocale,
} from '$lib/i18n'

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
	let locale: AvailableLocale = defaultLocale

	const langFromCookie = event.cookies.get('lang')

	if (isAvailableLocale(langFromCookie)) {
		locale = langFromCookie
	} else {
		const acceptedLanguageHeader = event.request.headers.get('Accept-Language')

		if (acceptedLanguageHeader) {
			locale =
				(new Negotiator({
					headers: {
						'accept-language': acceptedLanguageHeader,
					},
				}).language(
					availableLocales as unknown as string[],
				) as AvailableLocale) || defaultLocale
		}
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
