<script lang="ts">
	import {Plus} from 'lucide-svelte'
	import Table from './Table.svelte'
	import Search from './Search.svelte'
	import Pagination from './Pagination.svelte'
	import {page} from '$app/stores'
	import NoData from '$lib/components/NoData.svelte'

	export let data
</script>

<div class="w-full">
	<h1 class="mb-2 font-serif text-2xl">Invoices</h1>

	<div class="mt-4 flex items-center justify-between gap-2 md:mt-8">
		<Search />
		<a
			href="/dashboard/invoices/create"
			class="flex h-10 items-center gap-2 rounded-lg bg-primary-600 px-4 text-sm font-medium text-white transition-colors hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
		>
			<span class="hidden md:block">Create Invoice</span>
			<Plus className="h-5 md:ml-4" />
		</a>
	</div>
	{#if data.invoices.length}
		<Table invoices={data.invoices} />
		<div class="mt-5 flex w-full justify-center">
			<Pagination totalPages={3} totalCount={15} />
		</div>
	{:else}
		<p class="mt-8 flex flex-col items-center gap-8 text-center text-gray-500">
			<NoData class="w-32 md:w-64" />
			{#if $page.url.searchParams.get('query')}
				No matching invoices!
			{:else}
				No invoices!
			{/if}
		</p>
	{/if}
</div>
