import 'reflect-metadata';
import { ObjectId } from 'mongodb';
import { container } from 'tsyringe';
import { buildSchema } from 'type-graphql';
import { resolvers } from './resolvers';
import ObjectIdScalar from './scalars/ObjectIDScalar';

(async () => {
  await buildSchema({
    resolvers,
    dateScalarMode: 'isoDate',
    container: {
      get: (someClass) => container.resolve(someClass),
    },
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    emitSchemaFile: './schema.gql',
  });
})();
