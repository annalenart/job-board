import { Component, Input } from '@angular/core';
import { Jobs } from '../../jobs-provider.service';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent {
  @Input() jobs: Jobs;
}
