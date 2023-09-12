import type { ResolveOptions, YupValidatorCompilerOptions } from "./types";

export const defaultResolveOptions: ResolveOptions = {} as const;

export const defaultSkipList: Array<string> = [
  "/documentation/",
  "/documentation/initOAuth",
  "/documentation/json",
  "/documentation/uiConfig",
  "/documentation/yaml",
  "/documentation/*",
  "/documentation/static/*",
];

export const defaultYupValidatorCompilerOptions: YupValidatorCompilerOptions = {
  strict: false,
  abortEarly: false,
  stripUnknown: true,
  recurvise: true,
};
