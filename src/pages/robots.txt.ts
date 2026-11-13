import type { APIRoute } from 'astro';
import site from '../data/site.json';

export const GET: APIRoute = () =>
  new Response(`User-agent: *\n${site.publishReady ? 'Allow: /' : 'Disallow: /'}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
