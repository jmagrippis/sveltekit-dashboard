import type {LayoutServerLoad} from './$types'

export const load: LayoutServerLoad = async (event) => ({
	session: event.locals.getSession(),
})
