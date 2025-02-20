import { createId } from "@paralleldrive/cuid2";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  googleId: text("google_id").notNull().unique(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
});

export const dailyLogs = sqliteTable("daily_logs", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text("user_id").notNull(),
  date: text("date").notNull(),
  mood: real("mood").notNull(),
  anxietyLevel: real("anxiety_level").notNull(),
  sleepHours: real("sleep_hours").notNull(),
  physicalActivity: integer("physical_activity").notNull(),
  socialInteractions: integer("social_interactions").notNull(),
  stressLevel: real("stress_level").notNull(),
  symptom: text("symptom"),
  score: integer("score"),
});
