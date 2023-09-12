# fastify-type-provider-yup

## Getting Started

```sh 
pnpm i fastify-type-provider-yup
yarn i fastify-type-provider-yup
npm i fastify-type-provider-yup 
```

Register Fastify plugin:

```js
import { yupPlugin } from 'fastify-type-provider-yup'

export const example = async (fastify) => {
  fastify.register(yupPlugin)
}
```

Manually registered with Typescript:

```ts
import Fastify from "fastify";
import { serializerCompiler, validatorCompiler, type YupTypeProvider  } from 'fastify-type-provider-yup'
import * as yup from yup

const server = Fastify()

server.withTypeProvider<withTypeProvider>().route({
  method: 'GET',
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


## Aknowledgements

Module heavilty inspired by:

- [fastify-type-provider-zod](https://github.com/turkerdev/fastify-type-provider-zod)
- [fastify-yup-schema](https://github.com/balcieren/fastify-yup-schema)

