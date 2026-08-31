// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.studio-aether.com',
	integrations: [
		starlight({
			title: 'Studio Aether Docs',
			description: 'Documentation for Studio Aether resources.',
			customCss: ['./src/styles/custom.css'],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/StarBoyDusk' }],
			sidebar: [
				{
					label: 'Resources',
					items: [{ autogenerate: { directory: 'resources' } }],
				},
			],
		}),
	],
});
