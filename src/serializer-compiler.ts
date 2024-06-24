import type { FastifySerializerCompiler } from "fastify/types/schema";
import type { AnySchema } from "yup";
import { defaultYupValidatorCompilerOptions } from "./constants";
import { ResponseValidationError } from "./errors";
import type { YupValidatorCompilerOptions } from "./types";
import { resolveSchema, safeParse } from "./utils";

export const createSerializerCompiler = (
  options: YupValidatorCompilerOptions,
) => {
  const serializerCompiler: FastifySerializerCompiler<
    AnySchema | { properties: AnySchema }
  > = ({ schema: maybeSchema }) => {
    // biome-ignore lint/suspicious/noExplicitAny: required for type casting
    return (data: any) => {
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

export const serializerCompiler = createSerializerCompiler(
  defaultYupValidatorCompilerOptions,
);
