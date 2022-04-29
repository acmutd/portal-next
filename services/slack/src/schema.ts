import type { APIGatewayProxyEvent } from 'aws-lambda';

export type ValidatedAPIGatewayProxyEvent<T> = Omit<APIGatewayProxyEvent, 'body'> & { body: T };

export const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        form_name: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
        message: { type: 'string' },
        url: { type: 'string' },
      },
      required: ['form_name', 'name', 'email', 'message'],
    },
  },
};
