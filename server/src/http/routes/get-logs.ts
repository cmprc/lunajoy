import { FastifyPluginAsync, PassportUser } from "fastify";
import { getDailyLogs } from "../../features/get-logs";

interface User extends PassportUser {
  id: string;
}

export const GetLogsRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.get("/logs", async (request) => {
    if (!request.user) return [];
    return await getDailyLogs((request.user as User).id);
  });

  fastify.get("/ws/logs", { websocket: true }, (connection, req) => {
    console.log("Client connected to WebSocket");

    const user = req.user as User | undefined;
    if (!user) {
      connection.close(1008, "Unauthorized");
      return;
    }

    const interval = setInterval(async () => {
      try {
        const logs = await getDailyLogs(user.id);
        connection.send(JSON.stringify(logs));
      } catch (error) {
        console.error("Error fetching logs:", error);
        connection.send(JSON.stringify({ error: "Error fetching logs" }));
      }
    }, 5000);

    connection.on("close", () => {
      clearInterval(interval);
      console.log("Client disconnected");
    });
  });
};
