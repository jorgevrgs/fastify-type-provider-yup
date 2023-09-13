import type { FastifySchemaCompiler } from 'fastify';
import type { AnySchema } from 'yup';
import { defaultYupValidatorCompilerOptions } from './constants';

export const createValidatorCompiler = (options = defaultYupValidatorCompilerOptions) => {
  const validatorCompiler: FastifySchemaCompiler<AnySchema> = ({ schema }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return async (data: any) => {
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
