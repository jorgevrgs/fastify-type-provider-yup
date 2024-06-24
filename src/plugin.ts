import type { FastifyPluginAsync } from 'fastify';

import { createSerializerCompiler } from './compilers/create-serializer.compiler';
import { createValidatorCompiler } from './compilers/create-validator.compiler';
import { defaultYupValidatorCompilerOptions } from './constants';
import type { YupPluginOptions } from './types';

export const yupPlugin: FastifyPluginAsync<YupPluginOptions> = async (
  fastify,
  options,
) => {
  const {
    serializerCompilerOptions = defaultYupValidatorCompilerOptions,
    validatorCompilerOptions = defaultYupValidatorCompilerOptions,
  } = options;

  const validatorCompiler = createValidatorCompiler(validatorCompilerOptions);
  const serializerCompiler = createSerializerCompiler(
    serializerCompilerOptions,
  );

  void fastify
    .setValidatorCompiler(validatorCompiler)
    .setSerializerCompiler(serializerCompiler);
};
