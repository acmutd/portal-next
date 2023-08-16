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
  async returnAllOpenApp(
    @Ctx() context: TContext
  ){
    const openApps = await this.returnOpenApp.getOpenApps(new Date());
    return openApps;
  }
}
