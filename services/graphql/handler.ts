import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-lambda';
import { buildSchemaSync, buildSchema } from 'type-graphql';
import { container } from 'tsyringe';
import { resolvers } from '@generated/type-graphql';
import EventCheckinResolver from './graphql/resolvers/EventCheckin.resolver';
import { PrismaClient } from '@prisma/client';
import { getMetadataStorage } from 'type-graphql';

// if (true || process.env.IS_OFFLINE) {
//   getMetadataStorage().clear();
// }
// (global as any).schema =
//   (global as any).schema ||
//   buildSchemaSync({
//     resolvers: [...resolvers],
//     dateScalarMode: 'isoDate',
//     container: {
//       get: (someClass) => container.resolve(someClass),
//     },
//   });

console.time('prisma client');
const prisma = new PrismaClient();
console.timeEnd('prisma client');
console.time('build schema');
// const schema = (global as any).schema;
const schema = buildSchemaSync({
  resolvers: [...resolvers],
  dateScalarMode: 'isoDate',
  container: {
    get: (someClass) => container.resolve(someClass),
  },
});

// console.debug('Schema: ', JSON.stringify(schema, null, 2));
// global.schema =
//   global.schema ||
//   buildSchemaSync({
//     resolvers: [...resolvers],
//     dateScalarMode: 'isoDate',
//     container: {
//       get: (someClass) => container.resolve(someClass),
//     },
//   });
// const schema = global.schema;
// const schema = buildSchemaSync({
//   resolvers: [...resolvers],
//   dateScalarMode: 'isoDate',
//   container: {
//     get: (someClass) => container.resolve(someClass),
//   },
// });
console.timeEnd('build schema');
console.time('apollo server');
const apolloServer = new ApolloServer({
  schema,
  introspection: true,
  context: () => ({ prisma }),
});
console.timeEnd('apollo server');

exports.graphqlHandler = apolloServer.createHandler();

// ////////////////////////////////////////////////////////////

// import { gql } from 'apollo-server-lambda';

// // Construct a schema, using GraphQL schema language
// const typeDefs = gql`
//   type Query {
//     hello: String
//   }
// `;

// // Provide resolver functions for your schema fields
// const resolvers = {
//   Query: {
//     hello: () => 'Hello world!',
//   },
// };

// const server = new ApolloServer({ typeDefs, resolvers });

// exports.graphqlHandler = server.createHandler();

/////////////////////////////////////////

// (global as any).schema =
//   (global as any).schema ||
//   buildSchemaSync({
//     resolvers: [...resolvers],
//     dateScalarMode: 'isoDate',
//     container: {
//       get: (someClass) => container.resolve(someClass),
//     },
//   });

// const createHandler = async () => {
//   // await getConnection();

//   const prisma = new PrismaClient();

//   // const schema = (global as any).schema;
//   console.debug('About to generate schema: ');
//   const schema = (global as any).schema;
//   console.debug('Schema: ', JSON.stringify(schema, null, 2));
//   console.debug('User Type: ', JSON.stringify(schema.getQueryType(), null, 2));

//   const server = new ApolloServer({
//     schema,
//     context: async ({ context }: { event; context }) => {
//       context.callbackWaitsForEmptyEventLoop = false;
//       return { prisma };
//     },
//   });
//   return server.createHandler();
// };

// export const graphqlHandler = (event, context, callback) => {
//   createHandler().then((handler) => handler(event, context, callback));
// };
