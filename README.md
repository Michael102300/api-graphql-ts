#GRAPHQL-API
This api is developed with ts, type-graphql, typeorm, mysql, it is an api that is in charge of entering and registering users and obtaining an authentication with jsonwebtoken to be able to make queries and records
####Queries
- get recipes
- getOneRecipe
- getMyRecipe
- getCategory
- getCategories

####Mutations
- login
- signup
- createRecipe
- updateRecipe
- deleteRecipe
- createCategory
- updateCategory
- deleteCategory


In the project directory, you can run:

 **npm install **

 First to dowload all dependencies, after you config the typeorm in file ormconfig.json in this file configure your database, with your configuration, homewever you have to create a database first  before executing the following command.

 **npm run dev**

 Runs the app in the development mode.
Open http://localhost:3001/graphql to view it in the browser.
