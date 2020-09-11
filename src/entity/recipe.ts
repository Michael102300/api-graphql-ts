import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './user';
import { Category } from './category';

@ObjectType()
@Entity()
export class Recipe extends BaseEntity{

    @Field(() => ID)    
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column()
    name!: string;

    @Field( () => String)
    @Column()
    description!: string;

    @Field( ()=> String)
    @Column()
    ingredients!: string;

    @Field( type => Category)
    @ManyToOne( type => Category, category => category.name, {eager: true, onDelete: 'CASCADE'} )
    category! : Category;

    @Field( type => User)
    @ManyToOne(type=> User, user => user.recipes, {eager: true, onDelete: 'CASCADE'} )
    user!: User;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updateAt!: Date;
}