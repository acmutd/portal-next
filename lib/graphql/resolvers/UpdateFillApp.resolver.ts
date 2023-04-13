import { FilledApplication, Profile } from '@generated/type-graphql';
import { injectable } from 'tsyringe';
import { Arg, Ctx, Int, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import type { TContext } from '../interfaces/context.interface';
import FirebaseService from '../services/FirebaseService.service';
import FilledApp from '../services/FilledApp.service';
import { InjectSessionMiddleware } from '../middlewares/inject-session';
import { onlyOfficerAllowed } from '../middlewares/only-officer';
import { getPrismaConnection } from 'lib/prisma/manager';

@Resolver(() => FilledApplication)
@injectable()
export default class UpdateFillAppResolver {
  constructor(private filledApp: FilledApp) {}

  @Mutation(() => FilledApplication)
  @UseMiddleware(InjectSessionMiddleware)
  async updateFilledApp(
    @Arg('fillAppId', () => String) fillAppId: string,
    @Arg('status', () => String) status: string,
    @Arg('score', () => Int) score: number,
    @Arg('notes', () => String) notes: string,
    @Arg('interviewLink', () => String) interviewLink: string,
    //@Ctx() context: TContext,
  ) {
    console.log("hi")
    const prisma = getPrismaConnection();
    //const userId = context.session!.id;
    const userId = "635ed2eb1907a687abdc56a2"
    console.log(userId)
    const profile = await prisma.profile.findFirst({
      where: {
        userId: userId
      },
    });

    const officer = profile!.officer;
    fillAppId = "641c61babc9b4373e013cac6"
    console.log("officer")
    if (officer !== null) {
      const to_update = this.filledApp.getFilledApp(fillAppId);
      return this.filledApp.updateFilledApp(fillAppId, status, score, notes, interviewLink);
    }
  }
}
