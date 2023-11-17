<script lang="ts">
	import {page} from '$app/stores'
	import {SearchIcon} from 'lucide-svelte'
	import {onMount} from 'svelte'
	import type {EventHandler} from 'svelte/elements'

	$: query = $page.url.searchParams.get('query') || ''

	let timeout: number

	const handleInput: EventHandler<Event, HTMLInputElement> = (event) => {
		clearTimeout(timeout)
		const form = event.currentTarget.form
		if (form) {
			timeout = setTimeout(() => {
				form.requestSubmit()
			}, 300)
		}
	}

	onMount(() => () => clearTimeout(timeout))
</script>

<form
	action={$page.url.pathname}
	class="relative flex grow"
	data-sveltekit-keepfocus
	data-sveltekit-noscroll
>
	<label class="w-full">
		<span class="sr-only">Search invoices</span>
		<input
			on:input={handleInput}
			value={query}
			name="query"
			class="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 outline-2 placeholder:text-gray-500"
			placeholder="Search by name, email, amount, status..."
		/>
		<SearchIcon
			class="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
		/>
	</label>
</form>
