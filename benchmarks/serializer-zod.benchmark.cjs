const fastify = require('fastify')();
const { string, object } = require('zod');
const {
  serializerCompiler,
  validatorCompiler,
} = require('fastify-type-provider-zod');

fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

const opts = {
  schema: {
    response: {
      200: object({
        hello: string(),
      }),
    },
  },
};

fastify.after(() => {
  fastify.get('/', opts, (req, reply) => {
    reply.send({ hello: 'world' });
  });
});

fastify.listen({ port: 3000, host: '127.0.0.1' });
