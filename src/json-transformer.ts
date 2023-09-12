import { convertSchema } from "@sodaru/yup-to-json-schema";
import type { ResolveOptions } from "./types";
import { defaultSkipList, defaultResolveOptions } from "./constants";

const defaultJsonSchemaTransformerOptions = {
  skiplist: defaultSkipList,
  resolveOptions: defaultResolveOptions,
};

export const createJsonSchemaTransformer = (
  options = defaultJsonSchemaTransformerOptions,
) => {
  // ...
};

export const jsonSchemaTransformer = createJsonSchemaTransformer();
