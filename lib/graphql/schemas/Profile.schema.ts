import { getModelForClass, prop, PropType } from '@typegoose/typegoose';
import { Date } from 'mongoose';
import { Field, InputType, ObjectType, GraphQLTimestamp } from 'type-graphql';

@ObjectType()
@InputType()
class GraduationInputType {
  @Field(() => String)
  @prop({ type: () => String, required: true })
  semester: string;

  @Field(() => String)
  @prop({ type: () => String, required: true })
  year: string;
}

@ObjectType()
@InputType()
class GraduationData extends GraduationInputType {}

@ObjectType()
@InputType()
class DiscordMetaData {
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
class IProfile {
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
}

@InputType()
@ObjectType()
export class ProfileInput extends IProfile {
  @Field(() => GraduationInputType)
  @prop({
    required: true,
    type: () => GraduationInputType,
  })
  public graduation: GraduationInputType;
}

@ObjectType()
@InputType()
export default class Profile extends ProfileInput {
  // Subclass must have same decorators as parent class

  @Field(() => String)
  @prop({ type: () => String })
  public _id: string;

  @Field(() => GraduationData)
  @prop({
    required: true,
    type: () => GraduationData,
  })
  public graduation: GraduationData;

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

  @Field(() => DiscordMetaData, { nullable: true })
  @prop({
    type: () => DiscordMetaData,
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
