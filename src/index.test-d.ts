import type {
  FastifyBaseLogger,
  FastifyInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify';
import Fastify from 'fastify';
import { expectTypeOf } from 'vitest';
import * as yup from 'yup';

import { serializerCompiler } from '../src/serializer-compiler';
import type { YupTypeProvider } from '../src/type-provider';
import { validatorCompiler } from '../src/validator-compiler';

const fastify = Fastify().withTypeProvider<YupTypeProvider>();

type FastifyYupInstance = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyBaseLogger,
  YupTypeProvider
>;

expectTypeOf(fastify.setValidatorCompiler(validatorCompiler)).toMatchTypeOf<FastifyYupInstance>;
expectTypeOf(fastify.setSerializerCompiler(serializerCompiler)).toMatchTypeOf<FastifyYupInstance>;
expectTypeOf(fastify).toMatchTypeOf<FastifyYupInstance>;

fastify.route({
  method: 'GET',
  url: '/',
  schema: {
    querystring: yup.object({
      name: yup.string().min(4).required(),
    }),
    response: {
      200: yup.string(),
    },
  },
  handler: (request, reply) => {
    expectTypeOf<string>(request.query.name).toMatchTypeOf<string>;
    reply.send('string');
  },
});
