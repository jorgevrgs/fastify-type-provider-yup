import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { extendSchema } from "@sodaru/yup-to-json-schema";
import Fastify from "fastify";
import * as yup from "yup";
import { Schema, addMethod } from "yup";
import { jsonSchemaTransformer } from "../src/json-transformer";
import { serializerCompiler } from "../src/serializer-compiler";
import type { YupTypeProvider } from "../src/type-provider";
import { validatorCompiler } from "../src/validator-compiler";

extendSchema({ addMethod, Schema });

const app = Fastify({ logger: true });
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "SampleApi",
      description: "Sample backend service",
      version: "1.0.0",
    },
    servers: [],
  },
  transform: jsonSchemaTransformer,
});

app.register(fastifySwaggerUI, {
  routePrefix: "/docs",
});

app.after(() => {
  app.withTypeProvider<YupTypeProvider>().route({
    url: "/",
    method: "POST",
    schema: {
      description: "Description details",
      tags: ["home"],
      body: yup.object({
        page: yup.number().default(1),
      }),
      response: {
        200: yup.object({
          page: yup.string().example("1"),
        }),
      },
    },
    handler: async (request, reply) => {
      const { page } = request.body;

      return {
        page: String(page),
      };
    },
  });
});

app.listen({ port: 8080, host: "0.0.0.0" });
