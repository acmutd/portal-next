import { Event } from '@generated/type-graphql';
import { injectable } from 'tsyringe';
import { Ctx, Query, Resolver } from 'type-graphql';
import { TContext } from '../interfaces/context.interface';
import { sendEventCreationEmail, sendProfileCreationEmail } from '../utilities/send-email';

@Resolver(() => Event)
@injectable()
export default class AdditionaCRUDEventResolver {
  constructor() {}

  @Query(() => [Event])
  async upcomingEvent(@Ctx() context: TContext): Promise<Event[]> {
    const events = await context.prisma.event.findMany({
      where: {
        start: {
          gte: new Date(),
        },
      },
    });
    return events;
  }

  @Query(() => String)
  async testSendEmail(): Promise<string> {
    await sendEventCreationEmail(
      {
        checkin_link: 'test.com',
        date: new Date().toDateString(),
        first_name: 'First',
        last_name: 'Last',
        name: 'Test Event',
        public_event: false,
        subject: 'Hello World',
      },
      'mike.nguyen@acmutd.co',
    );
    return 'Completed';
  }
}
