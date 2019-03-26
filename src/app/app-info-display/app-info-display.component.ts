import { Component, OnInit } from '@angular/core';
import { IngestionExternalHttpService } from 'src/config/ingestion.http.service';

@Component({
  selector: 'app-app-info-display',
  templateUrl: './app-info-display.component.html',
  styleUrls: ['./app-info-display.component.scss']
})
export class AppInfoDisplayComponent implements OnInit {
  private data;

  constructor(private observe: IngestionExternalHttpService) { 
  }
  
  ngOnInit() {
  }
  
}
