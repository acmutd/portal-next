import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { buildSchema } from 'type-graphql';
import * as mongoose from 'mongoose';
import { container } from 'tsyringe';
import { ObjectId } from 'mongodb';
import { resolvers } from '../../../lib/graphql/resolvers';
import ObjectIdScalar from '../../../lib/graphql/scalars/ObjectIDScalar';

mongoose.set('debug', true);
const schema = await buildSchema({
  resolvers,
  dateScalarMode: 'isoDate',
  container: {
    get: (someClass) => container.resolve(someClass),
  },
  scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
  emitSchemaFile: true,
});

const apolloServer = new ApolloServer({
  schema,
  introspection: true,
  plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
  context: ({ req }) => ({ req }),
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await mongoose.connect(process.env.MONGODB_URI);

  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
