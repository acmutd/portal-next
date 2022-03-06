import { injectable } from 'tsyringe';
import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from 'type-graphql';
import { TypegooseMiddleware } from '../middlewares/typegoose';
import Application, { ApplicationFilter } from '../schemas/Application.schema';
import Submission from '../schemas/Submission.schema';
import ApplicationService from '../services/Application.service';
import SubmissionService from '../services/Submission.service';

@Resolver(() => Application)
@injectable()
export default class ApplicationResolver {
  constructor(
    private applicationService: ApplicationService,
    private submissionService: SubmissionService,
  ) {}

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

  @FieldResolver(() => [Submission])
  @UseMiddleware(TypegooseMiddleware)
  async submissions(@Root() application: Application) {
    return this.submissionService.getAll({
      applicationId: application._id,
    });
  }
}
