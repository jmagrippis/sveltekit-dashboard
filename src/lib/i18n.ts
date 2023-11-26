export const availableLocales = ['en', 'el'] as const
export type AvailableLocale = (typeof availableLocales)[number]

export const labeledLanguages: {locale: AvailableLocale; label: string}[] = [
	{locale: 'en', label: 'English'},
	{locale: 'el', label: 'Ελληνικά'},
]

export const isAvailableLocale = (lang: unknown): lang is AvailableLocale =>
	typeof lang === 'string' && availableLocales.includes(lang as AvailableLocale)

export const defaultLocale = availableLocales[0]
