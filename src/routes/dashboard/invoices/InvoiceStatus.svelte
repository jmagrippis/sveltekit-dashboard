<script lang="ts">
	import {Check, Clock} from 'lucide-svelte'
	import * as m from '$m'

	export let status: string

	$: statusClasses =
		status === 'pending'
			? 'bg-gray-100 text-gray-500'
			: status === 'paid'
				? 'bg-green-500 text-white'
				: ''
</script>

<span
	class="inline-flex items-center rounded-full px-2 py-1 text-xs capitalize {statusClasses}"
>
	{#if status === 'pending'}
		{m.pending()}
		<Clock class="ml-1 w-4 text-gray-500" />
	{:else if status === 'paid'}
		{m.paid()}
		<Check class="ml-1 w-4 text-white" />
	{/if}
</span>
