import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { Field, InputType, ObjectType } from 'type-graphql';
import ObjectIdScalar from '../scalars/ObjectIDScalar';

@InputType()
export class UserFilter {
  @Field(() => ObjectIdScalar, { nullable: true })
  _id?: ObjectId;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;
}

@ObjectType()
@modelOptions({ schemaOptions: { collection: 'users' }, options: { customName: 'users' } })
export default class User {
  @Field(() => ObjectIdScalar)
  _id: ObjectId;

  @Field()
  @prop({ required: true, type: () => String })
  public name: string;

  @prop({ type: () => String })
  @Field()
  public email: string;

  @prop({ type: () => Boolean })
  @Field({ nullable: true })
  public emailVerified?: boolean;

  @prop({ type: () => String })
  @Field()
  public image: string;
}

export const UserModel = getModelForClass(User);
