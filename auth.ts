import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const creds = credentials as { email: string; password: string };

        if (!creds?.email || !creds?.password) {
          console.log("Missing email or password");
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: creds.email },
          });

          if (!user || !user.password) {
            console.log("User not found or password missing");
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            creds.password,
            user.password
          );

          if (!isPasswordValid) {
            console.log("Invalid password");
            return null;
          }

          if (!user.verified) {
            console.log("User email not verified");
            return null;
          }

          console.log("User authenticated:", user.email);

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
});
