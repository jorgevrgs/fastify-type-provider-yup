import fastifyPlugin from 'fastify-plugin';
import { yupPlugin } from './plugin';

export * from './compilers';
export * from './constants';
export * from './json-transformer';
export * from './plugin';
export * from './type-provider';
export type * from './types';

export const fastifyYupPlugin = fastifyPlugin(yupPlugin, {
  name: 'fastify-yup',
});

export default fastifyYupPlugin;
