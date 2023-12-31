import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { SessionInterface, UserProfile } from "@/common.types";
import { getUser, createUser } from "@/lib/actions";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID! || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET! || "",
    }),
  ],

  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: "grafbase",
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret
      );

      return encodedToken;
    },

    decode: async ({ secret, token }) => {
      return jsonwebtoken.verify(token as string, secret) as JWT;
    },
  },

  callbacks: {
    async session({ session, token }) {
      const email = session?.user?.email as string;

      try {
        const data = (await getUser(email)) as { user?: UserProfile };

        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data?.user,
          },
        };

        return newSession;
      } catch (error) {
        console.log("error retrieving user data", error);

        return session;
      }
    },

    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        const userExists = (await getUser((user?.email as string) || "")) as {
          user?: UserProfile;
        };

        if (!userExists.user) {
          await createUser(
            user.email as string,
            user.name as string,
            user.image as string
          );
        }

        return true;
      } catch (error: any) {
        // return new Response("", { status: 500 });
        console.log(error, "💥");
        return false;
      }
    },
  },

  theme: {
    colorScheme: "light",
    // logo: "/logo.png",
  },
};

async function getCurrentUser(): Promise<SessionInterface> {
  const session = (await getServerSession(authOptions)) as SessionInterface;
  return session;
}

export { authOptions, getCurrentUser };
