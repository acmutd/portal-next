import { prop, Ref } from '@typegoose/typegoose';
import User from './User.schema';

export default class Accounts {
  @prop()
  public provider: string;

  @prop()
  public type: string;

  @prop()
  public providerAccountId: string;

  @prop()
  public access_token: string;

  @prop()
  public expires_at: number;

  @prop()
  public scope: string;

  @prop()
  public token_type: string;

  @prop()
  public id_token: string;

  @prop()
  public userId: Ref<User>;
}
