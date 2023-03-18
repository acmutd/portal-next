import { Event, Application } from '@generated/type-graphql';
import { injectable } from 'tsyringe';
import { Arg, Ctx, FieldResolver, Query, Resolver, Root, UseMiddleware } from 'type-graphql';
import type { TContext } from '../interfaces/context.interface';
import { InjectSessionMiddleware } from '../middlewares/inject-session';
import { onlyOfficerAllowed } from '../middlewares/only-officer';
import RetrieveAppsByDivision from '../services/RetrieveAppsByDivision.service';

@Resolver(() => Application)
@injectable()
export default class RetrieveAppsByDivisionResolver {
  constructor(
    private retrieveApp: RetrieveAppsByDivision
  ) {}

  @Query(() => [Application])
  @UseMiddleware(onlyOfficerAllowed, InjectSessionMiddleware)
  async retrieveAppsByDiv(@Ctx() context: TContext): Promise<Application[]> {
        const userId = context.session!.id

        const profile = await context.prisma.profile.findFirst({
            where: {
                userId: userId,
            },
        });

        const officerId = profile!.officerId;

        if(officerId === null){
            return [];
        }

        const divisions = await context.prisma.division.findMany({
            where: {
                officerIds: {
                    has: officerId,
                },
            },
        });

        const apps = await this.retrieveApp.retrieveApps( 
            divisions.map((division) => division.id)
        );

        return apps;
  }
}
