const { fastifyYupPlugin } = require('../dist/cjs');
const Fastify = require('fastify');
const yup = require('yup');
const fp = require('fastify-plugin');

const plugin = async (fastify) => {
  fastify.register(fastifyYupPlugin);
};

const app = Fastify({ logger: true });
app.register(fp(plugin));

app.route({
  method: 'GET',
  url: '/',
  schema: {
    querystring: yup
      .object({
        page: yup.number().default(1),
        limit: yup.number().default(10),
      })
      .noUnknown(),
    response: {
      200: yup.object({
        page: yup.string(),
        limit: yup.number(),
      }),
    },
  },
  handler: async (request, reply) => {
    const { page, limit } = request.query;

    return {
      page,
      limit,
    };
  },
});

app.listen({ port: 1337, host: '0.0.0.0' });
