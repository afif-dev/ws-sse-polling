// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
const helmet = require("@fastify/helmet");
const path = require("path");
const fastifyStatic = require("@fastify/static");
const fastifySse = require("fastify-sse");

fastify.register(helmet, { contentSecurityPolicy: false });

fastify.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
  prefix: "/public/",
});

fastify.register(require("point-of-view"), {
  engine: {
    ejs: require("ejs"),
  },
});

fastify.register(fastifySse);

fastify.get("/", async (request, reply) => {
  reply.view("/templates/index.ejs", { text: "text" });
});

fastify.get("/sse-fastify", (request, reply) => {
  let index;
  const options = {};
  // Send the first data
  reply.sse("Data from server", options);

  const interval = setInterval(() => {
    const random = (length = 8) => {
      return Math.random().toString(16).substr(2, length);
    };
    reply.sse(`${new Date()} - ${random()}`);
  }, 5000);
});

fastify.get("/sse-rand-notify", (request, reply) => {
  let index;
  const options = {};
  // Send the first data
  reply.sse("10", options);

  const interval = setInterval(() => {
    const getRandomInt = (max = 199) => {
      return Math.floor(Math.random() * max);
    };
    reply.sse(getRandomInt());
  }, 3000);
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
