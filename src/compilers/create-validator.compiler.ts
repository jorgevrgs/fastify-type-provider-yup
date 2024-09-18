import type { FastifySchemaCompiler } from 'fastify';
import type { AnySchema, ValidationError } from 'yup';
import type { YupValidatorCompilerOptions } from '../types';

export const createValidatorCompiler = (
  options: YupValidatorCompilerOptions,
) => {
  const validatorCompiler: FastifySchemaCompiler<AnySchema> = ({ schema }) => {
    return (data: unknown) => {
      try {
        const value = schema.validateSync(data, options);

        return {
          value,
        };
      } catch (error) {
        return {
          error: error as ValidationError,
        };
      }
    };
  };

  return validatorCompiler;
};
