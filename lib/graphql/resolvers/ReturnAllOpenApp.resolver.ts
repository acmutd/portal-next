import { Event, Application } from '@generated/type-graphql';
import { injectable } from 'tsyringe';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import type { TContext } from '../interfaces/context.interface';
import ReturnAllOpenApp from '../services/ReturnAllOpenApp.service';

@Resolver(() => Event)
@injectable()
export default class OldEventResolver {
  constructor(
    private returnOpenApp: ReturnAllOpenApp
  ) {}

  @Query(() => [Application])
  async checkInOldEvent(
    @Arg('date', () => Date) netId: Date,
    @Ctx() context: TContext
  ){
    const open_apps = await this.returnOpenApp.getOpenApps(netId);
    return open_apps;
  }
}
