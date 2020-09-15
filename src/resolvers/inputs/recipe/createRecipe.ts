import { InputType, Field } from "type-graphql";


@InputType()
export class createRecipeInput{
    @Field(()=> String)
    name!: string;
    @Field(()=> String)
    description!: string;
    @Field(()=> String)
    ingredients!: string;
    @Field(()=> String)
    category!: string;
}