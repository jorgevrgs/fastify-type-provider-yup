import type { FastifySerializerCompiler } from 'fastify/types/schema.js';
import type { AnySchema } from 'yup';
import { ResponseValidationError } from '../errors/index.js';
import type { YupValidatorCompilerOptions } from '../types.js';
import { resolveSchema, safeParse } from '../utils/index.js';

export const createSerializerCompiler = (
  options: YupValidatorCompilerOptions,
) => {
  const serializerCompiler: FastifySerializerCompiler<
    AnySchema | { properties: AnySchema }
  > = ({ schema: maybeSchema }) => {
    return (data: unknown) => {
      const schema = resolveSchema(maybeSchema);

      const result = safeParse(schema, data, options);

      if (result.success === true) {
        return JSON.stringify(result.data);
      }

      throw new ResponseValidationError(result);
    };
  };

  return serializerCompiler;
};
