import { db } from "../db";
import { dailyLogs } from "../db/schema";
import { calculateMentalHealthScore } from "./calculate-score";

interface createDailyLogProps {
  mood: number;
  anxietyLevel: number;
  sleepHours: number;
  physicalActivity: number;
  socialInteractions: number;
  stressLevel: number;
  symptom: string;
}

export async function createDailyLog(
  {
    mood,
    anxietyLevel,
    sleepHours,
    physicalActivity,
    socialInteractions,
    stressLevel,
    symptom,
  }: createDailyLogProps,
  userId: string
) {
  const date = new Date().toISOString().split("T")[0];

  const score = calculateMentalHealthScore({
    mood,
    anxietyLevel,
    sleepHours,
    physicalActivity,
    socialInteractions,
    stressLevel,
  });

  const result = await db.insert(dailyLogs).values({
    userId,
    date,
    mood,
    anxietyLevel,
    sleepHours,
    physicalActivity,
    socialInteractions,
    stressLevel,
    symptom,
    score,
  });

  return result;
}
