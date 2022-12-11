

import { AsyncSubject, Observable } from "rxjs";




export class WaitForPrevious {
    public constructor(private func:(()=>Observable<any>))
    {

    }
    

    public next?:WaitForPrevious;
    

    public run():void
    {
        this.func().subscribe(
            ()=>{},()=>{},()=>{
                if(this.next != null)
                {
                    let next = this.next;
                    next.run();
                }
            }
        );
    }

}