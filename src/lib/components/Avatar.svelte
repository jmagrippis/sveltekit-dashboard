<script lang="ts">
	export let src: string
	export let alt: string
	export let size: number
</script>

<img {src} class="rounded-full" width={size} height={size} {alt} />
