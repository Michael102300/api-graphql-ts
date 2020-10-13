import { 
    Query, 
    Resolver, 
    Mutation, 
    Arg, 
    ID, 
    UseMiddleware, 
    Ctx,
    Int
} from 'type-graphql';

import { User } from '../entity/user';
import { Recipe } from '../entity/recipe';
import { Category } from '../entity/category';
import { createRecipeInput } from './inputs/recipe/createRecipe';
import { updateRecipeInput } from './inputs/recipe/updateRecipe';
import { isAuth } from '../helper/auth/isAuth';
import { MyContext } from '../helper/context';

@Resolver()
export class recipeResolver {

    
    @Query(()=> [Recipe!], {nullable: true})
    @UseMiddleware(isAuth)
    async getRecipes( @Ctx() { payload}: MyContext ){
        try {
            /* const user = await User.findOne({ email: payload?.email});
            if(!user){
                throw new Error('Access denied');
            }; */
            const recipes = await Recipe.find();
            return recipes;
        } catch (error) {
            console.log(error);
            throw error; 
        }
    }
    
    @Query(()=> Recipe, { nullable: true })
    @UseMiddleware(isAuth)
    async getOneRecipe(
            @Ctx() { payload}: MyContext, 
            @Arg("name",() => String) 
            name: string
            ){
        try {
            /*  const user = await User.findOne({ email: payload?.email })
            if(!user){
                throw new Error('Access denied');
            }; */
            const recipe = await Recipe.findOne({ name })
            return recipe;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
    @Query(()=> [Recipe], {nullable: true})
    @UseMiddleware(isAuth)
    async getMyRecipes(
            @Ctx() { payload }: MyContext,
        ){
        try {
            const user = await User.findOne({ email: payload?.email});
            if(!user){
                throw new Error('Access denied');
            };
            const recipes = await Recipe.find({ user: user})
            return recipes;
        } catch (error) {
            console.log(error);
            throw error;
        }
        
    }

    @Mutation(() => Recipe)
    @UseMiddleware(isAuth)
    async createRecipe( 
        @Ctx() { payload }: MyContext, 
        @Arg("input", () => createRecipeInput) input: createRecipeInput
        ){
        try {
            const user = await User.findOne({ email: payload?.email})
                if(!user){
                    throw new Error('Access denied');
                };
            const category = await Category.findOne({ name: input.category})
            const newRecipe = await Recipe.create({ 
                name: input.name,
                description: input.description,
                ingredients: input.ingredients,
                user: user,
                category: category
            })
            const result = await newRecipe.save()
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @Mutation(() => Recipe)
    @UseMiddleware(isAuth)
    async updateRecipe(
        @Ctx() { payload } : MyContext,
        @Arg("id", () => Int) id: number,
        @Arg("input", () => updateRecipeInput) input: updateRecipeInput){
            try {
                const user = await User.findOne({ email: payload?.email})
                if(!user){
                    throw new Error('Access denied');
                };
                const recipe = await Recipe.findOne({ id: id})
                if(recipe!.user.id !== user.id){
                    throw new Error('Not authorized');
                }
                const category = await Category.findOne({ name: input.category})
                if(!category){
                    throw new Error('Category not exists');
                }
                const result = await Recipe.update({id},{
                    name: input.name,
                    description: input.description,
                    ingredients: input.ingredients,
                    category: category
                });
                return result;
            } catch (error) {
                console.log(error);
                throw error;
            }
    }

    @Mutation(() => String)
    @UseMiddleware(isAuth)
    async deleteRecipe(
        @Ctx() { payload } : MyContext,
        @Arg("id", () => ID) id: number,
        ){
            try {
                const user = await User.findOne({ email: payload?.email})
                if(!user){
                    throw new Error('Access denied');
                };
                const recipe = await Recipe.findOne({ id: id})
                if(recipe!.user.id !== user.id){
                    throw new Error('Not authorized')
                }
                await Recipe.delete(id);
                return "Recipe successfully deleted";
            } catch (error) {
                console.log(error);
                throw error;
            }
    }

}

