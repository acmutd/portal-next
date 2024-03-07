
import { GraphQLError } from "graphql";
import { TContext } from "../interfaces/context.interface";
import { MiddlewareFn } from "type-graphql";
import { getSession } from "next-auth/react";

export const onlyEventOwner: MiddlewareFn<TContext> = async({args, context}, next) => {
    const session = await getSession(context);

    if ( !session ) { 
        throw new GraphQLError('Login required', 
        {
            extensions: {
                code: "LOGIN_REQUIRED",
            },
        })
    }
    const ownerProfile = await context.prisma.profile.findFirst ({
        where: { 
            userId : args.profileId
        }
    })
    // session.id is the id user that is requesting access 
    if ( !ownerProfile || ownerProfile.userId !== session.id  ) {
        throw new GraphQLError("User does not own data", 
        {
            extensions: {
                code: "USER_ACCESS_RESTRICTED"
            }
        })

    }


    return next();
}