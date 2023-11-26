<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte'
	import Form from '../Form.svelte'
	import * as m from '$m'

	const breadcrumbs = [
		{label: m.invoices(), href: '/dashboard/invoices'},
		{
			label: m.createInvoice(),
			href: '/dashboard/invoices/create',
			active: true,
		},
	]

	export let data
</script>

<main>
	<Breadcrumbs {breadcrumbs} />
	<Form customers={data.customers} invoice={null} />
</main>
