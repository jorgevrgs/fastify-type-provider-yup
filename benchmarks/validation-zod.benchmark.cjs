const fastify = require('fastify')();
const { number, object, union, string } = require('zod');
const {
  serializerCompiler,
  validatorCompiler,
} = require('fastify-type-provider-zod');

fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

const opts = {
  schema: {
    querystring: object({
      page: number().int().gte(1).lte(100).optional().default(1),
    }),
  },
};

fastify.after(() => {
  fastify.get('/', opts, (req, reply) => {
    reply.send({ page: req.query.page });
  });
});

fastify.listen({ port: 3000, host: '127.0.0.1' });