<script lang="ts">
	import {enhance} from '$app/forms'
	import {Check, Clock, DollarSign, UserIcon} from 'lucide-svelte'
	import * as m from '$m'

	type SelectOptionCustomer = {
		id: string
		name: string
	}
	type Invoice = {
		id: string
		customer_id: string
		amount: number
		status: string
	}
	export let customers: SelectOptionCustomer[]
	export let invoice: Invoice | null
</script>

<form method="POST" use:enhance>
	<div class="rounded-md bg-gray-50 p-4 md:p-6">
		{#if invoice?.id}
			<input name="id" type="hidden" value={invoice?.id} />
		{/if}
		<!-- Customer Name -->
		<div class="mb-4">
			<label for="customer" class="mb-2 block text-sm font-medium">
				{m.chooseCustomer()}
			</label>
			<div class="relative">
				<select
					id="customer"
					name="customerId"
					class="peer block w-full rounded-md border border-gray-200 py-2 pl-10 outline-2 placeholder:text-gray-500"
					required
					aria-describedby="customer-error"
				>
					<option value="" disabled>{m.selectACustomer()}</option>
					{#each customers as customer, i}
						<option
							value={customer.id}
							selected={invoice?.customer_id
								? invoice.customer_id === customer.id
								: i === 0}
						>
							{customer.name}
						</option>
					{/each}
				</select>
				<UserIcon
					class="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
				/>
			</div>
		</div>

		<!-- Invoice Amount -->
		<div class="mb-4">
			<label for="amount" class="mb-2 block text-sm font-medium">
				{m.chooseAmount()}
			</label>
			<div class="relative mt-2 rounded-md">
				<div class="relative">
					<input
						id="amount"
						name="amount"
						type="number"
						step="0.01"
						min="0"
						value={invoice?.amount ? invoice.amount / 100 : undefined}
						placeholder={m.chooseAmountPlaceholder()}
						class="peer block w-full rounded-md border border-gray-200 py-2 pl-10 outline-2 placeholder:text-gray-500"
						required
					/>
					<DollarSign
						class="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
					/>
				</div>
			</div>
		</div>

		<!-- Invoice Status -->
		<fieldset>
			<legend class="mb-2 block text-sm font-medium">
				{m.setInvoiceStatus()}
			</legend>
			<div class="rounded-md border border-gray-200 bg-white px-[14px] py-3">
				<div class="flex gap-4">
					<div id="status" class="flex items-center">
						<input
							id="pending"
							name="status"
							type="radio"
							value="pending"
							class="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
							checked={invoice?.status === 'pending' ? true : undefined}
							required
						/>
						<label
							for="pending"
							class="ml-2 flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300"
						>
							{m.pending()}
							<Clock class="h-4 w-4" />
						</label>
					</div>
					<div class="flex items-center">
						<input
							id="paid"
							name="status"
							type="radio"
							value="paid"
							checked={invoice?.status === 'paid' ? true : undefined}
							class="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
						/>
						<label
							for="paid"
							class="ml-2 flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white dark:text-gray-300"
						>
							{m.paid()}
							<Check class="h-4 w-4" />
						</label>
					</div>
				</div>
			</div>
		</fieldset>
	</div>
	<div class="mt-6 flex justify-end gap-4">
		<a
			href="/dashboard/invoices"
			class="flex h-10 items-center rounded-lg bg-gray-100 px-4 font-medium capitalize text-gray-600 no-underline transition-colors hover:bg-gray-200"
		>
			{m.cancel()}
		</a>
		<button
			class="flex h-10 items-center rounded-lg bg-primary-500 px-4 font-medium capitalize text-white transition-colors hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 active:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
			>{invoice?.id ? m.edit() : m.create()} {m.referringToInvoice()}</button
		>
	</div>
</form>
