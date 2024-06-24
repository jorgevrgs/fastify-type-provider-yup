import type { FastifySchema } from "fastify";
import type { JSONSchema7 } from "json-schema";
import type { SchemaDescription } from "yup";

export type YupValidatorCompilerOptions = {
  // when true, parsing is skipped and the input is validated "as-is"
  strict: boolean;

  // Throw on the first error or collect and return all
  abortEarly: boolean;

  // Remove unspecified keys from objects
  stripUnknown: boolean;

  // when `false` validations will be performed shallowly
  recursive: boolean;

  // External values that can be provided to validations and conditionals
  context?: object;
};

export type Converter = (
  description: SchemaDescription,
  converters: Converters,
) => JSONSchema7;

export type YupType =
  | "array"
  | "boolean"
  | "date"
  | "lazy"
  | "mixed"
  | "number"
  | "object"
  | "string"
  | "tuple";

export type Converters = Record<YupType, Converter>;

export type ResolveOptions = {
  value?: unknown;
  parent?: unknown;
  context?: unknown;
  converters?: Converters;
};

export type YupJsonTransformerOptions = {
  skiptlist: Array<string>;
  resolveOptions: ResolveOptions;
};

export type YupPluginOptions = {
  serializerCompilerOptions: YupValidatorCompilerOptions;
  validatorCompilerOptions: YupValidatorCompilerOptions;
};

export interface Schema extends FastifySchema {
  hide?: boolean;
}

// biome-ignore lint/suspicious/noExplicitAny: required for type casting
export type FreeformRecord = Record<string, any>;
