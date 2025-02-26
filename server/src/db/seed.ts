import "dotenv/config";
import { db } from "./index";
import { dailyLogs, users } from "./schema";

async function seed() {
  await db.delete(users);
  await db.delete(dailyLogs);

  const result = await db
    .insert(users)
    .values([
      { googleId: "78dsa97dsadsa997", email: "user@mail.com", name: "Michael" },
    ])
    .returning();

  await db.insert(dailyLogs).values([
    {
      userId: result[0].id,
      date: "2023-01-01",
      mood: 3,
      anxietyLevel: 2,
      sleepHours: 7,
      physicalActivity: 8,
      socialInteractions: 8,
      stressLevel: 6,
      symptom: "Headache",
      score: 44,
    },
  ]);
}

seed();
