/* eslint import/prefer-default-export: "off" */
import UserResolver from './User.resolver';
import ProfileResolver from './Profile.resolver';
import EventMetaResolver from './EventMeta.resolver';

export const resolvers = [UserResolver, ProfileResolver, EventMetaResolver] as const;
