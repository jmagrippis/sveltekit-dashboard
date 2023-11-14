<script lang="ts">
	import {goto} from '$app/navigation'
	import {page} from '$app/stores'
	import {Search} from 'lucide-svelte'

	export let placeholder: string

	let value = $page.url.searchParams.get('query') || ''
</script>

<div class="relative flex flex-1 flex-shrink-0">
	<label class="w-full">
		<span class="sr-only">Search</span>
		<input
			class="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
			{placeholder}
			bind:value
			on:change={(event) => {
				const nextUrl = new URL($page.url)
				nextUrl.searchParams.set('query', event.currentTarget.value)
				// TODO: This should be rerunning our load method... but doesn't!
				goto(nextUrl, {invalidateAll: true})
			}}
		/>
		<Search
			class="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
		/>
	</label>
</div>
