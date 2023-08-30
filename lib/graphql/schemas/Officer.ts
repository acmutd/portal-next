import { Field, InputType } from "type-graphql";

@InputType()
export class AddUserToDivisionInput {
    @Field()
    public profileId!: string; 

    @Field()
    public divisionId!: string;
}