import type { AnySchema } from "yup";
import { isSchema } from "yup";

export const resolveSchema = (
  maybeSchema: AnySchema | { properties: AnySchema },
): Pick<AnySchema, "validateSync"> => {
  if (isSchema(maybeSchema)) {
    return maybeSchema as Pick<AnySchema, "validateSync">;
  }

  if ("properties" in maybeSchema && isSchema(maybeSchema.properties)) {
    return maybeSchema.properties as Pick<AnySchema, "validateSync">;
  }

  throw new Error(`Invalid schema passed: ${JSON.stringify(maybeSchema)}`);
};
