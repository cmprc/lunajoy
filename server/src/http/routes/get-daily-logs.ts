import { FastifyPluginAsync, PassportUser } from "fastify";
import { getDailyLogs } from "../../features/get-daily-logs";

interface User extends PassportUser {
  id: string;
}

export const GetDailyLogsRoute: FastifyPluginAsync = async (
  fastify,
  options
) => {
  fastify.get("/logs", async (request) => {
    if (!request.user) return [];
    return await getDailyLogs((request.user as User).id);
  });
};
