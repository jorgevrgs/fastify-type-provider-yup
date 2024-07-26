const fastify = require('fastify')();
const { number, object } = require('yup');
const { fastifyYupPlugin } = require('../dist/cjs/index.js');

const opts = {
  schema: {
    querystring: object({
      page: number().integer().min(1).max(100).default(1),
    }).noUnknown(),
  },
};

fastify.register(fastifyYupPlugin);

fastify.after(() => {
  fastify.get('/', opts, (req, reply) => {
    reply.send({ page: req.query.page });
  });
});

fastify.listen({ port: 3000, host: '127.0.0.1' });
