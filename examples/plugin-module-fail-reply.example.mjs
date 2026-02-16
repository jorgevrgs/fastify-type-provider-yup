// @ts-check
import Fastify from 'fastify';
import { number, object, string } from 'yup';
import { fastifyYupPlugin } from '../dist/index.js';

const app = Fastify({ logger: true });
app.register(fastifyYupPlugin);

app.route({
  method: 'GET',
  url: '/',
  schema: {
    querystring: object({
      page: number().default(1),
      limit: number().default(10),
    }).noUnknown(),
    response: {
      200: object({
        page: string(),
        limit: number(),
      }),
    },
  },
  /** @type {import('fastify').RouteHandler<{ Querystring: {page: number; limit: number} }>} */
  handler: async (request, reply) => {
    const { page, limit } = request.query;

    return {
      page,
      limit: {
        value: limit,
      },
    };
  },
});

app.setErrorHandler((error, request, reply) => {
  request.log.error(error);

  reply.status(400).send({
    message: error.message,
    errors: error.cause.inner.map((e) => ({
      path: e.path,
      name: e.name,
      message: e.message,
      input: e.originalValue,
    })),
    code: error.code,
    method: request.method,
    url: request.url,
  });
});

app.listen({ port: 1337, host: '0.0.0.0' });
