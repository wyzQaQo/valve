import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except for
    // - API routes
    // - Next.js internals / static files
    // - Files with extensions (images, fonts, etc.)
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
  ],
};
