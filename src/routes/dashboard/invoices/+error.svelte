<script lang="ts">
	import {Frown, RefreshCw} from 'lucide-svelte'
</script>

<main class="flex flex-col items-center gap-2 text-2xl">
	<div class="flex items-center gap-2">
		<Frown /> Apologies, something went wrong!
	</div>
	<a class="flex items-center gap-2" href="/dashboard/invoices"
		><RefreshCw /> Retry?
	</a>
</main>
