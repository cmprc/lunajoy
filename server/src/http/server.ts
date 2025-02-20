// server.ts
import fastify from "fastify";
import cors from "@fastify/cors";
import session from "@fastify/session";
import cookie from "@fastify/cookie";
import passport from "@fastify/passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import "dotenv/config";
import { GoogleAuthRoute } from "./routes/google-auth";
import { CreateDailyLogRoute } from "./routes/create-daily-log";
import { GetDailyLogsRoute } from "./routes/get-daily-logs";

const app = fastify();

app.register(cors, {
  origin: "http://localhost:5173",
  credentials: true,
});

app.register(cookie);

app.register(session, {
  secret: process.env.SESSION_SECRET!,
  cookie: { secure: false, path: "/" },
});

app.register(passport.initialize());
app.register(passport.secureSession());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userExists = await db
          .select()
          .from(users)
          .where(eq(users.googleId, profile.id))
          .get();

        if (!userExists) {
          const newUser = await db
            .insert(users)
            .values({
              id: profile.id,
              googleId: profile.id,
              email: profile.emails?.[0].value || "",
              name: profile.displayName,
            })
            .returning();

          return done(null, newUser[0].id);
        }

        return done(null, userExists.id);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

passport.registerUserSerializer(async (userId: any, req) => {
  return userId;
});

passport.registerUserDeserializer(async (userId: string, req) => {
  const user = db.select().from(users).where(eq(users.id, userId)).get();

  if (!user) return null;
  return user;
});

app.register(GoogleAuthRoute);
app.register(CreateDailyLogRoute);
app.register(GetDailyLogsRoute);

app.listen({ port: 3000 }).then(() => {
  console.log("HTTP Server running on http://localhost:3000");
});
