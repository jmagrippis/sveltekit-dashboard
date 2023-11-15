<script lang="ts">
	import '@fontsource-variable/inter'
	import '@fontsource/lusitana/400.css'
	import '@fontsource/lusitana/700.css'

	import './global.css'

	import {onNavigate} from '$app/navigation'

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
</script>

<slot />
