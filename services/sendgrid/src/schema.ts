import type { APIGatewayProxyEvent } from 'aws-lambda';

export type ValidatedAPIGatewayProxyEvent<T> = Omit<APIGatewayProxyEvent, 'body'> & { body: T };

export const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        from: { type: 'string' },
        to: { type: 'string' },
        dynamicTemplateData: {
          type: 'object',
          properties: {
            preheader: { type: 'string' },
            subject: { type: 'string' },
            fname: { type: 'string' },
          },
          required: ['preheader', 'subject', 'fname'],
        },
        templateId: { type: 'string' },
      },
      required: ['from', 'to', 'dynamicTemplateData', 'templateId'],
    },
  },
};
