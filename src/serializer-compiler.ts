import type { AnySchema } from "yup";
import { isSchema } from "yup";
import type { YupValidatorCompilerOptions } from "./types";

const safeParse = <T>(
  schema: Pick<AnySchema, "validateSync">,
  data: T,
  options: YupValidatorCompilerOptions,
): { success: boolean; data?: T; error?: string } => {
  try {
    // Attempt to parse and validate the data using the Yup schema asynchronously
    const parsedData = schema.validateSync(data, options);
    return { success: true, data: parsedData };
  } catch (error) {
    // If validation fails, return an error message
    return { success: false, error: (error as Error).message };
  }
};

const resolveSchema = (
  maybeSchema: AnySchema | { properties: AnySchema },
): maybeSchema is Pick<AnySchema, "validateSync"> => {
  if (isSchema(maybeSchema)) {
    return maybeSchema;
  }

  if ("properties" in maybeSchema && isSchema(maybeSchema.properties)) {
    return maybeSchema.properties;
  }

  throw new Error(`Invalid schema passed: ${JSON.stringify(maybeSchema)}`);
};

export const createSerializerCompiler = (
  options: YupValidatorCompilerOptions,
) => {
  const serializerCompiler: FastifySerializerCompiler<
    AnySchema | { properties: AnySchema }
  > = ({ schema: maybeSchema }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data: any) => {
      const schema = resolveSchema(maybeSchema);

      const result = safeParse(schema, data, options);

      if (result.success === true) {
        return JSON.stringify(result.data);
      }

      throw new Error("Invalid schema response");
    };
  };

  return serializerCompiler;
};
