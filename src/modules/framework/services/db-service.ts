import { Injectable } from "@angular/core";

import { AsyncSubject, Observable } from "rxjs";



@Injectable()
export class DbService
{
    public setChannels(value: string):Observable<any> {
        let ret:AsyncSubject<any> = new AsyncSubject<any>();
        
        var request = this.db.transaction([this.urlTable], "readwrite")
   .objectStore(this.urlTable)
   .add({ id: "1", url:value });
   
    request.onsuccess = function(event:any ) {
      ret.next(event);
      ret.complete();
   };
   
   request.onerror = function(event:any) {
      ret.error(event);
      ret.complete();

    };
    return ret;

    }
    channelsTable = "channelsTable";
    categoriesTable = "categoriesTable";
    urlTable = "urlTable";
    public db?:any = null;
    constructor()
    {
        
        
 
        if (!window.indexedDB) {
            
            window.alert("Your browser doesn't support a stable version of IndexedDB.")
        }

        this.db = window.indexedDB.open("webiptv");
    }
}