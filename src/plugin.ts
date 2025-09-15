import type { FastifyPluginAsync } from 'fastify';

import { createSerializerCompiler } from './compilers/create-serializer.compiler.js';
import { createValidatorCompiler } from './compilers/create-validator.compiler.js';
import { defaultYupValidatorCompilerOptions } from './constants.js';
import type { YupPluginOptions } from './types.js';

export const yupPlugin: FastifyPluginAsync<YupPluginOptions> = async (
  fastify,
  options = {},
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
