import { Field, InputType, ObjectType } from 'type-graphql';
import FileCategory from '../../enums/FileCategory';
import Action from '../../enums/Action';

@InputType()
export class SignedURLInput {
  @Field(() => Action, { nullable: true })
  public action: Action;

  @Field(() => FileCategory, { nullable: true })
  public fileType: FileCategory;
}

@ObjectType()
export default class SignedURL {
  @Field(() => Action, { nullable: true })
  public action: Action;

  @Field(() => FileCategory, { nullable: true })
  public fileType: FileCategory;

  @Field({ nullable: true })
  public url: string;
}
