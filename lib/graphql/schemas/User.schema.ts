import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class User {
  @Field()
  @prop({ type: () => String })
  public _id: string;

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
