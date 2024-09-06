import daisyui from 'daisyui';
import { bumblebee } from 'daisyui/src/theming/themes';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Noto Sans', 'Open Sans', 'Helvetica', 'Arial', 'sans-serif']
			}
		}
	},
	plugins: [daisyui],
	daisyui: {
		themes: [
			{
				custom: {
					...bumblebee,
					accent: '#e15a1d',
					'--rounded-box': '0.5rem'
				}
			}
		]
	}
};
