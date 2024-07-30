import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "models/userModel";
import bcrypt from "bcryptjs";
import { connectMongoDB } from "@/lib/mongodb";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          await connectMongoDB();
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // @ts-ignore
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const { name, email, image } = user;
        console.log(user);
        try {
          await connectMongoDB();
          const userExists = await User.findOne({ email });

          if (!userExists) {
            // Create new google user
            const hashedPassword = await bcrypt.hash(name + new Date(), 10);
            const newUser = await User.create({
              name,
              email,
              image,
              password: hashedPassword,
            });

            if (newUser) {
              return user;
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
      if (account.provider === "github") {
        const { name, email, image } = user;
        console.log(user);
        try {
          await connectMongoDB();
          const userExists = await User.findOne({ email });

          if (!userExists) {
            // Create new google user
            const hashedPassword = await bcrypt.hash(name + new Date(), 10);
            const newUser = await User.create({
              name,
              email,
              image,
              password: hashedPassword,
            });

            if (newUser) {
              return user;
            }
          }
        } catch (error) {
          console.log("Github error :",error);
        }
      }
      return user;
    },
  },
};
