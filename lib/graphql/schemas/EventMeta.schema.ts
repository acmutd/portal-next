import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { Field, InputType, ObjectType, GraphQLTimestamp } from 'type-graphql';
import { Date } from 'mongoose';
import User from './User.schema';

@ObjectType()
@InputType('EventMetaInput')
export default class EventMeta {
  @Field(() => String)
  @prop({ required: true, type: () => String })
  public eventId: string;

  @Field(() => String, { nullable: true })
  @prop({ type: () => String })
  public SUMMARY: string;

  @Field(() => String)
  @prop({ required: true, type: () => String })
  public userId: Ref<User>;

  @Field(() => String)
  @prop({ required: true, default: false, type: () => Boolean })
  public rsvp: boolean;

  @Field(() => String)
  @prop({ default: null, type: () => Date })
  public rsvpTS: Date;

  @Field(() => String)
  @prop({ required: true, default: false, type: () => Boolean })
  public checkedIn: boolean;

  @Field(() => GraphQLTimestamp, { nullable: true })
  @prop({ default: null, type: () => Date })
  public checkedInTS: Date;
}

export const EventMetaModel = getModelForClass(EventMeta);
