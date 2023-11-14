<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte'
	import Form from '../../Form.svelte'

	export let data

	$: breadcrumbs = [
		{label: 'Invoices', href: '/dashboard/invoices'},
		{
			label: 'Edit Invoice',
			href: `/dashboard/invoices/${data.invoice.id}/edit`,
			active: true,
		},
	]
</script>

<main>
	<Breadcrumbs {breadcrumbs} />
	<Form invoice={data.invoice} customers={data.customers} />
</main>
