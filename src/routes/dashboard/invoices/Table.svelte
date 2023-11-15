<script lang="ts">
	import type {Customer, Invoice} from '@prisma/client'
	import Avatar from '$lib/components/Avatar.svelte'
	import {formatCurrencyInCents} from '$lib/formatCurrency'
	import {formatDate} from '$lib/formatDate'
	import DeleteInvoice from '$lib/components/DeleteButton.svelte'
	import InvoiceStatus from './InvoiceStatus.svelte'
	import UpdateInvoice from './UpdateInvoice.svelte'

	export let invoices: (Invoice & {
		customer: Customer
	})[]
</script>

<div class="mt-6 flow-root">
	<div class="inline-block min-w-full align-middle">
		<div class="rounded-lg bg-gray-50 p-2 md:pt-0">
			<div class="md:hidden">
				{#each invoices as invoice}
					<div class="mb-2 w-full rounded-md bg-white p-4">
						<div class="flex items-center justify-between border-b pb-4">
							<div>
								<div class="mb-2 flex items-center gap-2">
									<Avatar
										src={invoice.customer.image_url}
										alt={`${invoice.customer.name}'s profile picture`}
										size={28}
									/>
									<p>{invoice.customer.name}</p>
								</div>
								<p class="text-sm text-gray-500">
									{invoice.customer.email}
								</p>
							</div>
							<InvoiceStatus status={invoice.status} />
						</div>
						<div class="flex w-full items-center justify-between pt-4">
							<div>
								<p class="text-xl font-medium">
									{formatCurrencyInCents(invoice.amount)}
								</p>
								<p>{formatDate(invoice.date)}</p>
							</div>
							<div class="flex justify-end gap-2">
								<UpdateInvoice id={invoice.id} />
								<DeleteInvoice id={invoice.id} />
							</div>
						</div>
					</div>
				{/each}
			</div>
			<table class="hidden min-w-full text-gray-900 md:table">
				<thead class="rounded-lg text-left text-sm font-normal">
					<tr>
						<th scope="col" class="px-4 py-5 font-medium sm:pl-6">Customer</th>
						<th scope="col" class="px-3 py-5 font-medium">Email</th>
						<th scope="col" class="px-3 py-5 font-medium">Amount</th>
						<th scope="col" class="px-3 py-5 font-medium">Date</th>
						<th scope="col" class="px-3 py-5 font-medium">Status</th>
						<th scope="col" class="relative py-3 pl-6 pr-3">
							<span class="sr-only">Edit</span>
						</th>
					</tr>
				</thead>
				<tbody class="bg-white">
					{#each invoices as invoice}
						<tr
							class="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
						>
							<td class="whitespace-nowrap py-3 pl-6 pr-3">
								<div class="flex items-center gap-3">
									<img
										src={invoice.customer.image_url}
										class="rounded-full"
										width={28}
										height={28}
										alt={`${invoice.customer.name}'s profile picture`}
									/>
									<p class="truncate">{invoice.customer.name}</p>
								</div>
							</td>
							<td class="whitespace-nowrap px-3 py-3">
								{invoice.customer.email}
							</td>
							<td class="whitespace-nowrap px-3 py-3">
								{formatCurrencyInCents(invoice.amount)}
							</td>
							<td class="whitespace-nowrap px-3 py-3">
								{formatDate(invoice.date)}
							</td>
							<td class="whitespace-nowrap px-3 py-3">
								<InvoiceStatus status={invoice.status} />
							</td>
							<td class="whitespace-nowrap py-3 pl-6 pr-3">
								<div class="flex justify-end gap-3">
									<UpdateInvoice id={invoice.id} />
									<DeleteInvoice id={invoice.id} />
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
