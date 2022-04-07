import { Field, InputType, ObjectType } from 'type-graphql';

@InputType()
export class EventCheckinInput {
  @Field()
  public eventId!: string;

  @Field()
  public profileId!: string;
}

@ObjectType()
export class EventCheckin {
  @Field()
  public eventId!: string;

  @Field()
  public profileId!: string;

  @Field()
  public messageId!: string;
}
