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

        let request = window.indexedDB.open("webiptv", 9);

        request.onupgradeneeded = () => {
            this.db = request.result;
            this.db.createObjectStore(this.urlTable, { keyPath: "id" });
            var channelsStore = this.db.createObjectStore(this.channelsTable, { keyPath: "tvgName" });
            this.channelsNameIndex = channelsStore.createIndex(this.channelsTable + "NameIndex", ["tvgName"]);
            this.categoriesNameIndex = channelsStore.createIndex(this.channelsTable + "CatIndex", ["groupTitle"]);

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
            ret.next(request.result?.url);
            ret.complete();
        };

        request.onerror = function (event: any) {
            ret.error(event);
            ret.complete();

        };


        return ret;

    }


    public getChannel(tvgName:string): Observable<ChannelsModel> {
        let ret: AsyncSubject<ChannelsModel> = new AsyncSubject<ChannelsModel>();
        
        var request = this.db.transaction([this.channelsTable], "readwrite")
            .objectStore(this.channelsTable)
            .get(tvgName);

        request.onsuccess = function (event: any) {
            ret.next(request.result);
            ret.complete();
        };

        request.onerror = function (event: any) {
            ret.error(event);
            ret.complete();

        };


        return ret;

    }


    public removeChannel(tvgName:string): Observable<any> {
        let ret: AsyncSubject<any> = new AsyncSubject<any>();
        
        var request = this.db.transaction([this.channelsTable], "readwrite")
            .objectStore(this.channelsTable)
            .delete(tvgName);

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


    public addChannel(value: ChannelsModel): Observable<any> {
        let ret: AsyncSubject<any> = new AsyncSubject<any>();
        this.removeChannel(value.tvgName).subscribe(() => {

        }, () => { }, () => {


            var request = this.db.transaction([this.channelsTable], "readwrite")
                .objectStore(this.channelsTable)
                .add(value);

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

    public updateChanel(channel:ChannelsModel): Observable<void> {
        let ret: AsyncSubject<void> = new AsyncSubject<void>();
        
        var request = this.db.transaction([this.channelsTable], "readwrite")
            .objectStore(this.channelsTable)
            .put(channel);

        request.onsuccess = function (event: any) {
            ret.next(request.result);
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


export class ChannelsModel
{
    public tvgId?:string ;
    public tvgName:string="";
    public tvgLogo?:string;
    public groupTitle?:string;
    public tvgUrl?:string;
}