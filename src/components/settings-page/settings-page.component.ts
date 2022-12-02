import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/modules/framework/services/db-service';
import { FormGroup, FormControl, FormArray,Validators } from '@angular/forms'

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

  constructor(private db:DbService) { }

  ngOnInit(): void {

  }

  public formSubmit():void
  {
      
      if (this.form.valid)
      {
        this.loading = true;
          //alert(this.txtM3u.value );
          this.db.setChannels(this.txtM3u.value);
          this.loading = false;
      }
  }

}
