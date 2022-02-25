/* eslint import/prefer-default-export: "off" */
import UserResolver from './User.resolver';
import ProfileResolver from './Profile.resolver';
import EventMetaResolver from './EventMeta.resolver';
import EventResolver from './Event.resolver';
import ApplicationResolver from './Application.resolver';
import SubmissionResolver from './Submission.resolver';
import SignedURLResolver from './SignedURL.resolver';

export const resolvers = [
  UserResolver,
  ProfileResolver,
  EventMetaResolver,
  EventResolver,
  ApplicationResolver,
  SubmissionResolver,
  SignedURLResolver,
] as const;
