import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { InputWithChipsComponent } from '../../input-with-chips/input-with-chips.component';

@Component({
  selector: 'app-jobs-filter',
  templateUrl: './jobs-filter.component.html',
  styleUrls: ['./jobs-filter.component.scss']
})
export class JobsFilterComponent {
  @Output() filtersChanged = new EventEmitter<Array<string>>();
  @ViewChild('appChips') appChips: InputWithChipsComponent;

  clearChips(): void {
    this.appChips.clearChips();
  }

  onFiltersChanged(filters: Array<string>) {
    this.filtersChanged.emit(filters);
  }
}
