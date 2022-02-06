import { ObjectId } from 'mongodb';
import { injectable } from 'tsyringe';
import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from 'type-graphql';
import { TypegooseMiddleware } from '../middlewares/typegoose';
import Application from '../schemas/Application.schema';
import Submission, { SubmissionFilter, SubmitInput } from '../schemas/Submission.schema';
import User from '../schemas/User.schema';
import ApplicationService from '../services/Application.service';
import SubmissionService from '../services/Submission.service';
import UserService from '../services/User.service';

@Resolver(() => Submission)
@injectable()
export default class SubmissionResolver {
  constructor(
    private submissionService: SubmissionService,
    private applicationService: ApplicationService,
    private userService: UserService,
  ) {}

  @Mutation(() => Submission)
  @UseMiddleware(TypegooseMiddleware)
  async submitApplication(@Arg('submitInput', () => SubmitInput) submitInput: SubmitInput) {
    return this.submissionService.submitApplication(submitInput);
  }

  @Query(() => [Submission])
  @UseMiddleware(TypegooseMiddleware)
  async submissions(
    @Arg('filter', () => SubmissionFilter, { nullable: true }) filter?: SubmissionFilter,
  ) {
    return this.submissionService.getAll(filter || {});
  }

  @FieldResolver(() => Application)
  @UseMiddleware(TypegooseMiddleware)
  async application(@Root() submission: Submission) {
    const res = await this.applicationService.getAll({
      _id: submission.applicationId as ObjectId,
    });
    return res[0];
  }

  @FieldResolver(() => User)
  @UseMiddleware(TypegooseMiddleware)
  async author(@Root() submission: Submission) {
    const res = await this.userService.getAll({
      _id: submission.userId as ObjectId,
    });
    return res[0];
  }
}
