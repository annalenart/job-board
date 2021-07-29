import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { JobsProviderService } from '../jobs-provider.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {
  @Output() filtersChanged = new EventEmitter<Array<string>>();
  jobForm: FormGroup;
  languages = new FormArray([]);
  tools = new FormArray([]);

  constructor(private jobsProvider: JobsProviderService) {
  }

  ngOnInit(): void {
    this.jobForm = new FormGroup({
      company: new FormControl(null, Validators.required),
      position: new FormControl(null, Validators.required),
      contract: new FormControl(null),
      location: new FormControl(null),
      role: new FormControl(null),
      level: new FormControl(null),
      featured: new FormControl(null),
      languages: this.languages,
      tools: this.tools
    });
  }

  onFiltersChanged(filters: Array<string>) {
    this.filtersChanged.emit(filters);
  }

  onSubmit() {
    const newJob = {
      ...this.jobForm.value,
      new: true,
      postedAt: new Date(Date.now()).toLocaleDateString()
    };
    this.jobsProvider.addJob(newJob).subscribe();
    this.jobForm.reset();
    this.languages = new FormArray([]);
    this.tools = new FormArray([]);
  }

  onAddTool(tool: string) {
    this.tools.push(new FormControl(tool));
  }

  onRemoveTool(index: number) {
    this.tools.removeAt(index);

  }

  onAddLanguage(language: string) {
    this.languages.push(new FormControl(language));
  }

  onRemoveLanguage(index: number) {
    this.languages.removeAt(index);
  }
}
