import { prop, Ref } from '@typegoose/typegoose';
import { Date } from 'mongoose';
import User from './User.schema';

export default class EventMeta {
  @prop()
  public icalId: string;

  @prop()
  public SUMMARY: string;

  @prop()
  public userId: Ref<User>;

  @prop()
  public rsvp: boolean;

  @prop()
  public rsvpTS: Date;

  @prop()
  public checkedIn: boolean;

  @prop()
  public checkedInTS: Date;
}
