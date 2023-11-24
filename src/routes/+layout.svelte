<script lang="ts">
	import '@fontsource-variable/inter'
	import '@fontsource/lusitana/400.css'
	import '@fontsource/lusitana/700.css'

	import './global.css'

	import {onNavigate} from '$app/navigation'
	import {page} from '$app/stores'
	import {setLanguageTag} from '../paraglide/runtime'
	import {availableLocales, isAvailableLocale} from '$lib/i18n'
	import {enhance} from '$app/forms'
	import * as m from '$m'

	export let data

	setLanguageTag(data.locale)

	onNavigate((navigation) => {
		if (
			!document.startViewTransition ||
			navigation.from?.url.pathname === navigation.to?.url.pathname
		)
			return

		return new Promise((resolve) => {
			document.startViewTransition &&
				document.startViewTransition(async () => {
					resolve()
					await navigation.complete
				})
		})
	})

	const defaultMetadata = {
		title: 'Acme Dashboard',
		description:
			'The official "Next/Learn... but it’s SvelteKit" Course Dashboard',
	}

	$: title = $page.data?.metadata?.title
		? `${$page.data.metadata.title} | Acme Dashboard`
		: defaultMetadata.title
	$: description = $page.data?.metadata?.description
		? $page.data.metadata.description
		: defaultMetadata.description
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<meta property="og:title" content={title} />
	<meta property="og:type" content="website" />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="SvelteKit/Learn Acme Dashboard" />
	<meta property="og:url" content={$page.url.href} />

	<meta
		property="og:image"
		content={`${$page.url.origin}/opengraph-image.png`}
	/>

	<meta name="twitter:card" content="summary_large_image" />
	<meta
		name="twitter:image:alt"
		content="A stylised version of this Dashboard app"
	/>
</svelte:head>

<slot />

<footer class="my-2 flex flex-col items-center gap-2">
	<div>{m.madeWithLove()}</div>
	<form
		method="POST"
		action="/?/setLang"
		use:enhance={() => {
			return async ({result, update}) => {
				if (result.type === 'success') {
					if (isAvailableLocale(result.data?.lang)) {
						setLanguageTag(result.data.lang)
					}
				}

				await update({invalidateAll: true})

				location.reload()
			}
		}}
	>
		<label>
			{m.currentLanguage()}
			<select
				name="lang"
				class="rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600"
				on:change={(event) => {
					event.currentTarget.form?.requestSubmit()
				}}
			>
				{#each availableLocales as language}
					<option
						value={language}
						selected={language === data.locale ? true : undefined}
						>{language}</option
					>
				{/each}
			</select>
		</label>
	</form>
</footer>
