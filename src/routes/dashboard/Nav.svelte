<script lang="ts">
	import {Globe} from 'lucide-svelte'
	import NavLinks from './NavLinks.svelte'
</script>

<nav class="flex h-full flex-col px-3 py-4 md:px-2">
	<a
		class="mb-2 flex h-20 items-end justify-center rounded-md bg-primary-600 p-4 md:h-40 md:justify-start no-underline"
		href="/"
		><div class="w-32 text-white md:w-40">
			<div
				class="flex flex-row items-center font-serif leading-none text-white"
			>
				<Globe size="42" />
				<span class="text-[44px]">Acme</span>
			</div>
		</div></a
	>
	<NavLinks />
</nav>
