import {getLocalizedMessages} from '../i18n/i18n'
import type {PageServerLoad} from './$types'

export const load: PageServerLoad = async ({locals}) => {
	const messages = getLocalizedMessages(locals.locale)
	return {messages}
}
