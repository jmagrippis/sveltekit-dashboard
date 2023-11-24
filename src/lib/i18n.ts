export const availableLocales = ['en', 'el'] as const
export type AvailableLocale = (typeof availableLocales)[number]
export const defaultLocale = availableLocales[0]
