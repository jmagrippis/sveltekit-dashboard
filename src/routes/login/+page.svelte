<script>
	import Logo from '../Header/Logo.svelte'
	import LoginForm from './LoginForm.svelte'
</script>

<header
	class="flex h-20 w-full items-end rounded-b-lg bg-primary-500 p-3 md:h-36"
>
	<div class="w-32 text-white md:w-36">
		<Logo />
	</div>
</header>
<main class="flex grow items-center justify-center">
	<div
		class="relative mx-auto flex w-full max-w-[400px] flex-col gap-8 space-y-2.5 p-4 md:-mt-32"
	>
		<LoginForm />
	</div>
</main>
