// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://studio-aether.github.io',
	base: '/customer-docs/',
	integrations: [
		starlight({
			title: 'Studio Aether Docs',
			description: 'Documentation for Studio Aether RedM resources: fantasy creatures, cosmetics and world systems for fantasy and medieval roleplay servers.',
			head: [
				{ tag: 'meta', attrs: { property: 'og:image', content: 'https://studio-aether.github.io/customer-docs/og-image.jpg' } },
				{ tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
				{ tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
				{ tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
				{ tag: 'meta', attrs: { name: 'twitter:image', content: 'https://studio-aether.github.io/customer-docs/og-image.jpg' } },
				{ tag: 'link', attrs: { rel: 'alternate', type: 'text/plain', title: 'llms.txt', href: '/customer-docs/llms.txt' } },
				{
					tag: 'script',
					attrs: { type: 'application/ld+json' },
					content: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'Organization',
						'@id': 'https://studio-aether.tebex.io/#organization',
						name: 'Studio Aether',
						url: 'https://studio-aether.tebex.io',
						description: 'Studio Aether - RedM scripts, creatures and systems for fantasy and medieval roleplay servers.',
						sameAs: ['https://github.com/studio-aether', 'https://studio-aether.github.io/customer-docs/'],
					}),
				},
			],
			customCss: ['./src/styles/custom.css'],
			routeMiddleware: './src/routeData.ts',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/studio-aether' }],
			sidebar: [
				{
					label: 'Resources',
					collapsed: false,
					items: [{ autogenerate: { directory: 'resources', collapsed: false } }],
				},
				{
					label: 'Guides',
					items: [{ autogenerate: { directory: 'guides' } }],
				},
			],
		}),
	],
});
