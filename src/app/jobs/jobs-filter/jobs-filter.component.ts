import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-jobs-filter',
  templateUrl: './jobs-filter.component.html',
  styleUrls: ['./jobs-filter.component.scss']
})
export class JobsFilterComponent {
  @Output() filtersChanged = new EventEmitter<Array<string>>();
  filters: Array<string> = [];

  addChips(input: HTMLInputElement): void {
    if (input.value.length > 0) {
      this.filters.push(input.value);
      input.value = '';
      this.filtersChanged.emit(this.filters);
    }
  }

  clearChips(): void {
    this.filters = [];
    this.filtersChanged.emit(this.filters);
  }

  removeChips(index: number): void {
    this.filters.splice(index, 1);
    this.filtersChanged.emit(this.filters);
  }
}
