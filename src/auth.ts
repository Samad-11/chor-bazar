import NextAuth from "next-auth"
import { Provider } from "next-auth/providers"
import Credentials from "next-auth/providers/credentials"
import prisma from "./lib/prisma"
import { hash } from "bcryptjs"


const providers: Provider[] = [
  Credentials({
    name: "credential",
    credentials: {
      email: { label: "Email", type: "text", placeholder: "Enter your email" },
      password: { label: "Password", type: "password", placeholder: "Enter your password" },
    },
    async authorize(credential) {
      if (!credential.email || !credential.password) {
        return null
      }

      const user = await prisma.user.findUnique(
        {
          where: {
            email: credential.email as string
          }
        }
      )


      if (!user || !user.hashedPassword) {
        return null
      }

      const isPasswordCorrect = await hash(credential.password as string, user.hashedPassword)
      if (!isPasswordCorrect) {
        return null
      }

      const { hashedPassword, ...userWithoutPass } = user
      return userWithoutPass
    }
  })
]

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login"
  }
})