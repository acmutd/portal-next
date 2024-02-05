
import { GraphQLError } from "graphql";
import { TContext } from "../interfaces/context.interface";
import { MiddlewareFn } from "type-graphql";
import { getSession } from "next-auth/react";

export const onlyOwners: MiddlewareFn<TContext> = async({args, context}, next) => {
    const session = await getSession(context);

    if ( !session ) { 
        throw new GraphQLError('Login required', 
        {
            extensions: {
                code: "LOGIN_REQUIRED",
            },
        })
    }
    const owner = await context.prisma.user.findFirst ({

    })



    return next; 
}