import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection,  } from 'typeorm';
import dotEnv from 'dotenv';

import { userResolver } from './resolvers/user';
import { recipeResolver } from './resolvers/recipe';
import { categoryResolver } from './resolvers/category';



async function main(){

    const app = express();
    await createConnection();
    dotEnv.config();
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [
                userResolver,
                recipeResolver,
                categoryResolver 
            ],
            validate: false,
            
            authChecker: () => {
                return true
            },
            dateScalarMode: "isoDate"
        }),
        context: ({ req, res }) => ({ req, res })
        
    });
    const PORT = process.env.PORT || 3000;
    apolloServer.applyMiddleware({ app, path: '/graphql'});
    app.listen(PORT, () => {
        console.log(`Server listening on PORT: ${PORT}`);
        console.log(`Server ready in http://localhost:${PORT}/graphql`);
    })
    return app;
}
main();