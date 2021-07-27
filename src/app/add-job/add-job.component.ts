import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { JobsProviderService } from '../jobs-provider.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {
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

  addLanguage(languagesInput: HTMLInputElement): void {
    this.languages.push(new FormControl(languagesInput.value));
    languagesInput.value = '';
  }

  addTool(toolsInput: HTMLInputElement): void {
    this.tools.push(new FormControl(toolsInput.value));
    toolsInput.value = '';
  }

  removeLanguage(index: number): void {
    this.languages.removeAt(index);
  }

  removeTool(index: number): void {
    this.tools.removeAt(index);
  }

  onSubmit() {
    const newJob = {
      ...this.jobForm.value,
      new: true,
      postedAt: new Date(Date.now()).toLocaleDateString()
    };
    this.jobsProvider.addJob(newJob).subscribe();
    this.jobForm.reset();
    this.languages = new FormArray ([]);
    this.tools = new FormArray ([]);
  }
}
