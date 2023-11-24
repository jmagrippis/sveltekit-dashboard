<script lang="ts">
	import '@fontsource-variable/inter'
	import '@fontsource/lusitana/400.css'
	import '@fontsource/lusitana/700.css'

	import './global.css'

	import {onNavigate} from '$app/navigation'
	import {page} from '$app/stores'
	import {setLanguageTag} from '../paraglide/runtime'

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
