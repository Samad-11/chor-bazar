// next-auth.d.ts

import NextAuth from "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            role?: string | null;
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        role?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: string;
    }
}
