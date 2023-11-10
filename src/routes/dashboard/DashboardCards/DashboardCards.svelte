<script lang="ts">
	import Card from '$lib/Card/Card.svelte'
	import {formatCurrencyInCents} from '$lib/formatCurrency'
	import type {CardData} from '$lib/server/db/dashboardData'
	import {Clock3, Coins, Inbox, Users2} from 'lucide-svelte'

	export let cardData: CardData
</script>

<Card title="Collected" value={formatCurrencyInCents(cardData.amountCollected)}>
	<Coins />
</Card>
<Card title="Pending" value={formatCurrencyInCents(cardData.amountPending)}>
	<Clock3 />
</Card>
<Card title="Total Invoices" value={cardData.totalInvoices}>
	<Inbox />
</Card>
<Card title="Total Customers" value={cardData.totalCustomers}>
	<Users2 />
</Card>
