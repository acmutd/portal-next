import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, InputType, ObjectType, GraphQLTimestamp } from 'type-graphql';
import { Date } from 'mongoose';

@ObjectType()
@InputType('EventMetaInput')
export default class EventMeta {
  @Field()
  @prop({ required: true, type: () => String })
  public eventId: string;

  @Field({ nullable: true })
  @prop({ type: () => String })
  public SUMMARY: string;

  @Field()
  @prop({ required: true, type: () => String })
  public userId: string;

  @Field()
  @prop({ required: true, default: false, type: () => Boolean })
  public rsvp: boolean;

  @Field(() => GraphQLTimestamp, { nullable: true })
  @prop({ default: null, type: () => Date })
  public rsvpTS: Date;

  @Field()
  @prop({ required: true, default: false, type: () => Boolean })
  public checkedIn: boolean;

  @Field(() => GraphQLTimestamp, { nullable: true })
  @prop({ default: null, type: () => Date })
  public checkedInTS: Date;
}

export const EventMetaModel = getModelForClass(EventMeta);
