import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/modules/framework/services/db-service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {


  constructor(private db:DbService) { }

  ngOnInit(): void {
    
  }

}
