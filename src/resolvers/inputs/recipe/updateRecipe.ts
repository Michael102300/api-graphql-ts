import { InputType, Field } from "type-graphql";

@InputType()
export class updateRecipeInput{

    @Field(()=> String, {nullable: true} )
    name?: string;
    @Field(()=> String, {nullable: true} )
    description?: string;
    @Field(()=> String, {nullable: true} )
    ingredients?: string;
    @Field( ()=> String, {nullable: true} )
    category?: string;
}