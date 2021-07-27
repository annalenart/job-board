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
      // to solve a problem with receiving posted data from firebase
      const jobsArr = (Array.isArray(jobs) ? jobs : Object.values(jobs)) as Jobs;
      this.allJobs = jobsArr;
      this.jobs = jobsArr;
    });
  }

  filterJobs(filters: Array<string>) {
    this.jobs = this.allJobs.filter(job => {
      return JobsComponent.arrayToLower(filters)
        .every((val: string) => {
          const tags = [];
          job.role && tags.push(job.role);
          job.level && tags.push(job.level);
          job.languages && tags.push(...job.languages);
          job.tools && tags.push(...job.tools);
          return JobsComponent.arrayToLower(tags).includes(val);
        });
    });
  }

  private static arrayToLower(arr: Array<string>): Array<string> {
    return arr.map((el: string) => el.toLowerCase());
  }
}

