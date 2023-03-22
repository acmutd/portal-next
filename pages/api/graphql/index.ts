import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
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
import { TContext } from 'lib/graphql/interfaces/context.interface';
import RetrieveAppsByDivisionResolver from 'lib/graphql/resolvers/RetrieveAppsByDivision.resolver';

if (process.env.NODE_ENV !== 'development') {
  applyResolversEnhanceMap(resolversEnhanceMap);
}

const schema = buildSchemaSync({
  resolvers: [
    ...exposedResolvers,
    ReturnAllOpenApp,
    SignedURLResolver,
    EventCheckinResolver,
    AdditionalCRUDEventResolver,
    AdditionalUserResolver,
    OldEventResolver,
    RetrieveAppsByDivisionResolver
  ],
  dateScalarMode: 'isoDate',
  container: {
    get: (someClass) => container.resolve(someClass),
  },
  scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
  validate: { forbidUnknownValues: false },
});

const apolloServer = new ApolloServer<TContext>({
  schema,
  introspection: true,
  plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
});

export default startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({ req, res, prisma: getPrismaConnection() }),
});
