<script lang="ts">
	import {enhance} from '$app/forms'
	import {Trash} from 'lucide-svelte'
	export let id: string
</script>

<form method="POST" action="?/delete" use:enhance>
	<button name="id" value={id} class="rounded-md border p-2 hover:bg-gray-100">
		<span class="sr-only">Delete</span>
		<Trash class="w-5" />
	</button>
</form>
