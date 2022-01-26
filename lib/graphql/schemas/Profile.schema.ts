import { prop, Ref } from '@typegoose/typegoose';
import { Date } from 'mongoose';
import User from './User.schema';

export default class Profile {
  @prop({ required: true })
  public firstName!: string;

  @prop({ required: true })
  public lastName!: string;

  @prop({ required: true })
  public email!: string;

  @prop({ required: true })
  public roles!: [string];

  @prop({ required: true })
  public netid!: string;

  @prop({ required: true })
  public classStanding!: string;

  @prop({ required: true })
  public graduation!: { semester: string; year: string };

  @prop({ required: true })
  public major!: string;

  @prop({ required: true })
  public utdStudent!: boolean;

  @prop({ required: true })
  public membershipStatus!: boolean;

  @prop()
  public membershipTS!: Date;

  @prop({ required: true })
  public resume!: boolean;

  @prop()
  public resumeTS!: Date;

  @prop()
  public discordMeta?: {
    snowflake: string;
    username: string;
    discriminator: string;
  };

  @prop()
  public userId: Ref<User>;
}
