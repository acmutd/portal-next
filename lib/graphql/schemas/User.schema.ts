import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class User {
  @prop({ type: () => String })
  @Field(() => String)
  public _id: string;

  @Field(() => String)
  @prop({ required: true, type: () => String })
  public name: string;

  @prop({ type: () => String })
  @Field(() => String)
  public email: string;

  @prop({ type: () => Boolean })
  @Field(() => Boolean, { nullable: true })
  public emailVerified?: boolean;

  @prop({ type: () => String })
  @Field(() => String)
  public image: string;
}

export const UserModel = getModelForClass(User);
