import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-lambda';
import { buildSchemaSync } from 'type-graphql';
import { container, InjectionToken } from 'tsyringe';
import { resolvers } from '@generated/type-graphql';
import { PrismaClient } from '@prisma/client';
import { APIGatewayProxyCallback, APIGatewayProxyEvent, Context } from 'aws-lambda';

// https://www.apollographql.com/docs/apollo-server/api/apollo-server/#middleware-specific-context-fields
export interface AWSLambdaContext {
  event: APIGatewayProxyEvent;
  context: Context;
  express: {
    req: Express.Request;
    res: Express.Response;
  };
}

declare global {
  /* eslint-disable vars-on-top, no-var */
  var prisma: PrismaClient | undefined;
  /* eslint-enable vars-on-top, no-var */
}

// prevent prisma from creating multiple connections
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV === 'development') global.prisma = prisma;

// https://aws.amazon.com/blogs/compute/using-node-js-es-modules-and-top-level-await-in-aws-lambda/
// AWS supports using ESM and top-level-await, but for local testing serverless-offline does not yet support
// https://github.com/serverless/serverless/issues/9283
// https://github.com/dherault/serverless-offline/issues/1014
const schema = buildSchemaSync({
  resolvers: [...resolvers],
  dateScalarMode: 'isoDate',
  container: {
    get: (someClass: InjectionToken<unknown>) => container.resolve(someClass),
  },
});

const apolloServer = new ApolloServer({
  schema,
  introspection: true,
  context: ({ event, context, express }: AWSLambdaContext) => ({
    prisma,
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
    expressRequest: express.req,
  }),
});

export const graphqlHandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: APIGatewayProxyCallback
) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const handler = apolloServer.createHandler();

  // callback is ignored in apollo-server 3, but is required
  // https://github.com/apollographql/apollo-server/issues/5592
  return handler(event, context, callback);
};
