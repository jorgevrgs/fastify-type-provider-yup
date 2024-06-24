const { yupPlugin } = require("..");
const Fastify = require("fastify");
const yup = require("yup");

const plugin = async (fastify) => {
  fastify.register(yupPlugin);
};

const app = Fastify({ logger: true });
app.register(plugin);

app.route({
  method: "GET",
  url: "/",
  schema: {
    querystring: yup
      .object({
        page: yup.number().default(1),
      })
      .noUnknown(),
    response: {
      200: yup.object({
        page: yup.string(),
      }),
    },
  },
  handler: async (request, reply) => {
    const { page } = request.query;

    return {
      page,
    };
  },
});

app.listen({ port: 1337, host: "0.0.0.0" });
