import {languageTag} from '../paraglide/runtime'

export const formatDate = (date: Date) => {
	const formatter = new Intl.DateTimeFormat(languageTag(), {
		dateStyle: 'medium',
	})
	return formatter.format(date)
}
export const formatIsoDate = (isoDate: string) => {
	const formatter = new Intl.DateTimeFormat(languageTag(), {
		dateStyle: 'medium',
	})
	return formatter.format(new Date(isoDate))
}
