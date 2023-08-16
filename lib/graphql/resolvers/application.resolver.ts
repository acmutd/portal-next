
import {  Query, Resolver } from 'type-graphql';
import { Application } from '@generated/type-graphql';
import { injectable } from 'tsyringe';
import ApplicationService from '../services/application.service';

@Resolver(() => Application)
@injectable()
export default class ApplicationResolver {
  constructor(private applicationService: ApplicationService) {}

  @Query(() => [Application])
  async openApplications() {
    return this.applicationService.getOpenApplications();
  }
}
