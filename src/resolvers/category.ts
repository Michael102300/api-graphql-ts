import { 
    Query, 
    Resolver, 
    Mutation, 
    Arg, 
    ID,
    Ctx,
    UseMiddleware, Int
} from 'type-graphql';

import { User } from '../entity/user';
import { Category } from '../entity/category';
import { Recipe } from '../entity/recipe';
import { createCategoryInput } from './inputs/category/createCategory';
import { updateCategoryInput } from './inputs/category/updateCategory';
import { isAuth } from '../helper/auth/isAuth';
import { MyContext } from '../helper/context';
import { EROFS } from 'constants';

@Resolver()
export class categoryResolver {

    @Query(()=> [Category!], { nullable: true})
    @UseMiddleware(isAuth)
    async getCategories( @Ctx() { payload }: MyContext ){
        try {
            const user = await User.findOne({ email: payload?.email});
            if(!user){
                throw new Error('Access denied');
            };
            const categories = await Category.find()
            return categories;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    @Query(()=> Category, { nullable: true})
    @UseMiddleware(isAuth)
    async getOneCategory(
            @Arg("name", () => String) name: string,
            @Ctx() { payload}: MyContext
        ){
        try {
            const user = await User.findOne({ email: payload?.email })
            if(!user){
                throw new Error('Access denied');
            };
            const category = await Category.findOne( { name });
            return category;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @Mutation(() => Category)
    @UseMiddleware(isAuth)
    async createCategory(
        @Arg("input", () => createCategoryInput) input: createCategoryInput,
        @Ctx() { payload }: MyContext
        ){
        try {
            const user = await User.findOne({ email: payload?.email})
                if(!user){
                    throw new Error('Access denied');
                };
            const category = await Category.findOne({ name: input.name});
            if(category){
                throw new Error('Category already exists')
            }
            const newCategory = await Category.create({ ...input});
            const result = newCategory.save()
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @Mutation(() => Category)
    @UseMiddleware(isAuth)
    async updateCategory(
        @Arg("id", () => Int) id: number,
        @Arg("input", () => updateCategoryInput) input: updateCategoryInput,
        @Ctx() { payload }: MyContext
        ){
            try {
                const user = await User.findOne({ email: payload?.email})
                if(!user){
                    throw new Error('Access denied');
                };
                const result = await Category.update({ id }, input )
                return result
            } catch (error) {
                console.log(error);
                throw error;
            }
    }

    @Mutation(() => String)
    @UseMiddleware(isAuth)
    async deleteCategory(
        @Ctx() { payload } : MyContext,
        @Arg("id", () => ID) id: number
        ){
        try {
            const user = await User.findOne({ email: payload?.email})
            if(!user){
                throw new Error('Access denied');
            };
            await Category.delete(id)
            return "Category successfully deleted";
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}



