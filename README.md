# fastify-type-provider-yup

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
