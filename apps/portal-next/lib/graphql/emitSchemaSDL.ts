import 'reflect-metadata';
import { ObjectId } from 'mongodb';
import { container } from 'tsyringe';
import { emitSchemaDefinitionFile, buildSchema } from 'type-graphql';
import path from 'path/posix';
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
    emitSchemaFile: path.resolve(__dirname, '../..', 'schema.gql'),
  });
})();
