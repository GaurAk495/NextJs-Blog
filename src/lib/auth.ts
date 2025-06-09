import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/index";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  appName: "My Blog",
  trustedOrigins: ["http://localhost:3000"],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },

  session: {
    expiresIn: 604800,
    updateAge: 86400,
    advanced: {
      useSecureCookies: process.env.STAGE === "Production",
      defaultCookieAttributes: {
        httpOnly: true,
        secure: process.env.STAGE === "Production",
      },
    },
  },
});
