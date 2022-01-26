import { prop, Ref } from '@typegoose/typegoose';
import { Date } from 'mongoose';
import User from './User.schema';

export default class Sessions {
  @prop()
  public sessionToken: string;

  @prop()
  public userId: Ref<User>;

  @prop()
  public expires: Date;
}
