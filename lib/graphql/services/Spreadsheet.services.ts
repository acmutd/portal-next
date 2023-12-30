import { singleton } from "tsyringe";
import { readData } from "../utilities/spreadsheet/setup";
import { SpreadsheetType } from "../schemas/Spreadsheet";
/*
- Define schema and how graphql will work with that schema 
*/

@singleton()
export default class SpreadsheetServices { 
    


    async getSpreadsheetData(): Promise< SpreadsheetType> 
}