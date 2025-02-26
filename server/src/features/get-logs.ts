import dayjs from "dayjs";
import { and, avg, count, eq, gte, lte, sql } from "drizzle-orm";
import { db } from "../db";
import { dailyLogs } from "../db/schema";

export async function getDailyLogs(userId: string) {
  const today = dayjs().toISOString();
  const sevenDaysAgo = dayjs().subtract(7, "days").toISOString();

  const logs = await db
    .select({
      averageScore: avg(dailyLogs.score),
      date: dailyLogs.date,
    })
    .from(dailyLogs)
    .where(
      and(
        eq(dailyLogs.userId, userId),
        gte(dailyLogs.date, sevenDaysAgo),
        lte(dailyLogs.date, today)
      )
    )
    .groupBy(sql`DATE(${dailyLogs.date})`);

  const stats = await db
    .select({
      averageScore: avg(dailyLogs.score),
      logCount: count(),
    })
    .from(dailyLogs)
    .where(
      and(
        eq(dailyLogs.userId, userId),
        gte(dailyLogs.date, sevenDaysAgo),
        lte(dailyLogs.date, today)
      )
    );

  return {
    average: stats[0]?.averageScore || 0,
    total: stats[0]?.logCount || 0,
    logs,
  };
}
