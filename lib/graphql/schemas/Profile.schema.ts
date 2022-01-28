import { getModelForClass, prop, PropType, Ref } from '@typegoose/typegoose';
import { Date } from 'mongoose';
import { Field, InputType, ObjectType, GraphQLTimestamp } from 'type-graphql';
import ObjectIdScalar from '../scalars/ObjectIDScalar';
import User from './User.schema';

@ObjectType()
@InputType('GraduationInputType')
class Graduation {
  @Field()
  @prop({ type: () => String, required: true })
  semester: string;

  @Field()
  @prop({ type: () => String, required: true })
  year: string;
}

@ObjectType()
@InputType('DiscordMetaInputType')
class DiscordMeta {
  @Field()
  @prop({ type: () => String, required: true })
  snowflake: string;

  @Field()
  @prop({ type: () => String, required: true })
  username: string;

  @Field()
  @prop({ type: () => String, required: true })
  discriminator: string;
}

@InputType()
@ObjectType()
export class PartialProfile {
  @Field()
  @prop({ required: true, type: () => String })
  public firstName: string;

  @Field()
  @prop({ required: true, type: () => String })
  public lastName: string;

  @Field()
  @prop({ required: true, type: () => String })
  public email: string;

  @Field()
  @prop({ required: true, type: () => String })
  public netid: string;

  @Field()
  @prop({ required: true, type: () => String })
  public classStanding: string;

  @Field()
  @prop({ required: true, type: () => String })
  public major: string;

  @Field()
  @prop({ required: true, type: () => Boolean })
  public utdStudent: boolean;

  @Field(() => Graduation)
  @prop({
    required: true,
    type: () => Graduation,
  })
  public graduation: Graduation;

  @Field(() => ObjectIdScalar)
  @prop({ required: true, ref: () => User })
  public user: Ref<User>;
}

@ObjectType()
export default class Profile extends PartialProfile {
  // Subclass must have same decorators as parent class

  @Field()
  @prop({ type: () => String })
  public _id: string;

  @Field(() => [String])
  @prop({ type: () => [String], default: ['user'] }, PropType.ARRAY)
  public roles: string[];

  @Field()
  @prop({ default: false, type: () => Boolean })
  public membershipStatus: boolean;

  @Field(() => GraphQLTimestamp, { nullable: true })
  @prop({ type: () => Date })
  public membershipTS: Date;

  @Field()
  @prop({ required: false, default: false, type: () => Boolean })
  public resume: boolean;

  @Field(() => GraphQLTimestamp, { nullable: true })
  @prop({ type: () => Date })
  public resumeTS: Date;

  @Field(() => DiscordMeta, { nullable: true })
  @prop({
    type: () => DiscordMeta,
  })
  public discordMeta?: {
    snowflake: string;
    username: string;
    discriminator: string;
  };
}

export const ProfileModel = getModelForClass(Profile);
