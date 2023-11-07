<script lang="ts">
	import {Files, Home, Power, Users2} from 'lucide-svelte'
	import {page} from '$app/stores'

	const links = [
		{
			label: 'Home',
			href: '/dashboard',
			icon: Home,
		},
		{
			label: 'Invoices',
			href: '/dashboard/invoices',
			icon: Files,
		},
		{
			label: 'Customers',
			href: '/dashboard/customers',
			icon: Users2,
		},
	]
</script>

<div
	class="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2"
>
	{#each links as { label, href, icon }}
		<a
			aria-label={label}
			class="flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-primary-600 md:flex-none md:justify-start md:p-2 md:px-3 bg-gray-50 text-black"
			class:active={$page.url.pathname === href}
			{href}
		>
			<svelte:component this={icon} />
			<p class="hidden md:block">label</p></a
		>
	{/each}
	<div class="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
	<form action="" method="POST">
		<button
			class="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-primary-600 md:flex-none md:justify-start md:p-2 md:px-3"
		>
			<Power />
			<div class="hidden md:block">Sign Out</div></button
		>
	</form>
</div>

<style>
	.active {
		@apply bg-primary-50 text-primary-600;
	}
</style>
