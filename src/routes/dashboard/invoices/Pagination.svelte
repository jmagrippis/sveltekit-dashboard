<script lang="ts">
	import {page} from '$app/stores'
	import * as m from '$m'

	const getNthPageHref = (currentUrl: URL, n: number) => {
		const url = new URL(currentUrl)
		url.searchParams.set('page', String(n))
		return url.pathname + url.search
	}

	export let totalPages: number
	export let totalCount: number

	$: pages = Array.from({length: totalPages}, (_, i) => i + 1)
	$: currentPage = parseInt($page.url.searchParams.get('page') || '1')
	$: prevPageHref = getNthPageHref($page.url, currentPage - 1)
	$: nextPageHref = getNthPageHref($page.url, currentPage + 1)
</script>

<div
	class="flex w-full grow items-center justify-between border-t border-gray-200 bg-white px-2 py-3"
>
	<!-- Small Viewport styles  -->
	<div class="flex w-full flex-1 justify-between sm:hidden">
		{#if currentPage !== 1}
			<a
				href={prevPageHref}
				class="rounded-md border border-gray-300 bg-white px-4 py-2 font-medium capitalize text-gray-700 no-underline hover:bg-gray-50"
				>{m.previous()}</a
			>
		{:else}
			<span />
		{/if}
		{#if currentPage !== totalPages}
			<a
				href={nextPageHref}
				aria-disabled={currentPage === totalPages ? 'true' : undefined}
				class="rounded-md border border-gray-300 bg-white px-4 py-2 font-medium capitalize text-gray-700 no-underline hover:bg-gray-50"
				>{m.next()}</a
			>
		{:else}
			<span />
		{/if}
	</div>
	<!-- Bigger Viewport styles  -->
	<div
		class="hidden gap-4 sm:flex sm:flex-1 sm:items-center sm:justify-between"
	>
		<p class="text-sm text-gray-700">
			<span class="font-medium">{totalCount}</span>
			{m.totalResults()}
		</p>
		<nav
			class="isolate inline-flex -space-x-px rounded-md shadow-sm"
			aria-label="Pagination"
		>
			<a
				href={prevPageHref}
				aria-disabled={currentPage === 1 ? 'true' : undefined}
				class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
			>
				<span class="sr-only">{m.previous()}</span>
				<svg
					class="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
						clip-rule="evenodd"
					/>
				</svg>
			</a>
			{#each pages as p}
				<a
					href={getNthPageHref($page.url, p)}
					aria-current={currentPage === p ? 'page' : undefined}
					class="relative inline-flex items-center px-4 py-2 font-semibold transition-colors focus:z-20"
					class:activePage={currentPage === p}
					class:inactivePage={currentPage !== p}>{p}</a
				>
			{/each}
			<a
				href={nextPageHref}
				aria-disabled={currentPage === totalPages ? 'true' : undefined}
				class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
			>
				<span class="sr-only">{m.next()}</span>
				<svg
					class="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
						clip-rule="evenodd"
					/>
				</svg>
			</a>
		</nav>
	</div>
</div>

<style lang="postcss">
	.activePage {
		@apply z-10 bg-primary-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600;
	}
	.inactivePage {
		@apply text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0;
	}
</style>
