import { and, avg, count, eq, lte } from "drizzle-orm";
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

  const stats = await db
    .select({
      averageScore: avg(dailyLogs.score),
      logCount: count(),
    })
    .from(dailyLogs)
    .where(
      and(eq(dailyLogs.userId, userId), lte(dailyLogs.date, lastDayOfWeek))
    );

  return {
    average: stats[0]?.averageScore || 0,
    total: stats[0]?.logCount || 0,
    logs: await logs,
  };
}
