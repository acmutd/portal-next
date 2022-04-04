import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-lambda';
import { buildSchemaSync } from 'type-graphql';
import { container } from 'tsyringe';
import { resolvers } from '@generated/type-graphql';
import { PrismaClient } from '@prisma/client';
import wrap from '@dazn/lambda-powertools-pattern-basic';
import { APIGatewayProxyCallback, APIGatewayProxyEvent, Context } from 'aws-lambda';

// prevent prisma from creating multiple connections in development environment
(global as any).prisma = (global as any).prisma || new PrismaClient();
const { prisma } = global as any;

const schema = buildSchemaSync({
  resolvers: [...resolvers],
  dateScalarMode: 'isoDate',
  container: {
    get: (someClass) => container.resolve(someClass),
  },
});

const apolloServer = new ApolloServer({
  schema,
  introspection: true,
  context: async ({ event, context, express }) => ({
    prisma,
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
    expressRequest: express.req,
  }),
});

exports.graphqlHandler = wrap(
  async (event: APIGatewayProxyEvent, context: Context, callback: APIGatewayProxyCallback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const handler = apolloServer.createHandler();
    return handler(event, context, callback);
  },
);
