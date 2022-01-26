import { prop } from '@typegoose/typegoose';

export default class User {
  @prop()
  public name: string;

  @prop()
  public email: string;

  @prop()
  public emailVerified: boolean;

  @prop()
  public image: string;
}
