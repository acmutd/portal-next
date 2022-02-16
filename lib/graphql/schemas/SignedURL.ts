import { Field, InputType, ObjectType } from 'type-graphql';
import Uploadable from '../../enums/Uploadable';
import Transfer from '../../enums/Transfer';

@InputType()
export class SignedURLInput {
  @Field(() => Transfer, { nullable: true })
  public transfer: Transfer;

  @Field(() => Uploadable, { nullable: true })
  public fileType: Uploadable;

  @Field()
  public extension: string;
}

@ObjectType()
export default class SignedURL {
  @Field(() => Transfer, { nullable: true })
  public transfer: Transfer;

  @Field(() => Uploadable, { nullable: true })
  public fileType: Uploadable;

  @Field({ nullable: true })
  public url: string;
}
