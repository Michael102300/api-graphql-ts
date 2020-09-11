import { InputType, Field } from "type-graphql";


@InputType()
export class createRecipeInput{
    @Field()
    name!: string;
    @Field()
    description!: string;
    @Field()
    ingredients!: string;
    @Field()
    category!: string;
}