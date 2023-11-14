import type {PageLoad} from './$types'

export const load: PageLoad = async ({url, fetch, depends}) => {
	const page = url.searchParams.has('page')
		? parseInt(url.searchParams.get('page') as string)
		: 1

	const query = url.searchParams.has('query')
		? encodeURIComponent(url.searchParams.get('query') as string)
		: ''

	const response = await fetch(
		`/api/invoices?limit=6&page=${page}&query=${query}`,
	)

	const invoices = await response.json()
	return {invoices}
}
