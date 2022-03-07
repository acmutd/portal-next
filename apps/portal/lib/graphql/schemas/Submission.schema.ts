import { getModelForClass, prop, PropType, Ref } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { Field, GraphQLISODateTime, InputType, ObjectType } from 'type-graphql';
import ObjectIdScalar from '../scalars/ObjectIDScalar';
import Application from './Application.schema';
import User from './User.schema';

@InputType()
export class SubmitInput {
  @Field(() => ObjectIdScalar)
  applicationId: Ref<Application>;

  @Field(() => ObjectIdScalar)
  userId: Ref<User>;

  @Field(() => [String])
  responses: string;
}

@InputType()
export class SubmissionFilter {
  @Field(() => ObjectIdScalar, { nullable: true })
  _id?: ObjectId;

  @Field(() => ObjectIdScalar, { nullable: true })
  applicationId?: ObjectId;

  @Field(() => ObjectIdScalar, { nullable: true })
  userId?: ObjectId;

  @Field({ nullable: true })
  applicationStatus?: string;
}

@ObjectType()
export default class Submission {
  @Field(() => ObjectIdScalar)
  _id: ObjectId;

  @prop({ required: true, ref: () => Application })
  public applicationId: Ref<Application>;

  @prop({ required: true, ref: () => User })
  public userId: Ref<User>;

  @Field()
  @prop({ type: () => String, default: 'submitted' })
  public applicationStatus: string;

  @Field(() => GraphQLISODateTime)
  @prop({ type: () => Date })
  public createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @prop({ type: () => Date })
  public modifiedAt: Date;

  @Field(() => [String])
  @prop({ type: () => [String] }, PropType.ARRAY)
  public responses: string[];
}

export const SubmissionModel = getModelForClass(Submission);
