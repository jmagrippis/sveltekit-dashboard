export const availableLocales = ['en', 'el'] as const
export type AvailableLocale = (typeof availableLocales)[number]

export const isAvailableLocale = (lang: unknown): lang is AvailableLocale =>
	typeof lang === 'string' && availableLocales.includes(lang as AvailableLocale)

export const defaultLocale = availableLocales[0]
