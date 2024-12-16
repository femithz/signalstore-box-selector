import { Injectable } from '@angular/core';
import { Box } from "../models/box.model";

@Injectable({ providedIn: 'root' })
export class StateService {
  constructor() {}
   initializeBoxes(): Box[] {
     const storedState = sessionStorage.getItem('boxesState');
     return storedState ? JSON.parse(storedState) : Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      selectedOption: null,
    }));
  }
  saveState(state: Box[]) {
    sessionStorage.setItem('boxesState', JSON.stringify(state));
  }
}



