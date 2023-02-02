import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { buildSchemaSync } from 'type-graphql';
import { container } from 'tsyringe';
import { ObjectId } from 'mongodb';
import ObjectIdScalar from '../../../lib/graphql/scalars/ObjectIDScalar';
import { applyResolversEnhanceMap } from '@generated/type-graphql';
import SignedURLResolver from 'lib/graphql/resolvers/SignedURL.resolver';
import EventCheckinResolver from 'lib/graphql/resolvers/EventCheckin.resolver';
import { getPrismaConnection } from 'lib/prisma/manager';
import AdditionalCRUDEventResolver from 'lib/graphql/resolvers/AdditionalCRUDEvent.resolver';

import { resolversEnhanceMap } from 'lib/graphql/typegraphql-prisma/enhancer';

import AdditionalUserResolver from 'lib/graphql/resolvers/users.resolver';

import { exposedResolvers } from '../../../lib/graphql/typegraphql-prisma/exposedResolvers';
import OldEventResolver from 'lib/graphql/resolvers/OldEvent.resolver';

if (process.env.NODE_ENV !== 'development') {
  applyResolversEnhanceMap(resolversEnhanceMap);
}

const schema = buildSchemaSync({
  resolvers: [
    ...exposedResolvers,
    SignedURLResolver,
    EventCheckinResolver,
    AdditionalCRUDEventResolver,
    AdditionalUserResolver,
    OldEventResolver,
  ],
  dateScalarMode: 'isoDate',
  container: {
    get: (someClass) => container.resolve(someClass),
  },
  scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
});

const apolloServer = new ApolloServer({
  schema,
  introspection: true,
  plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
  context: ({ req }) => ({ req, prisma: getPrismaConnection() }),
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

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
