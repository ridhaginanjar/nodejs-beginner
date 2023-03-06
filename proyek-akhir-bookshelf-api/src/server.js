const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.Server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
  server.route(routes);
  await server.start();
  // warning  Unexpected console statement  no-console
  // eslint-disable-next-line no-console
  console.log(`Server is running on ${server.info.uri}`);
};

init();
