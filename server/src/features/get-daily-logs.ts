import { and, avg, eq, lte } from "drizzle-orm";
import { db } from "../db";
import { dailyLogs } from "../db/schema";
import dayjs from "dayjs";

export async function getDailyLogs(userId: string) {
  const lastDayOfWeek = dayjs().endOf("week").toISOString();

  const logs = db
    .select({
      averageScore: avg(dailyLogs.score),
      date: dailyLogs.date,
    })
    .from(dailyLogs)
    .where(
      and(eq(dailyLogs.userId, userId), lte(dailyLogs.date, lastDayOfWeek))
    )
    .groupBy(dailyLogs.date);

  const average = await db
    .select({ averageScore: avg(dailyLogs.score) })
    .from(dailyLogs)
    .where(
      and(eq(dailyLogs.userId, userId), lte(dailyLogs.date, lastDayOfWeek))
    );

  return {
    average: average[0].averageScore,
    logs: await logs,
  };
}
