<script lang="ts">
	import {MoveRight} from 'lucide-svelte'

	import mobileAvif from './hero-mobile.png?w=720&format=avif&as=srcset&img'
	import mobileWebp from './hero-mobile.png?w=720&format=webp&as=srcset&img'
	import mobileFallback from './hero-mobile.png?w=720&as=metadata&img'

	import desktopAvif from './hero-desktop.png?w=800;1200;1400&format=avif&as=srcset&img'
	import desktopWebp from './hero-desktop.png?w=800;1200;1400&format=webp&as=srcset&img'
	import desktopFallback from './hero-desktop.png?w=1400&as=metadata&img'
	import Header from './Header/Header.svelte'

	export let data
</script>

<Header />

<main class="flex grow flex-col gap-4 md:flex-row">
	<div
		class="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20"
	>
		<p class="font-serif text-xl text-gray-800 md:text-3xl md:leading-normal">
			{data.messages.marketingHero}
		</p>
		<a
			class="flex items-center gap-4 self-start rounded-lg bg-primary-500 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-400 md:text-base"
			href="/login"><span>{data.messages.login}</span><MoveRight /></a
		>
	</div>
	<div class="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
		<picture class="md:hidden">
			<source srcset={mobileAvif} type="image/avif" />
			<source srcset={mobileWebp} type="image/webp" />
			<img
				src={mobileFallback}
				alt="Screenshots of the dashboard project showing desktop and mobile versions"
				width={mobileFallback.width}
				height={mobileFallback.height}
			/>
		</picture>

		<picture class="hidden md:block">
			<source srcset={desktopAvif} type="image/avif" />
			<source srcset={desktopWebp} type="image/webp" />
			<img
				src={desktopFallback}
				alt="Screenshots of the dashboard project showing desktop and mobile versions"
				width={desktopFallback.width}
				height={desktopFallback.height}
			/>
		</picture>
	</div>
</main>
