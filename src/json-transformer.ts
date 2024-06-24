import { convertSchema } from "@sodaru/yup-to-json-schema";
import { defaultResolveOptions, defaultSkipList } from "./constants";
import type { FreeformRecord, Schema } from "./types";
import { resolveSchema } from "./utils";

const defaultJsonSchemaTransformerOptions = {
  skipList: defaultSkipList,
  resolveOptions: defaultResolveOptions,
};

export const createJsonSchemaTransformer = (
  options = defaultJsonSchemaTransformerOptions,
) => {
  const { skipList, resolveOptions } = options;

  return ({ schema, url }: { schema: Schema; url: string }) => {
    if (!schema) {
      return {
        schema,
        url,
      };
    }

    const { response, headers, querystring, body, params, hide, ...rest } =
      schema;

    const transformed: FreeformRecord = {};

    if (skipList.includes(url) || hide) {
      transformed.hide = true;
      return { schema: transformed, url };
    }

    const yupSchemas: FreeformRecord = { headers, querystring, body, params };

    for (const prop in yupSchemas) {
      const yupSchema = yupSchemas[prop];

      if (yupSchema) {
        transformed[prop] = convertSchema(yupSchema, resolveOptions);
      }
    }

    if (response) {
      transformed.response = {};

      // biome-ignore lint/suspicious/noExplicitAny: required for type casting
      for (const prop in response as any) {
        // biome-ignore lint/suspicious/noExplicitAny: required for type casting
        const schema = resolveSchema((response as any)[prop]);

        const transformedResponse = convertSchema(
          // biome-ignore lint/suspicious/noExplicitAny: required for type casting
          schema as any,
          resolveOptions,
        );

        transformed.response[prop] = transformedResponse;
      }
    }

    for (const prop in rest) {
      const meta = rest[prop as keyof typeof rest];
      if (meta) {
        transformed[prop] = meta;
      }
    }

    return { schema: transformed, url };
  };
};

export const jsonSchemaTransformer = createJsonSchemaTransformer();
