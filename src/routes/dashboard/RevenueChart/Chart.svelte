<script lang="ts">
	import {
		Chart,
		BarController,
		BarElement,
		CategoryScale,
		LinearScale,
		type ChartData,
	} from 'chart.js'
	import {onMount} from 'svelte'

	Chart.register([BarController, BarElement, CategoryScale, LinearScale])
	export let total: {month: string; revenue: number}[]

	let canvasElement: HTMLCanvasElement

	onMount(() => {
		const ctx = canvasElement.getContext('2d')
		if (!ctx) return

		const {labels, revenue} = total.reduce(
			(acc, {month, revenue}) => {
				acc.labels.push(month)
				acc.revenue.push(revenue / 100)
				return acc
			},
			{labels: [] as string[], revenue: [] as number[]},
		)

		const data: ChartData = {
			labels,

			datasets: [
				{
					label: '',
					data: revenue,
					backgroundColor: '#f87171',
					borderRadius: 4,
				},
			],
		}

		new Chart(ctx, {
			type: 'bar',
			data,
			options: {
				scales: {
					y: {
						beginAtZero: true,
					},
				},
				plugins: {
					legend: {
						display: false,
					},
				},
			},
		})
	})
</script>

<canvas class="rounded-xl bg-white p-4" bind:this={canvasElement} />
