import 'reflect-metadata';
import { ObjectId } from 'mongodb';
import { container } from 'tsyringe';
import { buildSchema } from 'type-graphql';
import ObjectIdScalar from './scalars/ObjectIDScalar';
import { resolvers } from '@generated/type-graphql';
import SignedURLResolver from 'lib/graphql/resolvers/SignedURL.resolver';
import EventCheckinResolver from 'lib/graphql/resolvers/EventCheckin.resolver';

(async () => {
  await buildSchema({
    resolvers: [...resolvers, SignedURLResolver, EventCheckinResolver],
    dateScalarMode: 'isoDate',
    container: {
      get: (someClass) => container.resolve(someClass),
    },
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    emitSchemaFile: './schema.gql',
  });
})();
