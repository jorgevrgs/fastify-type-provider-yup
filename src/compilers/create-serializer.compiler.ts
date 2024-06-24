import type { FastifySerializerCompiler } from "fastify/types/schema";
import type { AnySchema } from "yup";
import { ResponseValidationError } from "../errors";
import type { YupValidatorCompilerOptions } from "../types";
import { resolveSchema, safeParse } from "../utils";

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
