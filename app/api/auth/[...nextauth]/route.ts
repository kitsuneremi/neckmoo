import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextApiRequest, NextApiResponse } from "next"

const handler = NextAuth({

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "test" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const res = await fetch('http://localhost:3000/api/login', {
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
        if(user){
          const {password, ...userWithoutPass} = user;
          return userWithoutPass
        }else{
          return null
        }
      }
    })
  ],
  pages: {
    signIn: "/register",
    signOut: ""
  },
  session: {
    
  }

});

export { handler as GET, handler as POST }
