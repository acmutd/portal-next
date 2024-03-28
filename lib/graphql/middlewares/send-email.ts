import { getSession } from 'next-auth/react';
import { MiddlewareFn } from 'type-graphql';
import { TContext } from '../interfaces/context.interface';
import {
  sendApplicationCreationEmail,
  sendApplicationSubmissionEmail,
  sendEventCreationEmail,
  sendProfileCreationEmail,
} from '../utilities/send-email';
import { Event, FilledApplication } from '@generated/type-graphql';
import { sendSlackNotification } from '../utilities/slack';
import { sendEventToDiscordGuildEvent } from '../utilities/discord/event';
import { addEventToGCal } from '../utilities/gcal/event';

export const onProfileCreationComplete: MiddlewareFn<TContext> = async (
  { args, context },
  next,
) => {
  await next();
  if (!context.sentEmail) {
    context.sentEmail = true;
    await sendProfileCreationEmail(
      {
        first_name: args.create.firstName,
      },
      args.create.email,
    );
  }
};

export const onApplicationCreationComplete: MiddlewareFn<TContext> = async (
  { args, context },
  next,
) => {
  await next();
  if (!context.sentEmail) {
    context.sentEmail = true;
    const session = await getSession(context);
    const profile = await context.prisma.profile.findFirst({
      where: {
        userId: session!.id,
      },
    });
    await Promise.all([
      sendApplicationCreationEmail(
        {
          description: args.data.description,
          external_link: args.data.externalResourceUrl || 'None',
          form_link: 'None',
          subject: 'Application Creation Confirmation',
          typeform_name: args.data.typeformName,
        },
        profile!.email,
      ),
      sendSlackNotification({
        email: profile!.email,
        form_name: 'Application Generator',
        name: `${profile!.firstName} ${profile!.lastName}`,
      }),
    ]);
  }
};

export const onEventCreationComplete: MiddlewareFn<TContext> = async ({ args, context }, next) => {
  const createdEvent: Event = await next();
  if (!context.sentEmail) {
    context.sentEmail = true;
    const session = await getSession(context);
    const profile = await context.prisma.profile.findFirst({
      where: {
        userId: session!.id,
      },
    });
    await Promise.all([
      sendEventCreationEmail(
        {
          checkin_link: `https://portal.acmutd.co/checkin/${createdEvent.id}`,
          first_name: profile!.firstName,
          date: createdEvent.start.toDateString(),
          last_name: profile!.lastName,
          name: createdEvent.summary,
          public_event: createdEvent.isPublic,
          subject: 'Event Creation Confirmation',
        },
        profile!.email,
      ),
      sendSlackNotification({
        email: profile!.email,
        name: `${profile!.firstName} ${profile!.lastName}`,
        form_name: 'Event Check-in Generator',
        url: `https://portal.acmutd.co/checkin/${createdEvent.id}`,
      }),
      await sendEventToDiscordGuildEvent(createdEvent),
      await addEventToGCal(createdEvent),
    ]);
  }
};

export const onApplicationSubmissionComplete: MiddlewareFn<TContext> = async (
  { args, context },
  next,
) => {
  const filledApplication: FilledApplication = await next();
  if (!context.sentEmail) {
    context.sentEmail = true;
    const profile = await context.prisma.profile.findFirst({
      where: {
        id: filledApplication.profileId,
      },
    });
    const appData = await context.prisma.application.findFirst({
      where: {
        id: filledApplication.appId,
      },
    });
    await sendApplicationSubmissionEmail(
      {
        first_name: profile!.firstName,
        last_name: profile!.lastName,
        typeform_id: appData!.name,
      },
      profile!.email,
    );
  }
};
