const fastify = require('fastify')();

const opts = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        page: {
          type: 'integer',
          default: 1,
          minimum: 1,
          maximum: 100,
        },
      },
    },
  },
};

fastify.get('/', opts, (req, reply) => {
  reply.send({ page: req.query.page });
});

fastify.listen({ port: 3000, host: '127.0.0.1' });
