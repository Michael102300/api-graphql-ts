import { MiddlewareFn } from 'type-graphql';
import * as jwt from 'jsonwebtoken';
import { MyContext } from '../context/index';


export const isAuth: MiddlewareFn<MyContext> = async ( { context }, next ) => {
    try {
        const authorization = context.req.headers["authorization"];
        if (authorization) {
            const token = authorization.split(" ")[1];
            const payload = jwt.verify(token, process.env.JWT_SECRET_KEY ||'mysecretkey');
            context.payload = payload as any;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
    return next();
}