import { prop, Ref } from '@typegoose/typegoose';
import { Date } from 'mongoose';
import Application from './Application.schema';
import User from './User.schema';

export default class ApplicationMeta {
  @prop()
  public applicationId: Ref<Application>;

  @prop()
  public userId: Ref<User>;

  @prop()
  public applicationStatus: boolean;

  @prop()
  public createdAt: Date;

  @prop()
  public modifiedAt: Date;

  @prop()
  public responses: [string];
}
