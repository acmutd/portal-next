import { getModelForClass, prop, PropType } from '@typegoose/typegoose';
import { Date } from 'mongoose';
import { Field, InputType, ObjectType, GraphQLTimestamp } from 'type-graphql';

@ObjectType()
@InputType('GraduationInputType')
class Graduation {
  @Field(() => String)
  @prop({ type: () => String, required: true })
  semester: string;

  @Field(() => String)
  @prop({ type: () => String, required: true })
  year: string;
}

@ObjectType()
@InputType('DiscordMetaInputType')
class DiscordMeta {
  @Field(() => String)
  @prop({ type: () => String, required: true })
  snowflake: string;

  @Field(() => String)
  @prop({ type: () => String, required: true })
  username: string;

  @Field(() => String)
  @prop({ type: () => String, required: true })
  discriminator: string;
}

@InputType()
@ObjectType()
export class PartialProfile {
  @Field(() => String)
  @prop({ required: true, type: () => String })
  public firstName: string;

  @Field(() => String)
  @prop({ required: true, type: () => String })
  public lastName: string;

  @Field(() => String)
  @prop({ required: true, type: () => String })
  public email: string;

  @Field(() => String)
  @prop({ required: true, type: () => String })
  public netid: string;

  @Field(() => String)
  @prop({ required: true, type: () => String })
  public classStanding: string;

  @Field(() => String)
  @prop({ required: true, type: () => String })
  public major: string;

  @Field(() => Boolean)
  @prop({ required: true, type: () => Boolean })
  public utdStudent: boolean;

  @Field(() => Graduation)
  @prop({
    required: true,
    type: () => Graduation,
  })
  public graduation: Graduation;
}

@ObjectType()
export default class Profile extends PartialProfile {
  // Subclass must have same decorators as parent class

  @Field(() => String)
  @prop({ type: () => String })
  public _id: string;

  @Field(() => [String])
  @prop({ type: () => [String], default: ['user'] }, PropType.ARRAY)
  public roles: string[];

  @Field(() => Boolean)
  @prop({ default: false, type: () => Boolean })
  public membershipStatus: boolean;

  @Field(() => GraphQLTimestamp, { nullable: true })
  @prop({ type: () => Date })
  public membershipTS: Date;

  @Field(() => Boolean)
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
  // @Field(() => String)
  // @prop({ type: mongoose.Types.ObjectId })
  // public userId: Ref<User>;
}

export const ProfileModel = getModelForClass(Profile);
