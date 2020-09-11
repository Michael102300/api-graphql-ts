import { InputType, Field, ID } from "type-graphql";

@InputType()
export class updateRecipeInput{

    @Field( {nullable: true} )
    name?: string;
    @Field( {nullable: true} )
    description?: string;
    @Field( {nullable: true} )
    ingredients?: string;
    @Field( {nullable: true} )
    category?: string;
}