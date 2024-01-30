import { GraphQLError } from 'graphql/error';
import { getSession } from 'next-auth/react';
import { MiddlewareFn } from 'type-graphql';
import { TContext } from '../interfaces/context.interface';
import { checkifUserIsDirector } from '../utilities/check-director';


export const onlyDirectorAllowed: MiddlewareFn<TContext> = async ({args, context}, next) => {

    const session = await getSession(context);

    if (!session) {
        throw new GraphQLError('Login required', 
        {
            extensions: { 
                code: 'LOGIN_REQUIRED',
            },
        });
    }
    const isDirector = await checkifUserIsDirector( session.id );

    if (isDirector) return next() 

    
    throw new GraphQLError('Director permission required', 
    {
        extensions: {
            code: 'DIRECTOR_PERMISSION_REQUIRED',
        }
    });
}