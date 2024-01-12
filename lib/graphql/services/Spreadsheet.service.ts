import { singleton } from "tsyringe";
import { readSpreadsheet } from "../utilities/spreadsheet/setup";
import { SpreadsheetOverviewRevenueType, SpreadsheetOverviewDivisionsType } from "../schemas/Spreadsheet";
import { isEqual } from "lodash";

@singleton()
export default class SpreadsheetService { 

    async getSpreadsheetOverviewRevenueData() : Promise<SpreadsheetOverviewRevenueType[]> {

        const revenueData = await readSpreadsheet( ["Overview!B2:B", "Overview!D2:D", "Overview!F2:F" ] ); 

        const sheetArr:SpreadsheetOverviewRevenueType[] = []

        let i = 0;
        // Loop through the spreadsheet and stop at Sub Category 
        while ( ! isEqual( revenueData?.at(0)?.values?.at(i),  ['Sub Category'] ) ) {
            // Ignore the column with no data
            if ( ! isEqual ( revenueData?.at(0)?.values?.at(i), [])) {

                const sheetObject = new SpreadsheetOverviewRevenueType(); 
                
                sheetObject.itemName     = revenueData?.at(0)?.values?.at(i)?.toString() || ''
                sheetObject.budgetAmount = Number ( revenueData?.at(1)?.values?.at(i)?.toString().replace(/[^\d.]/g, '') ) 
                sheetObject.notes        = revenueData?.at(2)?.values?.at(i)?.toString()

                sheetArr.push( sheetObject )
            }
            i = i + 1
        }

        return sheetArr
    }

    async getSpreadsheetOverviewDivisionData(): Promise<SpreadsheetOverviewDivisionsType[]> {
        
        const revenueData = await readSpreadsheet( [ "Overview!B2:B", "Overview!C2:C",
                                                     "Overview!D2:D", "Overview!E2:E", "Overview!F2:F" ] );
                                                
        const sheetArr:SpreadsheetOverviewDivisionsType[] = []

        
        // Find the index of the beginning of the division section in the Spreadsheet
        let i = 1 + ( revenueData?.at(0)?.values?.findIndex( obj => isEqual( obj, ['Sub Category'] ) )  
                      ?? -1 )  
            
        //Loop through the spreadsheet and stop at next section 
        while ( ! isEqual( revenueData?.at(0)?.values?.at(i),  ['Events'] ) ) {
            // Ignore the column with no data
            if ( ! isEqual ( revenueData?.at(0)?.values?.at(i), [] ) ) {

                const sheetObject = new SpreadsheetOverviewDivisionsType(); 

                sheetObject.divisionsName     = revenueData?.at(0)?.values?.at(i)?.toString() || ''
                // Convert to string to remove unexpected character and symbols and convert to a number - only want digits
                sheetObject.estimatedBudget   = Number ( revenueData?.at(1)?.values?.at(i)?.toString().replace(/[^\d.]/g, '') ) 
                sheetObject.actualBudget      = Number ( revenueData?.at(2)?.values?.at(i)?.toString().replace(/[^\d.]/g, '') ) 

                const calculateDifference     = sheetObject.actualBudget - sheetObject.estimatedBudget 
                sheetObject.difference        = Number ( revenueData?.at(3)?.values?.at(i)  || ( Math.abs( calculateDifference ) ).toFixed(2) )

                sheetObject.notes             = revenueData?.at(4)?.values?.at(i)?.toString()

                sheetArr.push( sheetObject )
            }
            i = i + 1
        }
        return sheetArr
    }
}