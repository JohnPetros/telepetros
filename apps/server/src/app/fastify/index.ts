import Fastify, { type FastifyInstance } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import Cors from "@fastify/cors";
import Jwt from "@fastify/jwt";

import type { IServerApp } from "@telepetros/core/interfaces";

import { ChannelsRoutes } from "./routes";
import { AuthRoutes } from "./routes/auth-routes";
import { ENV } from "@/constants";

export class FastifyApp implements IServerApp {
  private readonly app: FastifyInstance;

  constructor() {
    this.app = Fastify();

    this.app.register(Cors, { origin: "*" });
    this.app.setSerializerCompiler(serializerCompiler);
    this.app.setValidatorCompiler(validatorCompiler);
    this.app.register(Jwt, { secret: ENV.jwtSecret });
    this.app.register(AuthRoutes, { prefix: "/auth" });
    this.app.register(ChannelsRoutes, { prefix: "/channels" });
  }

  startServer() {
    this.app.listen({ port: ENV.port }).then(() => {
      console.log(`Server running on port: ${ENV.port}`);
    });
  }

  stopServer() {}
}
