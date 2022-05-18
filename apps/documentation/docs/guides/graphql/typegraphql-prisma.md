---
sidebar_position: 1
---

# TypeGraphQL-Prisma

TypeGraphQL-Prisma is a powerful library that automatically generates all CRUD GraphQL resolvers based on Prisma schema file.

To have a better understanding of this amazing library, check out its documentation [here](https://prisma.typegraphql.com/).

## How to use TypeGraphQL-Prisma in `portal-next`

### Initialize `schema.prisma` file

To start off, we will need a Prisma schema file. The following is a snippet of an example Prisma schema file:

```prisma title="schema.prisma"
datasource db {
  provider = "mysql"
  url      = env("PSCALE_DATABASE_URL")
  // referentialIntegrity = "prisma"
}

generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "rhel-openssl-1.0.x"]
  // previewFeatures = ["referentialIntegrity"]
}

generator typegraphql {
  provider           = "typegraphql-prisma"
  output             = "../generated/type-graphql"
  emitTranspiledCode = true
}

```

:::note
Notice that in addition configurations required by Prisma, we also need the following configuration to connect the Prisma schema with TypeGraphQL-Prisma:

```
generator typegraphql {
  provider           = "typegraphql-prisma"
  output             = "../generated/type-graphql"
  emitTranspiledCode = true
}
```

:::

### Generate CRUD resolvers using TypeGraphQL-Prisma

Run the following command to generate CRUD resolvers using TypeGraphQL-Prisma:

```
npx turbo run prisma:generate --scope="@acmutd/graphql-lambda"
```

Next, we will need to import the generated resolvers into the `ApolloServer` instance, which will be used to bootstrap the GraphQL server.

The following code snippet can be used to bootstrap a GraphQL server with the generated resolvers:

```ts
import { resolvers } from '@generated/type-graphql';
import { PrismaClient } from '@prisma/client';

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV === 'development') global.prisma = prisma;

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
```

:::note
To add custom resolvers, one can do the following when creating the schema object:

```ts
const schema = buildSchemaSync({
  resolvers: [...resolvers, CustomResolver],
  ...
});
```

:::

### How to use generated resolvers

The generated resolvers are generated in a way such that their syntax is similar to Prisma, so it is recommended to check out [this documentation](https://www.prisma.io/docs/concepts/components/prisma-client/crud) on how to use Prisma to be able to use the generated resolvers.

## Additional Materials

Check out the following materials if you want to explore more about the technologies mentioned in this guide:

- [Prisma](https://www.prisma.io/docs/concepts/components/prisma-client/crud)
- [TypeGraphQL](https://typegraphql.com/)
- [TypeGraphQL-Prisma](https://prisma.typegraphql.com/)
