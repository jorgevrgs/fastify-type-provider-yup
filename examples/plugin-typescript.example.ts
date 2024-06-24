import Fastify from 'fastify';
import fp from 'fastify-plugin';
import * as yup from 'yup';
import { yupPlugin } from '../src/plugin';
import type { YupTypeProvider } from '../src/type-provider';

const app = Fastify({ logger: true });
app.register(fp(yupPlugin));
app.withTypeProvider<YupTypeProvider>().route({
  method: 'GET',
  url: '/',
  schema: {
    querystring: yup
      .object({
        page: yup.number().default(1),
      })
      .noUnknown(),
    response: {
      200: yup.object({
        page: yup.string(),
      }),
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handler: async (request, reply) => {
    const { page } = request.query;

    return {
      page: String(page),
    };
  },
});

app.listen({ port: 8080, host: '0.0.0.0' });
