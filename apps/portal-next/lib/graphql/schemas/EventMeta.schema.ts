import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, InputType, ObjectType, GraphQLISODateTime } from 'type-graphql';
import { ObjectId } from 'mongodb';
import ObjectIdScalar from '../scalars/ObjectIDScalar';

@ObjectType()
@InputType('EventMetaInput')
export default class EventMeta {
  @Field(() => ObjectIdScalar)
  @prop({ required: true, type: () => ObjectId })
  public eventId: ObjectId;

  @Field({ nullable: true })
  @prop({ type: () => String })
  public SUMMARY: string;

  @Field(() => ObjectIdScalar)
  @prop({ required: true, type: () => ObjectId })
  public userId: ObjectId;

  @Field()
  @prop({ required: true, default: false, type: () => Boolean })
  public rsvp: boolean;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @prop({ default: null, type: () => Date })
  public rsvpTS: Date;

  @Field()
  @prop({ required: true, default: false, type: () => Boolean })
  public checkedIn: boolean;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @prop({ default: null, type: () => Date })
  public checkedInTS: Date;
}

export const EventMetaModel = getModelForClass(EventMeta);
