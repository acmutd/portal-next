/* eslint import/prefer-default-export: "off" */
import UserResolver from './User.resolver';
import ProfileResolver from './Profile.resolver';

export const resolvers = [UserResolver, ProfileResolver] as const;
