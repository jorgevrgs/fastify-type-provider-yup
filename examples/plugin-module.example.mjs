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
      limit,
    };
  },
});

app.listen({ port: 1337, host: '0.0.0.0' });
