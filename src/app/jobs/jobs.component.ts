import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Job, Jobs, JobsProviderService } from '../jobs-provider.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  jobs$: Observable<Jobs>;

  filters$ = new Subject<Array<string>>();

  constructor(private jobsProvider: JobsProviderService) {
  }

  ngOnInit(): void {
    this.jobs$ = combineLatest([
      this.jobsProvider.getJobs(),
      this.filters$.pipe(startWith([]))
    ])
      .pipe(
        map(([jobs, filters]: [Jobs, Array<string>]) => jobs.filter((job: Job) => JobsComponent.arrayToLower(filters)
          .every((val: string) => {
            const tags = [];
            job.role && tags.push(job.role);
            job.level && tags.push(job.level);
            job.languages && tags.push(...job.languages);
            job.tools && tags.push(...job.tools);
            return JobsComponent.arrayToLower(tags).includes(val);
          })))
      );
  }

  filterJobs(filters: Array<string>) {
    this.filters$.next(filters);
  }

  static arrayToLower(arr: Array<string>): Array<string> {
    return arr.map((el: string) => el.toLowerCase());
  }
}

