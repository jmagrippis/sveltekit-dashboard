<script lang="ts">
	import {formatCurrencyInCents} from '$lib/formatCurrency'

	export let totalRevenue: {month: string; revenue: number}[]
</script>

<div class="flex w-full flex-col md:col-span-4 lg:col-span-4">
	<h2 class="font-serif mb-4 text-xl md:text-2xl">Recent Revenue</h2>

	<ul>
		{#each totalRevenue as { month, revenue }}
			<li>{month}: {formatCurrencyInCents(revenue)}</li>
		{/each}
	</ul>
</div>
