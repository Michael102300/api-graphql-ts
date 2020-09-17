import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { ObjectType, Field, ID} from 'type-graphql';
import { Recipe } from './recipe';

@ObjectType()
@Entity()
export class User extends BaseEntity{

    @Field(() => ID)    
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    name!: string;

    @Field()
    @Column()
    email!: string; 

    @Field()
    @Column()
    password!: string;

    @Field( () => [Recipe] )
    @OneToMany( () => Recipe, recipe => recipe.user,  { cascade: true } )
    recipes!: Recipe[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updateAt!: Date;
}