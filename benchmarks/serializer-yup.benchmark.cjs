const fastify = require('fastify')();
const { string, object } = require('yup');
const { fastifyYupPlugin } = require('../dist/cjs/index.js');

const opts = {
  schema: {
    response: {
      200: object({
        hello: string().required(),
      }),
    },
  },
};

fastify.register(fastifyYupPlugin);

fastify.after(() => {
  fastify.get('/', opts, (req, reply) => {
    reply.send({ hello: 'world' });
  });
});

fastify.listen({ port: 3000, host: '127.0.0.1' });
