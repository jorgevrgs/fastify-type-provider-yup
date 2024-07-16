import type { FastifyInstance } from 'fastify';
import Fastify from 'fastify';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import * as yup from 'yup';
import type { YupTypeProvider } from '../src';
import yupPlugin from '../src';

describe('request schema', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    const REQUEST_OBJECT_SCHEMA = yup.object({
      name: yup.string().required(),
    });

    app = Fastify();
    app.register(yupPlugin);

    app.after(() => {
      app
        .withTypeProvider<YupTypeProvider>()
        .route({
          method: 'GET',
          url: '/correct',
          schema: {
            querystring: REQUEST_OBJECT_SCHEMA,
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
          handler: (_req, res) => {
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
    const response = await app.inject().get('/correct').query({
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
    const response = await app.inject().get('/correct');

    expect(response.statusCode).toBe(400);
    expect(response.json()).toMatchSnapshot();
  });
});
