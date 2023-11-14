<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte'
	import Form from '../Form.svelte'

	const breadcrumbs = [
		{label: 'Invoices', href: '/dashboard/invoices'},
		{
			label: 'Create Invoice',
			href: '/dashboard/invoices/create',
			active: true,
		},
	]

	export let data
</script>

<main>
	<Breadcrumbs {breadcrumbs} />
	<Form customers={data.customers} />
</main>
