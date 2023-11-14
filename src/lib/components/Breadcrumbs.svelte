<script lang="ts">
	type Breadcrumb = {
		label: string
		href: string
		active?: boolean
	}

	export let breadcrumbs: Breadcrumb[]
</script>

<nav aria-label="Breadcrumb" class="mb-6 block">
	<ol class="flex font-serif text-xl md:text-2xl">
		{#each breadcrumbs as breadcrumb, index}
			<li
				aria-current={breadcrumb.active}
				class:text-gray-900={breadcrumb.active}
				class:text-gray-500={!breadcrumb.active}
			>
				<a href={breadcrumb.href}>{breadcrumb.label}</a>
				{#if index < breadcrumbs.length - 1}
					<span class="mx-3 inline-block">/</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
