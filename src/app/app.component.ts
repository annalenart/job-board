import { Component, OnInit } from '@angular/core';
import { JobsProviderService } from './jobs-provider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private dataStorageService: JobsProviderService) {
  }

  ngOnInit(): void {
    this.dataStorageService.getJobs();
  }

}
