import {InputType, Field} from 'type-graphql'

@InputType()
export class signupInput{
    @Field(()=> String)
    name!: string;
    @Field(()=> String)
    email!: string;
    @Field(()=> String)
    password!: string;
}