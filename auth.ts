import NextAuth from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
// Your own logic for dealing with plaintext password strings; be careful!
import { getUserFromDB } from "@/utils/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null;
  
          const { email, password } = await signInSchema.parseAsync(credentials)

          console.log('email :>> ', email);
          console.log('password :>> ', password);
          // logic to salt and hash password
          // logic to verify if user exists
          user = await getUserFromDB(email, password);
          console.log('auth.ts user :>> ', user);
  
          if (!user) {
            // No user found, so this is their first attempt to login
            // meaning this is also the place you could do registration
            throw new Error("User NOT Found.");
          }
          // return user object with the their profile data
          return user;  
          
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  }
})