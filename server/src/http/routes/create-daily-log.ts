import fastify, { FastifyPluginAsync, PassportUser } from "fastify";
import z from "zod";
import { createDailyLog } from "../../features/create-daily-log";

interface User extends PassportUser {
  id: string;
}

export const CreateDailyLogRoute: FastifyPluginAsync = async (
  fastify,
  options
) => {
  fastify.post("/log", async (req, reply) => {
    const createDailyLogSchema = z.object({
      mood: z.number().min(1).max(10),
      anxietyLevel: z.number().min(1).max(10),
      sleepHours: z.number().min(1).max(24),
      physicalActivity: z.number().min(1).max(10),
      socialInteractions: z.number().min(1).max(10),
      stressLevel: z.number().min(1).max(10),
      symptom: z.string(),
    });

    const data = createDailyLogSchema.parse(req.body);
    const userId = (req.user as User).id;

    if (!userId) {
      return reply.status(401).send({ success: false, error: "Unauthorized" });
    }

    const dailyLog = await createDailyLog(data, userId);
    reply.send({ success: true });
  });
};
