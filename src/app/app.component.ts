import { Component } from '@angular/core';
import { IngestionExternalHttpService } from 'src/config/ingestion.http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Polus Datastore';

  constructor(){

  }

}
