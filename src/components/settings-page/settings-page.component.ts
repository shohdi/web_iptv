import { Component, OnInit } from '@angular/core';
import { ChannelsModel, DbService } from 'src/modules/framework/services/db-service';
import { FormGroup, FormControl, FormArray,Validators } from '@angular/forms'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AsyncSubject, Observable } from 'rxjs';
import { WaitForPrevious } from 'src/modules/framework/services/waitForPrevious';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  form = new FormGroup({
    txtM3u: new FormControl("",Validators.required)
});
get txtM3u(): FormControl {
  return this.form.get('txtM3u') as FormControl;
}

public loading?:boolean = false;

  constructor(private db:DbService,private http:HttpClient) { }

  ngOnInit(): void {
    this.loading = true;
    setTimeout(()=>{
      this.db.getUrl().subscribe((ret)=>{
        this.txtM3u.setValue(  ret);
        
      },()=>{},()=>this.loading = false);
    },1000);
      
     
  }

  public formSubmit():void
  {
      
      if (this.form.valid)
      {
        this.loading = true;
          //alert(this.txtM3u.value );
          this.db.addUrl(this.txtM3u.value).subscribe(()=>{
            const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
             this.http.get(this.txtM3u.value,{ headers, responseType: 'text'}).subscribe((res)=>{
              
              this.handleResponse(res);
              
             },(err)=>{
              this.loading = false;
             },()=>{ 
             
              });
            
          },(err)=>{
            this.loading=false;
            console.log(err);
            alert(err );
          });
         
      }
  }
  handleResponse(res: string) {

      let task:(WaitForPrevious|null) = null;
      let firstTask:(WaitForPrevious|null) = null;
      
      let arr = res.split("\n");
      for (let i=0;i<arr.length;i++)
      {
        if (i < (arr.length-1))
        {

          let str = arr[i];
          
          let tvgIdReg = /tvg-id="([^"]+)"/i;
          let tvgNameReg = /tvg-name="([^"]+)"/i;
          
          let tvgLogoReg = /tvg-logo="([^"]+)"/i;
          let tvgGroupTitleReg = /group-title="([^"]+)"/i;

          if(tvgNameReg.test(str))
          {
           

            let model:ChannelsModel = new ChannelsModel();
            model.tvgUrl  =  arr[i+1];
            model.tvgUrl = model.tvgUrl.replace("\r","").replace("\n","");
            let idVal = tvgIdReg.exec(str);
            if (idVal != null)
              model.tvgId = idVal[1];
            
            let nameVal = tvgNameReg.exec(str);
            if (nameVal != null)
              model.tvgName = nameVal[1];

            let logoVal = tvgLogoReg.exec(str);
            if (logoVal != null)
                model.tvgLogo = logoVal[1];

            let groupTitleVal = tvgGroupTitleReg.exec(str);
            if (groupTitleVal != null)
                model.groupTitle = groupTitleVal[1];

            
            
            if(task == null)
            {
              task = new  WaitForPrevious(()=>{
                return this.db.addChannel(model);
              });
              firstTask = task;
            }
            else
            {
              let oldTask = task;
              task = new  WaitForPrevious(()=>{
                return this.db.addChannel(model);
              });
              oldTask.next = task;
            }
            

            

            
          }
          
        }
      }

      if(task != null)
      {
        task.next = new  WaitForPrevious(()=>{
          let ret: AsyncSubject<any> = new AsyncSubject<any>();
          this.loading = false;
          ret.next(null);
          ret.complete();
          return ret;
        });
      }

      if (firstTask != null)
        firstTask.run();

      
 

    


  }

}
