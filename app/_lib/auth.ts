import { AuthOptions } from "next-auth";
import { db } from "./prisma";
import { Adapter } from "next-auth/adapters";
import {PrismaAdapter} from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions : AuthOptions = {
    adapter : PrismaAdapter(db) as Adapter,
    providers:[
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              email: { label: "Username", type: "text", placeholder: "jsmith" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const user = await db.user.findUnique({
                    where: { email: credentials?.email }
                });
              
              // If no error and we have user data, return it
              if (user) {
                return user
              }
              // Return null if user data could not be retrieved
              return null
            }
          })
    ],
    secret: process.env.NEXT_AUTH_SECRET,
    callbacks:{
        async session({ session, user }) {
            session.user = { ...session.user, id: user.id } as {
                id: string;
                name: string;
                email: string;
            };

            return session;
        },
    }

}