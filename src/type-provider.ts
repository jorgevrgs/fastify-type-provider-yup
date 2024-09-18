import type {
  FastifyPluginAsync,
  FastifyPluginCallback,
  FastifyPluginOptions,
  FastifyTypeProvider,
  RawServerBase,
  RawServerDefault,
} from 'fastify';
import type { AnySchema, InferType } from 'yup';

/**
 * * Enables automatic type inference on a Fastify instance.
 *
 * @example
 * ```typescript
 * import Fastify from 'fastify'
 *
 * const server = Fastify().withTypeProvider<YupTypeProvider>()
 * ```
 *
 * @see https://fastify.dev/docs/latest/Reference/Type-Providers
 */
export interface YupTypeProvider extends FastifyTypeProvider {
  serializer: this['schema'] extends AnySchema ? InferType<this['schema']> : unknown;
  validator: this['schema'] extends AnySchema ? InferType<this['schema']> : unknown;
}

/**
 * FastifyPluginCallback with Yup automatic type inference
 *
 * @example
 * ```typescript
 * import { FastifyPluginCallbackYup } fromg "fastify-type-provider-yup"
 *
 * const plugin: FastifyPluginCallbackYup = (fastify, options, done) => {
 *   done()
 * }
 * ```
 */
export type FastifyPluginCallbackYup<
  Options extends FastifyPluginOptions = Record<never, never>,
  Server extends RawServerBase = RawServerDefault,
> = FastifyPluginCallback<Options, Server, YupTypeProvider>;

/**
 * FastifyPluginAsync with Yup automatic type inference
 *
 * @example
 * ```typescript
 * import { FastifyPluginAsyncYup } from "fastify-type-provider-yup"
 *
 * const plugin: FastifyPluginAsyncYup = async (fastify, options) => {
 * }
 * ```
 */
export type FastifyPluginAsyncYup<
  Options extends FastifyPluginOptions = Record<never, never>,
  Server extends RawServerBase = RawServerDefault,
> = FastifyPluginAsync<Options, Server, YupTypeProvider>;
