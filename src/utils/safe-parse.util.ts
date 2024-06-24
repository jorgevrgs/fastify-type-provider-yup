import type { AnySchema } from "yup";
import type { YupValidatorCompilerOptions } from "../types";

export const safeParse = <T>(
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
