import fastifyPlugin from 'fastify-plugin';
import { yupPlugin } from './plugin.js';

export * from './compilers/index.js';
export * from './constants.js';
export * from './json-transformer.js';
export * from './plugin.js';
export * from './type-provider.js';
export type * from './types.js';

export const fastifyYupPlugin = fastifyPlugin(yupPlugin, {
  name: 'fastify-yup-type-provider',
  fastify: '5.x',
});

export default fastifyYupPlugin;
