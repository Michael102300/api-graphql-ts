import { MiddlewareFn } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { MyContext } from '../context/index';
import { User } from '../../entity/user';


export const isAuth: MiddlewareFn<MyContext> = async ( { context }, next ) => {
    try {
        const authorization = context.req.headers["authorization"];
        if (authorization) {
            const token = authorization.split(" ")[1];
            const payload = jwt.verify(token, process.env.JWT_SECRET_KEY ||'mysecretkey');
            const user = await User.findOne({ email: context.payload?.email})
            context.payload = payload as any;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
    return next();
}