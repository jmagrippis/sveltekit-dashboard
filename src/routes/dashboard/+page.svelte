<script>
	import DashboardCards from './DashboardCards/DashboardCards.svelte'
	import LatestInvoices from './LatestInvoices/LatestInvoices.svelte'
	import RevenueChart from './RevenueChart/RevenueChart.svelte'

	export let data
</script>

<main>
	<h1 class="font-serif mb-4 text-xl md:text-2xl">Dashboard</h1>
	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
		<DashboardCards cardData={data.cardData} />
	</div>
	<div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
		<RevenueChart totalRevenue={data.allRevenue} />
		<LatestInvoices latestInvoices={data.latestInvoices} />
	</div>
</main>
