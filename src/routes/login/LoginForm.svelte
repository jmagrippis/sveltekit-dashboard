<script>
	import {page} from '$app/stores'
	import {signIn} from '@auth/sveltekit/client'
	import {Github, MoveRight} from 'lucide-svelte'
</script>

<form
	method="POST"
	class="flex-1 rounded-lg bg-gray-50 px-6 py-8"
	on:submit|preventDefault={() => [
		signIn('github', {callbackUrl: `${$page.url.origin}/dashboard`}),
	]}
>
	<h1 class="mb-3 font-serif text-2xl">Please log in to continue.</h1>

	<button
		class="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary-500 px-4 font-medium text-white transition-colors hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 active:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
	>
		<Github />
		Sign in with GitHub
		<MoveRight />
	</button>
</form>
