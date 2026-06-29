export { auth as middleware } from '@/auth';

export const config = { matcher: ['/dashboard/:path*', '/users/:path*', '/roles/:path*', '/settings/:path*', '/clients/:path*', '/contacts/:path*', '/sites/:path*', '/projects/:path*', '/project-members/:path*', '/project-history/:path*', '/notifications/:path*', '/audit/:path*', '/study/:path*', '/planning/:path*', '/delivery-notes/:path*', '/reports/:path*'] };
