<script lang="ts">
	import {formatCurrencyInCents} from '$lib/formatCurrency'
	import type {Customer, Invoice} from '@prisma/client'
	import {RefreshCcw} from 'lucide-svelte'
	import LatestInvoicesSkeleton from '../Skeletons/LatestInvoicesSkeleton.svelte'
	import Avatar from '$lib/components/Avatar.svelte'
	import * as m from '$m'

	export let latestInvoices: Promise<(Invoice & {customer: Customer})[]>
</script>

{#await latestInvoices}
	<LatestInvoicesSkeleton />
{:then invoices}
	<div class="flex w-full flex-col md:col-span-4 lg:col-span-4">
		<h2 class="mb-4 font-serif text-xl capitalize md:text-2xl">
			{m.latestInvoices()}
		</h2>
		<div class="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
			<div class="bg-white px-6">
				{#each invoices as invoice, i}
					<div
						class="flex flex-row items-center justify-between py-4"
						class:border-t={i !== 0}
					>
						<div class="flex items-center gap-4">
							<Avatar
								src={invoice.customer.image_url}
								alt={`${invoice.customer.name}’s profile picture`}
								size={32}
							/>
							<div class="min-w-0">
								<p class="truncate text-sm font-semibold md:text-base">
									{invoice.customer.name}
								</p>
								<p class="text-sm text-gray-500 sm:block">
									{invoice.customer.email}
								</p>
							</div>
						</div>
						<p class="truncate font-serif text-sm font-medium md:text-base">
							{formatCurrencyInCents(invoice.amount)}
						</p>
					</div>
				{/each}
			</div>
			<div class="flex items-center pb-2 pt-6">
				<RefreshCcw class="h-5 w-5 text-gray-500" />
				<h3 class="ml-2 text-sm text-gray-500">{m.updatedNow()}</h3>
			</div>
		</div>
	</div>
{/await}
