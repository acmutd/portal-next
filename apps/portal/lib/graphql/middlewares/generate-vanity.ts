import { MiddlewareFn } from 'type-graphql';
import { TContext } from '../interfaces/context.interface';
import { VanityLinkCreateInput, VanityLinkUpdateInput } from '@generated/type-graphql';
import { generateVanityLink } from '../utilities/vanity';
import { getSession } from 'next-auth/react';
import { CombinedError } from 'urql';
import { sendSlackNotification } from '../utilities/slack';

export const onEditVanityLink: MiddlewareFn<TContext> = async ({ args, context }, next) => {
  const session = await getSession(context);
  const profile = await context.prisma.profile.findFirst({
    where: {
      userId: session.id,
    },
  });

  const vanityObj = await context.prisma.vanityLink.findFirst({
    where: {
      id: args.where.id,
    },
  });

  Object.entries(args.data as VanityLinkUpdateInput).map(([k, v]) => {
    if (v) {
      vanityObj[k] = v.set;
    }
  });

  await generateVanityLink({
    firstName: profile.firstName,
    lastName: profile.lastName,
    destination: vanityObj.originalUrl,
    email: profile.email,
    primaryDomain: 'acmutd.co',
    slashtag: vanityObj.slashtag,
    subdomain: vanityObj.vanityDomain,
  });
  await sendSlackNotification({
    email: profile.email,
    name: `${profile.firstName} ${profile.lastName}`,
    form_name: 'Vanity Link Generator',
    url: `https://${vanityObj.vanityDomain}.acmutd.co/${vanityObj.slashtag}`,
  });
  await next();
};

export const onCreateVanityLink: MiddlewareFn<TContext> = async ({ args, context }, next) => {
  const session = await getSession(context);
  if (!session) {
    throw new CombinedError({
      graphQLErrors: ['Login required'],
      response: args,
    });
  }
  const profile = await context.prisma.profile.findFirst({
    where: {
      userId: session.id,
    },
  });
  const { originalUrl, vanityDomain, slashtag } = args.data as VanityLinkCreateInput;
  try {
    await generateVanityLink({
      firstName: profile.firstName,
      lastName: profile.lastName,
      destination: originalUrl,
      email: profile.email,
      primaryDomain: 'acmutd.co',
      slashtag: slashtag,
      subdomain: vanityDomain,
    });
    await sendSlackNotification({
      email: profile.email,
      name: `${profile.firstName} ${profile.lastName}`,
      form_name: 'Vanity Link Generator',
      url: `https://${vanityDomain}.acmutd.co/${slashtag}`,
    });
    return args.data;
  } catch (error) {
    console.error(error);
    throw new CombinedError({
      graphQLErrors: ['Error generating Vanity Link'],
    });
  }
};
