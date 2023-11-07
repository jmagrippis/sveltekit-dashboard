import {Config} from 'tailwindcss'
import colors from 'tailwindcss/colors'

const config: Config = {
	content: ['./src/**/*.{html,svelte,ts}'],
	theme: {
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
