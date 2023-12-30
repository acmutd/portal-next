// **** Worry about spliting up different categories later 

import {ObjectType, Field, Int } from 'type-graphql';

@ObjectType() 
export class SpreadsheetType { 
    @Field() 
    public itemName!: string;

    @Field( () => Int )
    public quantity!: number;

    @Field ( () => Int ) 
    public costPerItem!: number;

    @Field ( () => Int )
    public totalCost!: number;

    @Field ( () => Int, {nullable: true} )
    public actualCost?: number; 

    @Field()
    public notes!: string;
}