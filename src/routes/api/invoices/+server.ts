import {json} from '@sveltejs/kit'
import type {RequestHandler} from './$types'
import {fetchInvoices} from '$lib/server/db/invoices'

export const GET: RequestHandler = async ({url}) => {
	const page = url.searchParams.has('page')
		? parseInt(url.searchParams.get('page') as string)
		: 1
	const limit = url.searchParams.has('limit')
		? parseInt(url.searchParams.get('limit') as string)
		: 10

	const query = url.searchParams.get('query') || ''
	const invoices = await fetchInvoices({
		query,
		take: limit,
		skip: (page - 1) * limit,
	})

	return json(invoices)
}
