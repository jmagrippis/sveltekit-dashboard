import {Config} from 'tailwindcss'
import colors from 'tailwindcss/colors'

const config: Config = {
	content: ['./src/**/*.{html,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: "'Inter Variable', sans-serif",
			serif: "'Lusitana', sans-serif",
		},
		extend: {
			colors: {
				primary: colors.rose,
				svelte: '#ff3e00',
			},
		},
	},
	plugins: [],
}

export default config
