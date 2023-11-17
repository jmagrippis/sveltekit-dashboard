<script lang="ts">
	import Search from '$lib/components/Search.svelte'
	import {Plus} from 'lucide-svelte'
	import Table from './Table.svelte'
	import Pagination from './Pagination.svelte'

	export let data
</script>

<div class="w-full">
	<div class="flex w-full items-center justify-between">
		<h1 class="font-serif text-2xl">Invoices</h1>
	</div>
	<div class="mt-4 flex items-center justify-between gap-2 md:mt-8">
		<Search placeholder="Search invoices..." />
		<a
			href="/dashboard/invoices/create"
			class="flex h-10 items-center gap-2 rounded-lg bg-primary-600 px-4 text-sm font-medium text-white transition-colors hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
		>
			<span class="hidden md:block">Create Invoice</span>
			<Plus className="h-5 md:ml-4" />
		</a>
	</div>
	<Table invoices={data.invoices} />
	<div class="mt-5 flex w-full justify-center">
		<Pagination totalPages={data.totalPages} totalCount={data.invoicesCount} />
	</div>
</div>
