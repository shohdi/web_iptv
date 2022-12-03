import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/modules/framework/services/db-service';
import { FormGroup, FormControl, FormArray,Validators } from '@angular/forms'
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
              
             },()=>{ 
             
              this.loading = false;});
            
          },(err)=>{
            this.loading=false;
            console.log(err);
            alert(err );
          });
         
      }
  }
  handleResponse(res: string) {
    
  }

}
