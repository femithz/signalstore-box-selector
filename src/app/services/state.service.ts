// import { Injectable, signal, computed } from '@angular/core';
// import { Box } from "../models/box.model";
//
// @Injectable({ providedIn: 'root' })
// export class StateService {
//   private boxesSignal = signal<Box[]>(this.initializeBoxes());
//   private selectedBoxSignal = signal<Box | null>(null);
//  private selectedOptionSignal = signal<Box | null>(null);
//   frontSaltoOptions = signal(['.1', '.2', '.3', '.4', '.5', '.6', '.7', '.8', '.9', '1.0']);
//   backSaltoOptions = signal(['3.4', '4.5', '5.6', '6.7', '7.8', '8.9', '9.0', '10.1', '11.2', '12.3']);
//   otherOptions = signal(['( H', 'F', 'A', 'B', 'C', 'D', 'E', 'G', 'I', 'J']);
//
//   constructor() {
//     this.boxesSignal.set(this.loadState());
//   }
//
//   private initializeBoxes(): Box[] {
//     return Array.from({ length: 10 }, (_, i) => ({
//       id: i + 1,
//       selectedOption: null,
//     }));
//   }
//   boxes = computed(() => this.boxesSignal());
//   selectedBox = computed(() => this.selectedBoxSignal());
//   selectedOption = computed(() => this.selectedOptionSignal());
//   totalValue = computed(() => {
//     const total = this.boxes().reduce((total, box) => {
//       const optionValue = parseFloat(box.selectedOption || '0');
//       const validValue = isNaN(optionValue) ? 0 : optionValue;
//       return total + validValue;
//     }, 0);
//     return (Math.round(total * 100) / 100).toFixed(2);
//   });
//
//   selectBox(boxId: number) {
//     const box = this.boxes().find(b => b.id === boxId) || null;
//     this.selectedBoxSignal.set(box);
//     if (box && box.selectedOption) {
//       this.selectedOptionSignal.set(box);
//     } else {
//       this.selectedOptionSignal.set(null);
//     }
//   }
//
//   updateBox(id: number, selectedOption: string) {
//     const updatedBoxes = this.boxesSignal().map((box) =>
//       box.id === id ? { ...box, selectedOption } : box
//     );
//     this.boxesSignal.set(updatedBoxes);
//     this.saveState(updatedBoxes);
//   }
//
//   onOptionSelected(option: string) {
//     if (this.selectedBox()) {
//       this.updateBox(this.selectedBox()!.id, option);
//       const currentIndex = this.boxes().findIndex(box => box.id === this.selectedBox()?.id);
//       const nextBox = this.boxes()[currentIndex + 1] || this.selectedBox();
//       this.selectedBoxSignal.set(nextBox || null);;
//     }
//   }
//
//   clearSelections() {
//     const clearedBoxes = this.boxesSignal().map((box) => ({
//       ...box,
//       selectedOption: null,
//     }));
//     this.boxesSignal.set(clearedBoxes);
//     this.saveState(clearedBoxes);
//   }
//
//   private saveState(state: Box[]) {
//     sessionStorage.setItem('boxesState', JSON.stringify(state));
//   }
//
//   private loadState(): Box[] {
//     const storedState = sessionStorage.getItem('boxesState');
//     return storedState ? JSON.parse(storedState) : this.initializeBoxes();
//   }
// }


import { Injectable } from '@angular/core';
import { SignalStore } from '@ngrx/signal-store';
import { Box } from '../models/box.model';

interface State {
  boxes: Box[];
  selectedBox: Box | null;
  frontSaltoOptions: string[];
  backSaltoOptions: string[];
  otherOptions: string[];
}

@Injectable({ providedIn: 'root' })
export class StateService extends SignalStore<State> {
  constructor() {
    super({
      initialState: {
        boxes: StateService.initializeBoxes(),
        selectedBox: null,
        frontSaltoOptions: ['.1', '.2', '.3', '.4', '.5', '.6', '.7', '.8', '.9', '1.0'],
        backSaltoOptions: ['3.4', '4.5', '5.6', '6.7', '7.8', '8.9', '9.0', '10.1', '11.2', '12.3'],
        otherOptions: ['( H', 'F', 'A', 'B', 'C', 'D', 'E', 'G', 'I', 'J'],
      },
    });
  }

  private static initializeBoxes(): Box[] {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      selectedOption: null,
    }));
  }

  readonly boxes = this.select(state => state.boxes);
  readonly selectedBox = this.select(state => state.selectedBox);
  readonly totalValue = this.select(state =>
    state.boxes.reduce((total, box) => {
      const optionValue = parseFloat(box.selectedOption || '0');
      return total + (isNaN(optionValue) ? 0 : optionValue);
    }, 0).toFixed(2)
  );

  selectBox(boxId: number) {
    const selected = this.state.boxes.find(b => b.id === boxId) || null;
    this.updateState({ selectedBox: selected });
  }

  updateBox(id: number, selectedOption: string) {
    const updatedBoxes = this.state.boxes.map(box =>
      box.id === id ? { ...box, selectedOption } : box
    );
    this.updateState({ boxes: updatedBoxes });
    this.saveState(updatedBoxes);
  }

  onOptionSelected(option: string) {
    const selectedBox = this.state.selectedBox;
    if (selectedBox) {
      this.updateBox(selectedBox.id, option);
      const currentIndex = this.state.boxes.findIndex(b => b.id === selectedBox.id);
      const nextBox = this.state.boxes[currentIndex + 1] || null;
      this.updateState({ selectedBox: nextBox });
    }
  }

  clearSelections() {
    const clearedBoxes = this.state.boxes.map(box => ({ ...box, selectedOption: null }));
    this.updateState({ boxes: clearedBoxes });
    this.saveState(clearedBoxes);
  }

  private saveState(state: Box[]) {
    sessionStorage.setItem('boxesState', JSON.stringify(state));
  }

  private loadState(): Box[] {
    const storedState = sessionStorage.getItem('boxesState');
    return storedState ? JSON.parse(storedState) : StateService.initializeBoxes();
  }
}

