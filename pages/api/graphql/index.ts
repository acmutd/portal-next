import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-micro';
import type { PageConfig } from 'next';
import { buildSchema } from 'type-graphql';
import HelloWorldResolver from '../../../lib/graphql/resolvers/HelloWorld';

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloWorldResolver],
    }),
    introspection: true,
  });

  const startServer = apolloServer.start();
  await startServer;
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
};
