import {InputType, Field} from 'type-graphql'

@InputType()
export class signupInput{
    @Field()
    name!: string;
    @Field()
    email!: string;
    @Field()
    password!: string;
}