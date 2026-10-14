import { getEntry } from 'astro:content';
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

export const onRequest = defineRouteMiddleware(async (context) => {
	const route = context.locals.starlightRoute;
	const match = route.id.match(/^resources\/([^/]+)\/(.+)$/);
	if (!match) return;
	const product = await getEntry('docs', `resources/${match[1]}`);
	if (!product) return;
	const title = `${route.entry.data.title} - ${product.data.title} for RedM | Studio Aether Docs`;
	const tag = route.head.find((entry) => entry.tag === 'title');
	if (tag) tag.content = title;
	const og = route.head.find((entry) => entry.tag === 'meta' && entry.attrs?.property === 'og:title');
	if (og?.attrs) og.attrs.content = title;
});
