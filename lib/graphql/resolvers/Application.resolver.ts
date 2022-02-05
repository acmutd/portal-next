import { injectable } from 'tsyringe';
import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { TypegooseMiddleware } from '../middlewares/typegoose';
import Application, { ApplicationFilter } from '../schemas/Application.schema';
import ApplicationService from '../services/Application.service';

@Resolver(() => Application)
@injectable()
export default class ApplicationResolver {
  constructor(private applicationService: ApplicationService) {}

  @Mutation(() => Application)
  @UseMiddleware(TypegooseMiddleware)
  async createApplication(@Arg('application') application: Application) {
    return this.applicationService.createApplication(application);
  }

  @Query(() => [Application])
  @UseMiddleware(TypegooseMiddleware)
  async applications(
    @Arg('filter', () => ApplicationFilter, { nullable: true }) filter?: ApplicationFilter,
  ) {
    return this.applicationService.getAll(filter || {});
  }
}
