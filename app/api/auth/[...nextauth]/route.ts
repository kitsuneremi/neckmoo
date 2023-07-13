import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "test" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const url = process.env.VERCEL ? 'https://erinasaiyukii.com/api/login' : 'http://localhost:3000/api/login'
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          })
        })

        const user = await res.json();
        if (user) {
          const { password, ...userWithoutPass } = user;
          return userWithoutPass
        } else {
          return null
        }
      }
    })
  ],
  pages: {
    signIn: "/register",
    signOut: ""
  },
  callbacks: {
    async jwt({ token, user }) {
      return {
        ...user,
        ...token
      }
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    }
  }

});

export { handler as GET, handler as POST }