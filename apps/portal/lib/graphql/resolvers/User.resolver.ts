import { injectable } from 'tsyringe';
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { TypegooseMiddleware } from '../middlewares/typegoose';
import { User, RolesOnUser, Role } from '@generated/type-graphql';
import UserService from '../services/User.service';
import EventMetaService from '../services/EventMeta.service';
import Event from '../schemas/Event.schema';
import ProfileService from '../services/Profile.service';
import Profile from '../schemas/Profile.schema';
import SubmissionService from '../services/Submission.service';
import Submission from '../schemas/Submission.schema';

import { TContext } from '../interfaces/context.interface';
import { InjectSessionMiddleware } from '../middlewares/inject-session';

@Resolver(() => User)
@injectable()
export default class UserResolver {
  constructor(
    private userService: UserService,
    private eventMetaService: EventMetaService,
    private profileService: ProfileService,
    private submissionService: SubmissionService,
  ) {}

  // @Query(() => [User])
  // @UseMiddleware(TypegooseMiddleware)
  // async users(
  //   @Arg('filter', () => UserFilter, { nullable: true }) filter?: UserFilter,
  // ): Promise<User[]> {
  //   return this.userService.getAll(filter);
  // }

  @Mutation(() => RolesOnUser)
  async addRole(
    @Ctx() { prisma }: TContext,
    @Arg('userId') userId: string,
    @Arg('roleName') roleName: string,
  ) {
    const role = await prisma.role.findFirst({
      where: {
        roleName,
      },
    });

    return prisma.rolesOnUser.create({
      data: {
        roleId: role.id,
        userId: userId,
      },
    });
  }

  // @FieldResolver(() => [Event])
  // @UseMiddleware(TypegooseMiddleware)
  // async rsvp(@Root() user: User) {
  //   return this.eventMetaService.findRsvpByUserId(user.id as any);
  // }

  // @FieldResolver(() => [Event])
  // @UseMiddleware(TypegooseMiddleware)
  // async checkIn(@Root() user: User) {
  //   return this.eventMetaService.findCheckInByUserId(user.id as any);
  // }

  // @FieldResolver(() => Profile, { nullable: true })
  // @UseMiddleware(TypegooseMiddleware)
  // async profile(@Root() user: User) {
  //   return this.profileService.findByUserId(user.id as any);
  // }

  // @FieldResolver(() => Boolean)
  // async hasProfile(@Root() user: User) {
  //   const profile = await this.profileService.findByUserId(user.id as any);
  //   return !!profile;
  // }

  // @FieldResolver(() => [Submission])
  // @UseMiddleware(TypegooseMiddleware)
  // async submissions(@Root() user: User) {
  //   return this.submissionService.getAll({
  //     userId: user.id as any,
  //   });
  // }

  // @Query(() => User)
  // @UseMiddleware(InjectSessionMiddleware)
  // @UseMiddleware(TypegooseMiddleware)
  // async me(@Ctx() context: TContext) {
  //   return this.userService.findById(context.session!.id);
  // }
}
