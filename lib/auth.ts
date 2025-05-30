import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub, Google],
  callbacks: {
    authorized: async ({ auth }) => {
      // console.log("auth: ", auth);
      // console.log("Your name: ", auth?.user?.name);
      return !!auth;
    },
    
  },
  pages: {
    signIn: '/login',
  },
}
);