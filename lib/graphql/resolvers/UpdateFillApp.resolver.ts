import { Event, Profile } from '@generated/type-graphql';
import { injectable } from 'tsyringe';
import { Arg, Ctx, Int, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import type { TContext } from '../interfaces/context.interface';
import FirebaseService from '../services/FirebaseService.service';
import FilledApp from '../services/FilledApp.service';
import { InjectSessionMiddleware } from '../middlewares/inject-session';
import { onlyOfficerAllowed } from '../middlewares/only-officer';

@Resolver(() => Event)
@injectable()
export default class UpdateFillAppResolver {
  constructor(private filledApp: FilledApp) {}

  @Mutation(() => [])
  @UseMiddleware(onlyOfficerAllowed, InjectSessionMiddleware)
  async checkInOldEvent(
    @Arg('fillAppId', () => String) fillAppId: string,
    @Arg('status', () => String) status: string,
    @Arg('score', () => Int) score: number,
    @Arg('notes', () => String) notes: string,
    @Arg('interviewLink', () => String) interviewLink: string,
    @Ctx() context: TContext,
  ) {
    const userId = context.session!.id;

    const profile: Profile | null = await context.prisma.profile.findFirst({
      where: {
        userId: userId,
      },
    });

    const officerId = profile!.officer?.id;

    if (officerId !== null) {
      const to_update = this.filledApp.getFilledApp(fillAppId);
      return this.filledApp.updateFilledApp(fillAppId, status, score, notes, interviewLink);
    }
  }
}
