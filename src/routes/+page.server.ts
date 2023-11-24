import {z} from 'zod'
import type {Actions} from './$types'
import {availableLocales, type AvailableLocale} from '$lib/i18n'

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 30 * 12
const LanguageSchema = z
	.string()
	.refine((val) => availableLocales.includes(val as AvailableLocale), {
		message: 'Not an available local',
	})

export const actions: Actions = {
	setLang: async ({request, cookies}) => {
		const formData = await request.formData()
		const lang = LanguageSchema.parse(formData.get('lang'))

		cookies.set('lang', lang, {maxAge: ONE_YEAR_IN_SECONDS})

		return {lang}
	},
}
