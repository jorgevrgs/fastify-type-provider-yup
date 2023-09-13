import type {
  FastifyBaseLogger,
  FastifyInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify';
import Fastify from 'fastify';
import { expectAssignable, expectType } from 'tsd';
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

expectType<FastifyYupInstance>(fastify.setValidatorCompiler(validatorCompiler));
expectType<FastifyYupInstance>(fastify.setSerializerCompiler(serializerCompiler));
expectAssignable<FastifyYupInstance>(fastify);

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
    expectType<string>(request.query.name);
    reply.send('string');
  },
});
