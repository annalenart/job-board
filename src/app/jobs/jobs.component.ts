import { Component, OnInit } from '@angular/core';
import { Jobs, JobsProviderService } from '../jobs-provider.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  allJobs: Jobs;
  jobs: Jobs;

  constructor(private jobsProvider: JobsProviderService) {
  }

  ngOnInit(): void {
    this.jobsProvider.getJobs().subscribe((jobs: Jobs) => {
      this.allJobs = jobs;
      this.jobs = jobs;
    });
  }

  filterJobs(filters: Array<string>) {
    this.jobs = this.allJobs.filter(job => {
      return JobsComponent.arrayToLower(filters)
        .every((val: string) => JobsComponent.arrayToLower([job.role, job.level, ...job.languages]).includes(val));
    });
  }

  private static arrayToLower(arr: Array<string>): Array<string> {
    return arr.map((el: string) => el.toLowerCase());
  }
}

