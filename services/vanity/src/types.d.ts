import type { SQSEvent, SQSRecord } from 'aws-lambda';

interface SQSBody<T> {
  payload: T;
  taskToken: string;
}

type ValidatedSQSRecord<T> = Omit<SQSRecord, 'body'> & { body: SQSBody<T> };
type ValidatedSQSEvent<T> = Omit<SQSEvent, 'Records'> & { Records: ValidatedSQSRecord<T>[] };
