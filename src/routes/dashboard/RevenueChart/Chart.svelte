<script lang="ts">
	import {formatCurrencyInCents} from '$lib/formatCurrency'
	import Chart from 'chart.js/auto'
	import {onMount} from 'svelte'

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

		const data = {
			labels,
			datasets: [
				{
					label: '',
					data: revenue,
					backgroundColor: '#f87171',
				},
			],
		}

		new Chart(ctx, {
			type: 'bar',
			data: data,
			options: {
				scales: {
					y: {
						beginAtZero: true,
					},
				},
			},
		})
	})
</script>

<canvas bind:this={canvasElement} />
