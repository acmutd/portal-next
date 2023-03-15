import { Event } from '@generated/type-graphql';
import { injectable } from 'tsyringe';
import { Arg, Ctx, FieldResolver, Query, Resolver, Root, UseMiddleware } from 'type-graphql';
import type { TContext } from '../interfaces/context.interface';
import { InjectSessionMiddleware } from '../middlewares/inject-session';
import RetrieveAppsByDivision from '../services/RetrieveAppsByDivision.service';

@Resolver(() => Event)
@injectable()
export default class OldEventResolver {
  constructor(
    private retrieveApp: RetrieveAppsByDivision
  ) {}

  
  async checkInOldEvent(
    @Arg('divIds', () => String) divIds: string[],
    @Ctx() context: TContext,
  ) {
    const apps = await this.retrieveApp.getUpcomingEvent(divIds);
    return apps;
  }
}
