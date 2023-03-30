import { Event, Application } from '@generated/type-graphql';
import { injectable } from 'tsyringe';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import type { TContext } from '../interfaces/context.interface';
import ReturnAllOpenApp from '../services/ReturnAllOpenApp.service';

@Resolver(() => Event)
@injectable()
export default class ReturnAllOpenAppResolver {
  constructor(
    private returnOpenApp: ReturnAllOpenApp
  ) {}

  @Query(() => [Application])
  async returnAlLOpenApp(
    @Arg('date', () => Date) dateCur: Date,
    @Ctx() context: TContext
  ){
    const open_apps = await this.returnOpenApp.getOpenApps(dateCur);
    return open_apps;
  }
}
