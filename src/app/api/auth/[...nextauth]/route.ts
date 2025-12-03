import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";


const authOptions: NextAuthOptions ={
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "credentials",
            credentials: {
                email: {label: "Email", type:'email'},
                password: {label:"Password", type: 'password'}
            },
            async authorize(credentials){
                const {email, password} = credentials as {
                    email: string;
                    password: string;
                };
                const user: any ={
                    id: 1,
                    name: "agung",
                    email: "agung@gmail.com",
                    role: "admin"
                }
                if (email === "agung@gmail.com" && password === "2005") {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({token, account, profile, user}: any) {
            if (account?.provider === "credential") {
                token.email = user.email;
                token.name = user.name;
                token.role = user.role;
            }
            return token
        },
        async session({session,token} : any) {
            if ('email' in token) {
                session.user.email = token.email;
            }
            if ('fullname' in token) {
                session.user.name = token.name;
            }
            if ('role' in token) {
                session.user.role = token.role;
            }
            return session
        }
    },
    pages: {
        signIn: '/login',
    }
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};