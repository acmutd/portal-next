import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-micro';
import { buildSchema } from 'type-graphql';
import Cors from 'micro-cors';
import HelloWorldResolver from '../../../lib/graphql/resolvers/HelloWorld';

const cors = Cors();
const apolloServer = new ApolloServer({
  schema: await buildSchema({
    resolvers: [HelloWorldResolver],
  }),
});

const startServer = apolloServer.start();

export default cors(async (req, res) => {
  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
