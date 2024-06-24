import type { FastifyInstance } from 'fastify';
import Fastify from 'fastify';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import * as yup from 'yup';

import { serializerCompiler } from './serializer-compiler';
import type { YupTypeProvider } from './type-provider';
import { validatorCompiler } from './validator-compiler';

describe('response schema', () => {
  let app: FastifyInstance;
  beforeAll(async () => {
    const REQUEST_SCHEMA = yup.object({
      name: yup.string().required(),
    });

    app = Fastify();
    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);

    app.after(() => {
      app
        .withTypeProvider<YupTypeProvider>()
        .route({
          method: 'GET',
          url: '/',
          schema: {
            querystring: REQUEST_SCHEMA,
          },
          handler: (req, res) => {
            res.send({
              name: req.query.name,
            });
          },
        })
        .route({
          method: 'GET',
          url: '/no-schema',
          schema: undefined,
          handler: (req, res) => {
            res.send({
              status: 'ok',
            });
          },
        });
    });

    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it('accepts correct request', async () => {
    const response = await app.inject().get('/').query({
      name: 'test',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      name: 'test',
    });
  });

  it('accepts request on route without schema', async () => {
    const response = await app.inject().get('/no-schema');

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      status: 'ok',
    });
  });

  it('returns 400 on validation error', async () => {
    const response = await app.inject().get('/');

    expect(response.statusCode).toBe(400);
    expect(response.json()).toMatchSnapshot();
  });
});
