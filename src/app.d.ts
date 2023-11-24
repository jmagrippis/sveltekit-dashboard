// See https://kit.svelte.dev/docs/types#app

import type {AvailableLocale} from './lib/i18n'

// for information about these interfaces
declare global {
	declare module '*&img'

	// fresh API just dropped, let's extend Document
	interface Document {
		startViewTransition?(callback: () => Promise<void>): void
	}

	namespace App {
		// interface Error {}
		interface Locals {
			locale: AvailableLocale
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {}
