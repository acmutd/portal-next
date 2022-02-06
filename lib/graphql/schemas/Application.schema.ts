import { getModelForClass, index, prop, PropType } from '@typegoose/typegoose';
import { Field, GraphQLISODateTime, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@InputType('ApplicationQuestionInputType')
class ApplicationQuestion {
  @Field()
  @prop({ type: () => String, required: true })
  questionType: string;

  @Field()
  @prop({ type: () => String, required: true })
  question: string;

  @Field(() => [String], { nullable: true })
  @prop({ type: () => [String], default: [] }, PropType.ARRAY)
  answers?: string[];
}

@InputType()
export class ApplicationFilter {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  active?: boolean;

  @Field(() => GraphQLISODateTime, {
    nullable: true,
    description: 'Filter all applications that close after this date value',
  })
  closeAfter?: Date;
}

@InputType('ApplicationInputType')
@ObjectType()
@index({ name: 1 }, { collation: { locale: 'en', strength: 2 } })
export default class Application {
  @Field()
  @prop({ type: () => String, required: true })
  public name: string;

  @Field()
  @prop({ type: () => String, required: true })
  public subtitle: string;

  @Field()
  @prop({ type: () => String, required: true })
  public description: string;

  @Field(() => [ApplicationQuestion])
  @prop({ type: () => [ApplicationQuestion], required: true })
  public questions: ApplicationQuestion[];

  @Field(() => GraphQLISODateTime)
  @prop({ type: () => Date, required: true })
  public dateStart: Date;

  @Field(() => GraphQLISODateTime)
  @prop({ type: () => Date, required: true })
  public dateEnd: Date;

  @Field()
  @prop({ type: () => Boolean, default: false })
  public active: boolean;
}

export const ApplicationModel = getModelForClass(Application);
