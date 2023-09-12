import type { AnySchema } from 'yup';

export const hasOwnProperty = <T, K extends PropertyKey>(
  obj: T,
  prop: K,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): obj is T & Record<K, any> => {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

export const resolveSchema = (
  maybeSchema: AnySchema | { properties: AnySchema },
): Pick<AnySchema, 'validateSync'> => {
  if (hasOwnProperty(maybeSchema, 'validateSync')) {
    return maybeSchema;
  }

  if (hasOwnProperty(maybeSchema, 'properties')) {
    return maybeSchema.properties;
  }

  throw new Error(`Invalid schema passed: ${JSON.stringify(maybeSchema)}`);
};
