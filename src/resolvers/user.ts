import { 
    Query, 
    Resolver, 
    Mutation, 
    Arg,
    Ctx,
    UseMiddleware
    } from 'type-graphql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


import { User } from '../entity/user';
import { isAuth } from '../helper/auth/isAuth';
import { MyContext } from '../helper/context/index';
import { signupInput } from './inputs/user/SignUp';
import { loginInput } from './inputs/user/Login';

@Resolver()
export class userResolver { 

    @Query(()=> User)
    @UseMiddleware(isAuth)
    async user(@Ctx() { payload }: MyContext){
        try {
            if(!payload?.email){
                throw new Error('Access denied!')
            }
            const user = await User.findOne({ email: payload?.email});
            if(!user){
                throw new Error('User not found')
            }
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @Mutation(() => User)
    async signup(@Arg("input", () => signupInput) input: signupInput){
        try {
            const user = await User.findOne({ email: input.email})
            if(user){
                throw new Error('Email already in use')
            }
            const hashedPassword = await bcrypt.hash(input.password, 12);
            const newUser = await User.create({...input, password: hashedPassword });
            const result = await newUser.save()
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    @Mutation(() => String)
    async login(@Arg("input", () => loginInput) input: loginInput){
        try {
            const user = await User.findOne({ email: input.email })
            console.log(user);
            if(!user){
                throw new Error(`User don't found`)
            }
            const isPasswordValid = await bcrypt.compare( input.password, user.password);
            if(!isPasswordValid){
                throw new Error('Incorrect password');
            }
            const secret = 'mysecretkey';
            const token = jwt.sign({ email: user.email }, secret, { expiresIn:'1d'});
            return token;
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}


