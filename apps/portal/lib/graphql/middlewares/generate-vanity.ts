import axios from 'axios';
import { MiddlewareFn } from 'type-graphql';
import { TContext } from '../interfaces/context.interface';
import { VanityLinkCreateInput, VanityLinkUpdateInput } from '@generated/type-graphql';

async function generateVanityLink(originalUrl: string, vanityDomain: string, slashtag: string) {
  const linkRequest = {
    destination: originalUrl,
    domain: {
      fullName: `${vanityDomain}.acmutd.co`,
    },
    slashtag,
  };
  const requestHeaders = {
    'Content-Type': 'application/json',
    apikey: process.env.REBRANDLY_APIKEY!,
  };

  const res = await axios.get(
    `https://api.rebrandly.com/v1/links?domain.fullName=${linkRequest.domain.fullName}&slashtag=${linkRequest.slashtag}`,
    { headers: requestHeaders },
  );

  await axios.post(
    `${process.env.REBRANDLY_URL}${res.data.length !== 0 ? res.data[0].id : ''}`,
    linkRequest,
    {
      headers: requestHeaders,
    },
  );
}

export const onEditVanityLink: MiddlewareFn<TContext> = async ({ args, context }, next) => {
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

  await generateVanityLink(vanityObj.originalUrl, vanityObj.vanityDomain, vanityObj.slashtag);

  await next();
};

export const onCreateVanityLink: MiddlewareFn<TContext> = async ({ args }, next) => {
  const { originalUrl, vanityDomain, slashtag } = args.data as VanityLinkCreateInput;
  await generateVanityLink(originalUrl, vanityDomain, slashtag);

  await next();
};
