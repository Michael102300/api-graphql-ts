import { InputType, Field } from "type-graphql";

@InputType()
export class createCategoryInput{
    @Field()
    name!: string;
}