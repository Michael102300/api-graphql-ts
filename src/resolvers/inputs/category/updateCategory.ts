import { InputType, Field } from "type-graphql";

@InputType()
export class updateCategoryInput{
    @Field( () => String)
    name!: string;
}