import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/session";

const AuthHandler = NextAuth(authOptions);

export { AuthHandler as GET, AuthHandler as POST };
