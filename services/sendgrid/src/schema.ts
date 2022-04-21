import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: S };
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

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
