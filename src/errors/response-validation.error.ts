import type { FastifyErrorConstructor } from '@fastify/error';
import createError from '@fastify/error';
import type { ValidationError } from 'yup';

const ResponseSerializationBase: FastifyErrorConstructor<
  {
    code: string;
  },
  [
    {
      cause: ValidationError;
    },
  ]
> = createError<[{ cause: ValidationError }]>(
  'FST_ERR_RESPONSE_SERIALIZATION',
  "Response doesn't match the schema",
  500,
);

export class ResponseValidationError extends ResponseSerializationBase {
  public cause?: unknown;
  public method: string;
  public url: string;

  constructor(
    method: string,
    url: string,
    options: { cause: ValidationError },
  ) {
    super({ cause: options.cause });

    this.method = method;
    this.url = url;
    this.cause = options.cause;
  }
}
