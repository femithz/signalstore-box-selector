import { Injectable, signal, computed } from '@angular/core';
import { Box } from "../models/box.model";


@Injectable({ providedIn: 'root' })
export class StateService {
  private boxesSignal = signal<Box[]>(this.initializeBoxes());

  constructor() {
    this.boxesSignal.set(this.loadState());
  }

  private initializeBoxes(): Box[] {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      selectedOption: null,
    }));
  }

  readonly boxes = computed(() => this.boxesSignal());

  readonly totalValue = computed(() => {
    return this.boxes().reduce((total, box) => {
      const optionValue = parseFloat(box.selectedOption || '0');
      return total + (isNaN(optionValue) ? 0 : optionValue);
    }, 0);
  });

  updateBox(id: number, selectedOption: string) {
    const updatedBoxes = this.boxesSignal().map((box) =>
      box.id === id ? { ...box, selectedOption } : box
    );
    this.boxesSignal.set(updatedBoxes);
    this.saveState(updatedBoxes);
  }


  clearSelections() {
    const clearedBoxes = this.boxesSignal().map((box) => ({
      ...box,
      selectedOption: null,
    }));
    this.boxesSignal.set(clearedBoxes);
    this.saveState(clearedBoxes);
  }

  private saveState(state: Box[]) {
    sessionStorage.setItem('boxesState', JSON.stringify(state));
  }

  private loadState(): Box[] {
    const storedState = sessionStorage.getItem('boxesState');
    return storedState ? JSON.parse(storedState) : this.initializeBoxes();
  }


}
