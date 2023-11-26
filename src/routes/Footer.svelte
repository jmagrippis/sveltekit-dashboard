<script lang="ts">
	import {setLanguageTag} from '../paraglide/runtime'
	import {isAvailableLocale, labeledLanguages} from '$lib/i18n'
	import {enhance} from '$app/forms'
	import * as m from '$m'
	import {page} from '$app/stores'
</script>

<footer class="flex flex-col items-center gap-2 bg-gray-50 p-3">
	<div class="flex gap-1">
		{m.madeWithLove()}<a
			href="https://magrippis.com"
			target="_blank"
			rel="noopener noreferrer"
		>
			Johnny
		</a>
	</div>
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
				class="cursor-pointer rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600"
				on:change={(event) => {
					event.currentTarget.form?.requestSubmit()
				}}
			>
				{#each labeledLanguages as { locale, label }}
					<option
						lang={locale}
						value={locale}
						selected={locale === $page.data.locale ? true : undefined}
						>{label} ({locale})</option
					>
				{/each}
			</select>
		</label>
	</form>
</footer>
