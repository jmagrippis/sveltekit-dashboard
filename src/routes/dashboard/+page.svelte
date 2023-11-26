<script>
	import * as m from '$m'

	import DashboardCards from './DashboardCards/DashboardCards.svelte'
	import LatestInvoices from './LatestInvoices/LatestInvoices.svelte'
	import RevenueChart from './RevenueChart/RevenueChart.svelte'

	export let data
</script>

<main>
	<h1 class="mb-4 font-serif text-2xl capitalize md:text-2xl">
		{m.dashboard()}
	</h1>
	<DashboardCards cardData={data.streamed.cardData} />
	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"></div>
	<div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
		<RevenueChart totalRevenue={data.streamed.allRevenue} />
		<LatestInvoices latestInvoices={data.streamed.latestInvoices} />
	</div>
</main>
