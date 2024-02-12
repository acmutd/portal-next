
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
    const profile = await context.prisma.profile.findFirst ({
        where: { 
            userId : args.where.userId
        }
    })

    if ( !profile || profile.id !== session.id  ) {
        throw new GraphQLError("User does not own data", 
        {
            extensions: {
                code: "USER_ACCESS_RESTRICTED"
            }
        })

    }


    return next; 
}