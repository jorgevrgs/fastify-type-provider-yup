# fastify-type-provider-yup

[![NPM Version](https://img.shields.io/npm/v/fastify-type-provider-yup.svg)](https://npmjs.org/package/fastify-type-provider-yup)
[![CI](https://github.com/jorgevrgs/fastify-type-provider-yup/actions/workflows/tests.yml/badge.svg)](https://github.com/jorgevrgs/fastify-type-provider-yup/actions/workflows/tests.yml)

## Getting Started

```sh
pnpm add fastify-type-provider-yup
yarn add fastify-type-provider-yup
npm i fastify-type-provider-yup
```

## How to use

See [Examples](./examples) folder for more details.

### Register Fastify plugin:

```js
import { yupPlugin } from 'fastify-type-provider-yup';
import fp from 'fastify-plugin';

export const example = async (fastify) => {
  fastify.register(fp(yupPlugin));
};
```

### Manually registered with Typescript:

```ts
import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type YupTypeProvider
} from 'fastify-type-provider-yup';
import * as yup from yup

const server = Fastify()

server.withTypeProvider<withTypeProvider>().route({
  method: 'POST',
  url: '/',
  schema: {
    body: yup.object({
      foo: yup.string().required()
    }),
    querystring: yup.object({
      page: yup.number().default(1)
    }),
    response: {
      200: yup.string()
    }
  },
  handler: async (reques, reply) => {
    const { foo } = request.body
    const { page } = request.querystring
    return `Received ${foo} for page ${page}`
  }
})

server.listen({port: 1337, host: '0.0.0.0'})
```

### Swagger

```typescript
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import Fastify from 'fastify';
import * as yup from 'yup';
import {
  type YupTypeProvider,
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransformer,
} from 'fastify-type-provider-yup';
import { extendSchema } from '@sodaru/yup-to-json-schema';
import { Schema, addMethod } from 'yup';

extendSchema({ addMethod, Schema });

const app = Fastify({ logger: true });
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'SampleApi',
      description: 'Sample backend service',
      version: '1.0.0',
    },
    servers: [],
  },
  transform: jsonSchemaTransformer,
});

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
});

app.after(() => {
  app.withTypeProvider<YupTypeProvider>().route({
    url: '/',
    method: 'POST',
    schema: {
      description: 'Description details',
      tags: ['home'],
      body: yup.object({
        page: yup.number().default(1),
      }),
      response: {
        200: yup.object({
          page: yup.string().example('1'),
        }),
      },
    },
    handler: async (request, reply) => {
      const { page } = request.body;

      return {
        page: String(page),
      };
    },
  });
});

app.listen({ port: 8080, host: '0.0.0.0' });
```

## Aknowledgements

Module heavilty inspired by:

- [fastify-type-provider-zod](https://github.com/turkerdev/fastify-type-provider-zod)
- [fastify-yup-schema](https://github.com/balcieren/fastify-yup-schema)


## Benchmarks

Run:

Go to folder `/benchmarks` and run the benchmark server:

```sh
node (both|serializer|validation)-(json|yup|zod).benchmark.cjs
```

Then run:

```sh
autocannon http://localhost:3000
```

Find below the results using a MacBook Pro (16-inch, Apple M1 Pro, 2021, Sonoma 14.6.1) with 16 GB of RAM.

### Serializer Results (Avg.)

| Name | Version | Req/sec | Latency (ms) | Bytes/sec | Requests|
| --- | --- | --- | --- | --- | --- |
| fastify-type-provider-yup | 0.0.5 |  65,521.46 (84.58 %) | 0.01 | 12.3 MB | 721k req in 11.01s, 135 MB read  |
| fastify-type-provider-zod | 2.0.0 |  77,119.00 (99.55 %) | 0.01 | 14.5 MB | 805k req in 11.01 s, 151 MB read |
| fastify (raw) | 4.23.0 |  77,464.55 | 0.01 | 14.6 MB | 854k req in 11.01 s, 161 MB read |

### Validation Results (Avg.)

| Name | Version | Req/sec | Latency (ms) | Bytes/sec | Requests|
| --- | --- | --- | --- | --- | --- |
| fastify-type-provider-yup | 0.0.5 |  63,902.55 (89.74 %) | 0.01 | 11.6 MB | 703k req in 11.01s, 127 MB read  |
| fastify-type-provider-zod | 2.0.0 |  70,893.10 (99.56 %) | 0.01 | 12.8 MB | 780k req in 11.01 s, 141 MB read |
| fastify (raw) | 4.23.0 |  71,207.28 | 0.01 | 12.9 MB | 783k req in 11.02 s, 142 MB read |

### Validation And Serialization Results (Avg.)

| Name | Version | Req/sec | Latency (ms) | Bytes/sec | Requests|
| --- | --- | --- | --- | --- | --- |
| fastify-type-provider-yup | 0.0.5 |  57,133.10 (73.38 %) | 0.01 | 10.5 MB | 629k req in 11.01s, 115 MB read  |
| fastify-type-provider-zod | 2.0.0 |  51,389.82 (66.00 %) | 0.01 | 9.4 MB | 565k req in 11.01 s, 103 MB read |
| fastify (raw) | 4.23.0 |  77,861.82 | 0.01 | 14.2 MB | 856k req in 11.01 s, 157 MB read |
