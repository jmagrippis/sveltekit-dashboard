<script lang="ts">
	import {Check, Clock} from 'lucide-svelte'

	export let status: string

	$: statusClasses =
		status === 'pending'
			? 'bg-gray-100 text-gray-500'
			: status === 'paid'
			  ? 'bg-green-500 text-white'
			  : ''
</script>

<span
	class="inline-flex items-center rounded-full px-2 py-1 text-xs {statusClasses}"
>
	{#if status === 'pending'}
		Pending
		<Clock class="ml-1 w-4 text-gray-500" />
	{:else if status === 'paid'}
		Paid
		<Check class="ml-1 w-4 text-white" />
	{/if}
</span>
