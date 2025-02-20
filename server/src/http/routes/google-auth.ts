import passport from "@fastify/passport";
import { FastifyPluginAsync } from "fastify";

export const GoogleAuthRoute: FastifyPluginAsync = async (fastify, options) => {
  fastify.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  fastify.get(
    "/auth/google/callback",
    {
      preValidation: passport.authenticate("google", { failureRedirect: "/" }),
    },
    async (request, reply) => {
      reply.redirect("http://localhost:5173/home");
    }
  );

  fastify.get("/auth/logout", async (request, reply) => {
    request.logout();
    reply.redirect("http://localhost:5173/");
  });

  fastify.get("/auth/status", async (req, reply) => {
    if (req.isAuthenticated()) {
      reply.send({ isLoggedIn: true, user: req.user });
    } else {
      reply.send({ isLoggedIn: false });
    }
  });
};
