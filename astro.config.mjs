// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://studio-aether.github.io',
	base: '/customer-docs/',
	integrations: [
		starlight({
			title: 'Studio Aether — Customer Docs',
			description: 'Documentation for Studio Aether resources.',
			customCss: ['./src/styles/custom.css'],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/studio-aether' }],
			sidebar: [
				{
					label: 'Resources',
					collapsed: false,
					items: [{ autogenerate: { directory: 'resources', collapsed: false } }],
				},
			],
		}),
	],
});
