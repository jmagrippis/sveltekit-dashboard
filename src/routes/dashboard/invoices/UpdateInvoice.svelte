<script lang="ts">
	import {Pencil} from 'lucide-svelte'
	export let id: string
</script>

<a
	href={`/dashboard/invoices/${id}/edit`}
	class="rounded-md border p-2 text-gray-900 hover:bg-gray-100"
	><Pencil class="w-5" /></a
>
