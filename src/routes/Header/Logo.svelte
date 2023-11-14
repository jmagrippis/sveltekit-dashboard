<script lang="ts">
	import {page} from '$app/stores'

	import {Globe} from 'lucide-svelte'

	$: textElement = $page.url.pathname === '/' ? 'h1' : 'div'
</script>

<div
	class="container flex flex-row items-center gap-4 px-6 font-serif leading-none text-white md:px-20"
>
	<Globe class="h-12 w-12 rotate-[15deg]" />
	<svelte:element this={textElement} class="text-5xl">Acme</svelte:element>
</div>
