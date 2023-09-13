import type { FastifyTypeProvider } from 'fastify';
import type { AnySchema, InferType } from 'yup';

/**
 * @see https://fastify.dev/docs/latest/Reference/Type-Providers
 */
export interface YupTypeProvider extends FastifyTypeProvider {
  output: this['input'] extends AnySchema ? InferType<this['input']> : never;
}
