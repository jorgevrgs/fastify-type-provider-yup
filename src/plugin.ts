import type { FastifyPluginAsync } from "fastify";
import { createValidatorCompiler } from "./validator-compiler";
import { createSerializerCompiler } from "./serializer-compiler";
import type { YupPluginOptions } from "./types";

export const yupPlugin: FastifyPluginAsync<YupPluginOptions> = async (
  fastify,
  options,
) => {
  const { serializerCompilerOptions, validatorCompilerOptions } = options;

  const validatorCompiler = createValidatorCompiler(validatorCompilerOptions);
  const serializerCompiler = createSerializerCompiler(
    serializerCompilerOptions,
  );

  void fastify
    .setValidatorCompiler(validatorCompiler)
    .setSerializerCompiler(serializerCompiler);
};
