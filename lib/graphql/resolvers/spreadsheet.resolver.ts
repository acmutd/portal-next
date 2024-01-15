import { Query } from "type-graphql";
import { injectable } from "tsyringe";
import { readSpreadsheet } from "../utilities/spreadsheet/setup";
import { isEqual } from "lodash";
import SpreadsheetService from "../services/Spreadsheet.service";
import { SpreadsheetOverviewRevenueType, SpreadsheetOverviewDivisionsType } from "../schemas/Spreadsheet";

@injectable()
export default class spreadsheetResolver { 
    constructor( private spreadsheetService : SpreadsheetService ) {} 

    @Query( () => [SpreadsheetOverviewRevenueType] )
    async getSpreadsheetOverviewRevenueData() {

        const revenueData = await readSpreadsheet( ["Overview!B2:B", "Overview!D2:D", "Overview!F2:F" ] ); 
        
        if (!revenueData) return [] 
        
        const propertyNames = [ ['itemName', 'string'], ['budgetAmount', 'float'], ['notes', 'string']]
        const startIndex = 1 ;
        const endIndex =  revenueData?.at(0)?.values?.findIndex( obj => isEqual( obj, ['Sub Category'] ) )   || -1 

        // Sanity check in case google sheet column is no longer called "Sub category"
        if (endIndex === -1 ) throw new Error("Cannot find end index of revenue section in Overview sheet- looking for cell 'Sub Category' " );
        

        return this.spreadsheetService.getSheetData( revenueData, startIndex, endIndex - 2, propertyNames )
    }

    @Query( () => [SpreadsheetOverviewDivisionsType] )
    async getSpreadsheetOverviewDivisionsData() {

        const revenueData = await readSpreadsheet( [ "Overview!B2:B", "Overview!C2:C",
                                                     "Overview!D2:D", "Overview!E2:E", "Overview!F2:F" ] );
        if (!revenueData) return [] 

        const propertyNames = [ ['divisionsName', 'string' ], ['estimatedBudget', 'float'] , 
                                ['actualBudget', 'float'],    ['difference', 'float'] ,   ['notes', 'string'] ]

        const startIndex =  revenueData?.at(0)?.values?.findIndex( obj => isEqual( obj, ['Sub Category'] ) )   || -1 
        
        // Sanity check in case google sheet column is no longer called "Sub category"
        if (startIndex === -1 ) throw new Error("Cannot find start index of division section in Overview sheet - looking for cell 'Sub Category' " );
        
        const endIndex = revenueData?.at(0)?.values?.findIndex( obj => isEqual( obj, ['Events'] ) )   || -1 
        
        // Sanity check in case google sheet column is no longer called "Events"
        if (endIndex === -1 ) throw new Error("Cannot find start index of division section in Overview sheet - looking for cell 'Events' " );
    
        return this.spreadsheetService.getSheetData( revenueData, startIndex + 2, endIndex - startIndex - 4, propertyNames )
    }
}