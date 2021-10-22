import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-chips',
  templateUrl: './input-with-chips.component.html',
  styleUrls: ['./input-with-chips.component.scss']
})
export class InputWithChipsComponent implements AfterViewInit, OnDestroy {
  @Input() labelTitle: string;
  @Output() filtersChanged = new EventEmitter<Array<string>>();
  @Output() addFilter = new EventEmitter<string>();
  @Output() removeFilter = new EventEmitter<number>();
  @ViewChild('input') input: ElementRef;

  filters: Array<string> = [];
  keydownEventSubscription: Subscription;

  ngAfterViewInit() {
  this.keydownEventSubscription = fromEvent<KeyboardEvent>(this.input.nativeElement, 'keydown').pipe(
    filter((keyboardEvent) => keyboardEvent.code === "Space" || keyboardEvent.code === "Enter"))
    .subscribe((event) => {
      event.preventDefault();
      if (this.input.nativeElement.value.length > 0) {
        this.filters.push(this.input.nativeElement.value);
        this.filtersChanged.emit(this.filters);
        this.addFilter.emit(this.input.nativeElement.value);
        this.input.nativeElement.value = '';
      }
  })
  }

  ngOnDestroy() {
    this.keydownEventSubscription && this.keydownEventSubscription.unsubscribe();
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
