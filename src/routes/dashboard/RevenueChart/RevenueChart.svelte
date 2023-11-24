<script lang="ts">
	import ChartSkeleton from '../Skeletons/ChartSkeleton.svelte'
	import Chart from './Chart.svelte'
	import * as m from '$m'

	export let totalRevenue: Promise<{month: string; revenue: number}[]>
</script>

<div class="flex w-full flex-col md:col-span-4">
	<h2 class="mb-4 font-serif text-xl md:text-2xl">{m.recentRevenue()}</h2>

	<div class="rounded-xl bg-gray-50 p-4">
		{#await totalRevenue}
			<ChartSkeleton />
		{:then total}
			<Chart {total} />
		{/await}
	</div>
</div>
