import { prop, Ref } from '@typegoose/typegoose';
import Profile from './Profile.schema';
import User from './User.schema';

export default class Event {
  @prop()
  public icalId!: string;

  @prop()
  public SUMMARY: string;

  @prop()
  public DTSTAMP: string;

  @prop()
  public DTSTART: string;

  @prop()
  public DTEND: string;

  @prop()
  public rsvp: {
    userId: Ref<User>;
    firstName: string;
    lastName: string;
    email: string;
  };

  @prop()
  public attend: {
    userId: Ref<Profile>;
    firstName: string;
    lastName: string;
    email: string;
  };
}
