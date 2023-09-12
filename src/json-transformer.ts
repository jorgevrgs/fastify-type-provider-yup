import { convertSchema } from "@sodaru/yup-to-json-schema";
import type { Schema, FreeformRecord } from "./types";
import { defaultSkipList, defaultResolveOptions } from "./constants";
import { resolveSchema } from "./helpers";

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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const prop in response as any) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const schema = resolveSchema((response as any)[prop]);

        const transformedResponse = convertSchema(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
