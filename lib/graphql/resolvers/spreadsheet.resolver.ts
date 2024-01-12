import { Query } from "type-graphql";
import { injectable } from "tsyringe";
import SpreadsheetService from "../services/Spreadsheet.service";
import { SpreadsheetOverviewRevenueType, SpreadsheetOverviewDivisionsType } from "../schemas/Spreadsheet";

@injectable()
export default class spreadsheetResolver { 
    constructor( private spreadsheetService : SpreadsheetService ) {} 

    @Query( () => [SpreadsheetOverviewRevenueType] )
    async getSpreadsheetOverviewRevenueData() {
        return this.spreadsheetService.getSpreadsheetOverviewRevenueData()
    }

    @Query( () => [SpreadsheetOverviewDivisionsType] )
    async getSpreadsheetOverviewDivisionsData() {
        return this.spreadsheetService.getSpreadsheetOverviewDivisionData()
    }
}