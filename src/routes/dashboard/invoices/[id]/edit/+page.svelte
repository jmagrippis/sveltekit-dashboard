<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte'
	import Form from '../../Form.svelte'
	import * as m from '$m'

	export let data

	$: breadcrumbs = [
		{label: m.invoices(), href: '/dashboard/invoices'},
		{
			label: m.editInvoice(),
			href: `/dashboard/invoices/${data.invoice.id}/edit`,
			active: true,
		},
	]
</script>

<main>
	<Breadcrumbs {breadcrumbs} />
	<Form invoice={data.invoice} customers={data.customers} />
</main>
