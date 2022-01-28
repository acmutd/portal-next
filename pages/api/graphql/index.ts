import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { buildSchema } from 'type-graphql';
import Cors from 'micro-cors';
import * as mongoose from 'mongoose';
import { container } from 'tsyringe';
import { ObjectId } from 'mongodb';
import { resolvers } from '../../../lib/graphql/resolvers';
import ObjectIdScalar from '../../../lib/graphql/scalars/ObjectIDScalar';

const cors = Cors();

mongoose.set('debug', true);
const apolloServer = new ApolloServer({
  schema: await buildSchema({
    resolvers,
    dateScalarMode: 'timestamp',
    container: {
      get: (someClass) => container.resolve(someClass),
    },
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
  }),
  introspection: true,
  plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
});

const startServer = apolloServer.start();

export default cors(async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', 'https://studio.apollographql.com');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers',
  );
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS, HEAD');
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await mongoose.connect(process.env.MONGODB_URI);

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
