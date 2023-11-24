export const availableLocales = ['en', 'el'] as const
export type AvailableLocale = (typeof availableLocales)[number]
export const defaultLocale = availableLocales[0]

const messages = {
	en: () => import('./messages/en.json').then((module) => module.default),
	el: () => import('./messages/el.json').then((module) => module.default),
}

export const getLocalizedMessages = (locale: AvailableLocale) => {
	const localizedMessages = messages[locale] ?? messages['en']
	return localizedMessages()
}
