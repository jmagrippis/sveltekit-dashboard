<script lang="ts">
	import Card from '$lib/components/Card/Card.svelte'
	import {formatCurrencyInCents} from '$lib/formatCurrency'
	import type {CardData} from '$lib/server/db/dashboardData'
	import {Clock3, Coins, Inbox, Users2} from 'lucide-svelte'
	import CardSkeleton from '../Skeletons/CardSkeleton.svelte'

	import * as m from '$m'

	export let cardData: Promise<CardData>
</script>

<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
	{#await cardData}
		<CardSkeleton />
		<CardSkeleton />
		<CardSkeleton />
		<CardSkeleton />
	{:then data}
		<Card
			title={m.collected()}
			value={formatCurrencyInCents(data.amountCollected)}
		>
			<Coins />
		</Card>
		<Card title={m.pending()} value={formatCurrencyInCents(data.amountPending)}>
			<Clock3 />
		</Card>
		<Card title={m.totalInvoices()} value={data.totalInvoices}>
			<Inbox />
		</Card>
		<Card title={m.totalCustomers()} value={data.totalCustomers}>
			<Users2 />
		</Card>
	{/await}
</div>
