import { Injectable } from "@angular/core";

import { AsyncSubject, Observable } from "rxjs";



@Injectable()
export class DbService {

    channelsTable = "channelsTable";
    
    urlTable = "urlTable";
    public db?: any = null;
    public channelsNameIndex?: any = null;
    public categoriesNameIndex?: any = null;
    constructor() {



        if (!window.indexedDB) {

            window.alert("Your browser doesn't support a stable version of IndexedDB.")
        }

        let request = window.indexedDB.open("webiptv", 3);

        request.onupgradeneeded = () => {
            this.db = request.result;
            this.db.createObjectStore(this.urlTable, { keyPath: "id" });
            var channelsStore = this.db.createObjectStore(this.channelsTable, { keyPath: "id" });
            this.channelsNameIndex = channelsStore.createIndex(this.channelsTable + "NameIndex", ["name"]);
            this.categoriesNameIndex = channelsStore.createIndex(this.channelsTable + "CatIndex", ["cat"]);

        };

        request.onsuccess = () => {
            this.db = request.result;
        };
    }



    public addUrl(value: string): Observable<any> {
        let ret: AsyncSubject<any> = new AsyncSubject<any>();
        this.removeUrl().subscribe(() => {

        }, () => { }, () => {


            var request = this.db.transaction([this.urlTable], "readwrite")
                .objectStore(this.urlTable)
                .add({ id: "1", url: value });

            request.onsuccess = function (event: any) {
                ret.next(event);
                ret.complete();
            };

            request.onerror = function (event: any) {
                ret.error(event);
                ret.complete();

            };

        });

        return ret;
    }

    public getUrl(): Observable<string> {
        let ret: AsyncSubject<string> = new AsyncSubject<string>();
        
        var request = this.db.transaction([this.urlTable], "readwrite")
            .objectStore(this.urlTable)
            .get("1");

        request.onsuccess = function (event: any) {
            ret.next(request.result.url);
            ret.complete();
        };

        request.onerror = function (event: any) {
            ret.error(event);
            ret.complete();

        };


        return ret;

    }

    public removeUrl(): Observable<any> {
        let ret: AsyncSubject<any> = new AsyncSubject<any>();

        var request = this.db.transaction([this.urlTable], "readwrite")
            .objectStore(this.urlTable)
            .delete("1");

        request.onsuccess = function (event: any) {
            ret.next(event);
            ret.complete();
        };

        request.onerror = function (event: any) {
            ret.error(event);
            ret.complete();

        };
        return ret;

    }




}