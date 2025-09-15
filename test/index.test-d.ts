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

import {
  createSerializerCompiler,
  createValidatorCompiler,
  defaultYupValidatorCompilerOptions,
} from '../src';
import type { YupTypeProvider } from '../src/type-provider';

const fastify = Fastify().withTypeProvider<YupTypeProvider>();

type FastifyYupInstance = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyBaseLogger,
  YupTypeProvider
>;

const validatorCompiler = createValidatorCompiler(
  defaultYupValidatorCompilerOptions,
);
const serializerCompiler = createSerializerCompiler(
  defaultYupValidatorCompilerOptions,
);

expectTypeOf(fastify.setValidatorCompiler(validatorCompiler))
  .toExtend<FastifyYupInstance>;

expectTypeOf(fastify.setSerializerCompiler(serializerCompiler))
  .toExtend<FastifyYupInstance>;

expectTypeOf(fastify).toExtend<FastifyYupInstance>;

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
    expectTypeOf(request.query.name).toExtend<string>;
    reply.send('string');
  },
});
