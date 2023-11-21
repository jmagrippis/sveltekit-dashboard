<script>
	import Logo from '../Header/Logo.svelte'
	import LoginForm from './LoginForm.svelte'
</script>

<main class="flex items-center justify-center md:h-screen">
	<div
		class="relative mx-auto flex w-full max-w-[400px] flex-col gap-8 space-y-2.5 p-4 md:-mt-32"
	>
		<div
			class="flex h-20 w-full items-end rounded-lg bg-primary-500 p-3 md:h-36"
		>
			<div class="w-32 text-white md:w-36">
				<Logo />
			</div>
		</div>
		<LoginForm />
	</div>
</main>
