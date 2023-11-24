import type {LayoutServerLoad} from './$types'

export const load: LayoutServerLoad = async ({locals}) => ({
	locale: locals.locale,
	session: locals.getSession(),
})
