import { MiddlewareFn } from 'type-graphql';
import { TContext } from '../interfaces/context.interface';
import axios from 'axios';

export const addTypeformHiddenFields: MiddlewareFn<TContext> = async ({ args, context }, next) => {
  await next();
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.TYPEFORM_ACCESS_TOKEN}`,
    },
  };
  const typeform = await axios.get(
    `https://api.typeform.com/forms/${args.data.typeformId}`,
    config,
  );
  const typeformBody = {
    ...typeform.data,
    hidden: ['classification', 'email', 'first_name', 'last_name', 'major', 'net_id'],
  };
  await axios.put(`https://api.typeform.com/forms/${args.data.typeformId}`, typeformBody, config);
  return next();
};

export const addTypeformWebhook: MiddlewareFn<TContext> = async ({ args }, next) => {
  await next();
  try {
    const baseUrl =
      process.env.NODE_ENV !== 'development'
        ? 'https://portal.acmutd.co'
        : 'http://jaeykhsdbn.loclx.io';
    const { status, data } = await axios.put(
      `https://api.typeform.com/forms/${args.data.typeformId}/webhooks/portalv2`,
      {
        enabled: true,
        url: `${baseUrl}/api/typeform/submission`,
        ...(process.env.NODE_ENV !== 'development' && {
          secret: process.env.TYPEFORM_SECRET,
          verify_ssl: true,
        }),
      },
      {
        headers: {
          Authorization: `bearer ${process.env.TYPEFORM_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      },
    );
    if (status >= 400) {
      throw data;
    }
  } catch (error) {
    console.error(error);
  }
};
