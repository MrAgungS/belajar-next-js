import { login, loginWithGoogle } from "@/lib/firebase/service";
import { compare } from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { email, password, } = credentials as any;

        const user = await login ({ email });

        if (user) {
          const passwordConfirm = await compare(password, user.password)
          if (passwordConfirm) {
            return user;
          }
          return null;
        } else {
          return null;
        }
        
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET  || "",
    })
  ],

  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      if (account?.provider === "google") {
        const data = {
          fullname: user.name,
          email: user.email,
          type: 'google',
        }

        await loginWithGoogle(data, (result: {status: boolean; data: any}) => {
          if (result.status) {
            token.email = result.data.email;
            token.fullname = result.data.fullname;
            token.role = result.data.role;
          }
        });
      }
      return token;
    },

    async session({ session, token }) {
      if (token.email) session.user.email = token.email;
      if (token.name) session.user.name = token.name;
      if (token.role) session.user.role = token.role;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
