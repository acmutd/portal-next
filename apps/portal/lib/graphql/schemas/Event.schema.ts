import { getModelForClass, prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { Field, GraphQLISODateTime, InputType, ObjectType } from 'type-graphql';
import ObjectIdScalar from '../scalars/ObjectIDScalar';

@ObjectType()
@InputType('EventInput')
export default class Event {
  @Field(() => ObjectIdScalar, { nullable: true })
  @prop({ type: () => ObjectId })
  public _id: ObjectId;

  @Field()
  @prop({ type: () => String })
  public summary: string;

  @Field({ nullable: true })
  @prop({ type: () => String, required: false })
  public description?: string;

  @Field({ nullable: true })
  @prop({ type: () => String, required: false })
  public url?: string;

  @Field({ nullable: true })
  @prop({ type: () => String, required: false })
  public location?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @prop({ type: () => Date, required: false })
  public start?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @prop({ type: () => Date, required: false })
  public end?: Date;
}

export const eventModel = getModelForClass(Event);
