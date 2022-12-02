import { Injectable } from "@angular/core";



@Injectable()
export class DbService
{
    channelsTable = "webiptv.channelsTable";
    categoriesTable = "webiptv.categoriesTable";
    urlTable = "webiptv.urlTable";

    constructor()
    {
        
        
 
        if (!window.indexedDB) {
            window.alert("Your browser doesn't support a stable version of IndexedDB.")
        }
    }
}