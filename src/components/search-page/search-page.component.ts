import { Component, OnInit } from '@angular/core';
import { ChannelsModel, DbService } from 'src/modules/framework/services/db-service';
import { FormGroup, FormControl, FormArray,Validators } from '@angular/forms'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AsyncSubject, Observable } from 'rxjs';
import { WaitForPrevious } from 'src/modules/framework/services/waitForPrevious';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  form = new FormGroup({
    txtSearch: new FormControl("")
});
get txtSearch(): FormControl {
  return this.form.get('txtSearch') as FormControl;
}

public loading?:boolean = false;

  constructor(private db:DbService,private http:HttpClient) { }

  ngOnInit(): void {
    //this.loading = true;
    
      
     
  }

  public formSubmit():void
  {
      
      if (this.form.valid)
      {
         
         
         
      }
  }
 

}
