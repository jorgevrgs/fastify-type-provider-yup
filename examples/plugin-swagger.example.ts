import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { extendSchema } from '@sodaru/yup-to-json-schema';
import Fastify from 'fastify';
import * as yup from 'yup';
import { Schema, addMethod } from 'yup';
import type { YupTypeProvider } from '../src/index.js';
import { fastifyYupPlugin, jsonSchemaTransformer } from '../src/index.js';

extendSchema({ addMethod, Schema });

const app = Fastify({ logger: true });

app.register(fastifyYupPlugin);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'SampleApi',
      description: 'Sample backend service',
      version: '1.0.0',
    },
    servers: [],
  },
  transform: jsonSchemaTransformer,
});

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
});

app.after(() => {
  app.withTypeProvider<YupTypeProvider>().route({
    url: '/',
    method: 'POST',
    schema: {
      description: 'Description details',
      tags: ['home'],
      body: yup.object({
        page: yup.number().default(1),
        limit: yup.number().default(10),
      }),
      response: {
        200: yup
          .object({
            page: yup.string().example('1').required(),
            limit: yup.number().example(10).required(),
          })
          .example({ page: '1', limit: 10 }),
      },
    },
    handler: async (request, reply) => {
      const { page, limit } = request.body;

      return {
        page: String(page),
        limit: limit,
      };
    },
  });
});

app.listen({ port: 1337, host: '0.0.0.0' });
