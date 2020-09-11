import { Entity, Column, BaseEntity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Recipe } from './recipe';

@ObjectType()
@Entity()
export class Category extends BaseEntity{

    @Field(() => ID)    
    @PrimaryGeneratedColumn()
    id!: number;

    @Field( () => String)
    @Column()
    name!: string;

    @Field( type => Recipe )
    @OneToMany( type => Recipe, recipe => recipe.category )
    recipes!: Recipe[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updateAt!: Date;
}