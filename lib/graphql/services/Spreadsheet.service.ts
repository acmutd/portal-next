import { singleton } from "tsyringe";
import {  zip } from "lodash";
import {sheets_v4} from 'googleapis'

function createSpreadsheetObject( obj: any, propertyNames: string[][] ) {

    const spreadSheetObject:{ [ key:string ] : any } = {}; 
    
    for ( let i = 0; i < propertyNames.length; i++ ) {
        
        if ( !obj[i] ){ 
            spreadSheetObject[propertyNames[i][0]] = "";
            continue; 
        }

        if ( propertyNames[i][1] == 'string') {
            spreadSheetObject[ propertyNames[i][0] ] = obj[i];
        } 
        else 
        {
            spreadSheetObject[ propertyNames[i][0]] = obj[i].replace(/[^\d.]/g, '') 
        } 

    }

    return spreadSheetObject
}


@singleton()
export default class SpreadsheetService { 

    async getSheetData(sheetData: sheets_v4.Schema$ValueRange [], startIndex : number , endIndex : number, propertyNames: string[][] ) {
        
        // Convert the sheetData ( object of object ) into an array of string for simplicity 
        let googleSheetRowData: string[][] = [] 
        for ( let i = 0; i < sheetData.length; i++ ) {
            googleSheetRowData.push(  sheetData[i].values!.map( (rowObj) => (rowObj.length === 0) ? "" : rowObj[0] as string ) )  
            // Split the array to contain only the important information 
            googleSheetRowData[i] = googleSheetRowData[i].splice( startIndex , endIndex )
        }
        
        const zippedSheetDataArray = zip(  ...googleSheetRowData.slice(0, sheetData.length ) )   

        return zippedSheetDataArray.map( entry => createSpreadsheetObject( entry, propertyNames ))
    }
}