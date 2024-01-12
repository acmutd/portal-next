
import {ObjectType, Field, Float } from 'type-graphql';

// ** Will be used later for the rest of the spreadsheet 

// @ObjectType() 
// export class SpreadsheetDivisionType { 
//     @Field() 
//     public itemName?: string;

//     @Field( () => Int,  {nullable: true} )
//     public quantity?: number;

//     @Field ( () => Int,  {nullable: true}) 
//     public costPerItem?: number;

//     @Field ( () => Int, {nullable: true} )
//     public totalCost?: number;

//     @Field ( () => Int, {nullable: true} )
//     public actualCost?: number; 

//     @Field( {nullable: true})
//     public notes?: string;
// }

@ObjectType()
export class SpreadsheetOverviewRevenueType { 
    @Field()
    public itemName!: string;
    @Field( () => Float)
    public budgetAmount!: number;
    @Field()
    public notes?: string;
}

@ObjectType()
export class SpreadsheetOverviewDivisionsType { 
    @Field()
    public divisionsName !: string;
    @Field( () => Float)
    public estimatedBudget !: number;
    @Field( () => Float )
    public actualBudget !: number;
    @Field( () => Float  )
    public difference !: number;
    @Field()
    public notes ?: string;
}