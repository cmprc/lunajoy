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

  // fastify.get("/ws/logs", { websocket: true }, (connection, req) => {
  //   console.log("Client connected to WebSocket");

  //   // Example: Send logs every 5 seconds (or push updates when available)
  //   const interval = setInterval(async () => {
  //     const logs = await getDailyLogs(req.user?.id || "defaultUserId");
  //     connection.socket.send(JSON.stringify(logs));
  //   }, 5000);

  //   connection.socket.on("close", () => {
  //     clearInterval(interval);
  //     console.log("Client disconnected");
  //   });
  // });
};
