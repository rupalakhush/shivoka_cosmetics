import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "@/utility/supabaseClient";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Retrieve the user's additional data from Supabase
      const { data: user, error } = await supabase
        .from("users")
        .select("uid")
        .eq("email", session.user.email)
        .single();

      if (user) {
        // Add custom fields to the session object
        session.user.uid = user.uid;
      } else if (error) {
        console.error("Error fetching user data from Supabase:", error.message);
      }

      return session; // Return the modified session
    },
    async signIn({ user, account, profile }) {
      // Check if the user exists in the database
      const { data: existingUser } = await supabase
        .from("users")
        .select("uid")
        .eq("email", user.email)
        .single();

      if (!existingUser) {
        // If the user does not exist, insert new user into the database
        const { error } = await supabase.from("users").insert({
          uname: user.name || "Anonymous",
          email: user.email,
          password: null, // No password for OAuth users
        });

        if (error) {
          console.error("Error inserting user into database:", error);
          return false; // Reject sign-in
        }
      }

      return true; // Allow sign-in
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
