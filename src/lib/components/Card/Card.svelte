<script lang="ts">
	export let title: string
	export let value: string | number
</script>

<div class="rounded-xl bg-gray-50 p-2 shadow-sm">
	<div class="flex p-4">
		<slot />
		<h3 class="ml-2 font-medium capitalize">{title}</h3>
	</div>
	<p
		class="truncate rounded-xl bg-white px-4 py-8 text-center font-serif text-2xl"
	>
		{value}
	</p>
</div>
