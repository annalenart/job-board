import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobsFilterComponent } from './jobs/jobs-filter/jobs-filter.component';
import { JobsListComponent } from './jobs/jobs-list/jobs-list.component';
import { JobCardComponent } from './jobs/jobs-list/job-card/job-card.component';
import { AddJobComponent } from './add-job/add-job.component';

@NgModule({
  declarations: [
    AppComponent,
    JobsComponent,
    JobsFilterComponent,
    JobsListComponent,
    JobCardComponent,
    AddJobComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
