import type {LayoutServerLoad} from './$types'

export const load: LayoutServerLoad = async ({locals, depends}) => {
	depends('app:locale')

	return {
		locale: locals.locale,
		session: locals.getSession(),
	}
}
