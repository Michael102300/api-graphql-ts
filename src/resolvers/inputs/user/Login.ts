import {InputType, Field} from 'type-graphql'

@InputType()
export class loginInput{
    @Field(()=> String)
    email!: string;
    @Field(()=> String)
    password!: string;
}