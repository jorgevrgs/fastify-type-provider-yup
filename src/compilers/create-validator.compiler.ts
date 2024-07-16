import type { FastifySchemaCompiler } from 'fastify';
import type { AnySchema } from 'yup';
import type { YupValidatorCompilerOptions } from '../types';

export const createValidatorCompiler = (
  options: YupValidatorCompilerOptions,
) => {
  const validatorCompiler: FastifySchemaCompiler<AnySchema> = ({ schema }) => {
    return async (data: unknown) => {
      try {
        const value = schema.validateSync(data, options);

        return {
          value,
        };
      } catch (error) {
        return {
          error,
        };
      }
    };
  };

  return validatorCompiler;
};
