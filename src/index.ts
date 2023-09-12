import type {
  FastifySchema,
  FastifySchemaCompiler,
  FastifyTypeProvider,
  FastifyPluginAsync,
} from "fastify";
import type { FastifySerializerCompiler } from "fastify/types/schema";
import type { AnySchema, InferType, AnyObject } from "yup";
import { isSchema } from "yup";
import { convertSchema, type ResolveOptions } from "@sodaru/yup-to-json-schema";

/**
 * @see https://fastify.dev/docs/latest/Reference/Type-Providers
 */
export interface YupTypeProvider extends FastifyTypeProvider {
  output: this["input"] extends AnySchema ? InferType<this["input"]> : never;
}

export type YupValidatorCompilerOptions = {
  strict: boolean;
  abortEarly: boolean;
  stripUnknown: boolean;
  recurvise: boolean;
};

export const defaultYupValidatorCompilerOptions: YupValidatorCompilerOptions = {
  strict: false,
  abortEarly: false,
  stripUnknown: true,
  recurvise: true,
};

export const createValidatorCompiler = (
  options = defaultYupValidatorCompilerOptions,
) => {
  const validatorCompiler: FastifySchemaCompiler<AnySchema> = ({ schema }) => {
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

export const yupPlugin: FastifyPluginAsync<
  YupValidatorCompilerOptions
> = async (fastify, options) => {
  const validatorCompiler = createValidatorCompiler(options);
  void fastify.setValidatorCompiler(validatorCompiler);
};

const safeParse = <T>(
  schema: Pick<AnySchema, "validateSync">,
  data: T,
): { success: boolean; data?: T; error?: string } => {
  try {
    // Attempt to parse and validate the data using the Yup schema asynchronously
    const parsedData = schema.validateSync(data);
    return { success: true, data: parsedData };
  } catch (error) {
    // If validation fails, return an error message
    return { success: false, error: (error as Error).message };
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasOwnProperty = <T, K extends PropertyKey>(
  obj: T,
  prop: K,
): obj is T & Record<K, any> => {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

const resolveSchema = (
  maybeSchema: AnySchema | { properties: AnySchema },
): Pick<AnySchema, "validateSync"> => {
  if (hasOwnProperty(maybeSchema, "validateSync")) {
    return maybeSchema;
  }

  if (hasOwnProperty(maybeSchema, "properties")) {
    return maybeSchema.properties;
  }

  throw new Error(`Invalid schema passed: ${JSON.stringify(maybeSchema)}`);
};

export const serializerCompiler: FastifySerializerCompiler<
  AnySchema | { properties: AnySchema }
> = ({ schema: maybeSchema }) => {
  return (data: any) => {
    const schema = resolveSchema(maybeSchema);

    const result = safeParse(schema, data);

    if (result.success === true) {
      return JSON.stringify(result.data);
    }

    throw new Error("Invalid schema response");
  };
};

const defaultResolveOptions: ResolveOptions = {} as const;

export const createJsonSchemaTransformer = (
  options = defaultResolveOptions,
) => {
  // ...
};

export const jsonSchemaTransformer = createJsonSchemaTransformer();
