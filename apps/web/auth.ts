import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(8) });

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const user = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
        if (!user?.passwordHash) return null;
        const validPassword = await compare(parsed.data.password, user.passwordHash);
        if (!validPassword) return null;
        return { id: user.id, email: user.email, name: user.name, image: user.image, role: user.role };
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      const protectedPrefixes = ['/dashboard', '/users', '/roles', '/settings', '/clients', '/contacts', '/sites', '/projects', '/project-members', '/project-history', '/notifications', '/audit', '/study', '/planning', '/delivery-notes', '/reports'];
      const isProtected = protectedPrefixes.some((prefix) => request.nextUrl.pathname.startsWith(prefix));
      return isProtected ? Boolean(auth?.user) : true;
    },
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? '';
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
