import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chips',
  templateUrl: './input-with-chips.component.html',
  styleUrls: ['./input-with-chips.component.scss']
})
export class InputWithChipsComponent {
  @Input() labelTitle: string;
  @Output() filtersChanged = new EventEmitter<Array<string>>();
  @Output() addFilter = new EventEmitter<string>();
  @Output() removeFilter = new EventEmitter<number>();
  filters: Array<string> = [];

  addChips(input: HTMLInputElement): void {
    if (input.value.length > 0) {
      this.filters.push(input.value);
      this.filtersChanged.emit(this.filters);
      this.addFilter.emit(input.value);
      input.value = '';
    }
  }

  clearChips(): void {
    this.filters = [];
    this.filtersChanged.emit(this.filters);
  }

  removeChips(index: number): void {
    this.filters.splice(index, 1);
    this.filtersChanged.emit(this.filters);
    this.removeFilter.emit(index);
  }
}
