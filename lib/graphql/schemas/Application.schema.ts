import { prop } from '@typegoose/typegoose';
import { Date } from 'mongoose';

export default class Application {
  @prop()
  public name: string;

  @prop()
  public subtitle: string;

  @prop()
  public description: string;

  @prop()
  public questions: [{ questionType: string; question: string }];

  @prop()
  public dateStart: Date;

  @prop()
  public dateEnd: Date;

  @prop()
  public active: boolean;
}
