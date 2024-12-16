import { Box } from "../models/box.model";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { StateService } from "../services/state.service";
import { computed, inject } from "@angular/core";

type BoxesState = {
  boxes: Box[];
  selectedBox: Box | null;
  selectedOption: string | null;
  frontSaltoOptions: string[];
  backSaltoOptions: string[];
  otherOptions: string[];
  loading: boolean;
};

const initialState: BoxesState = {
  boxes: [],
  selectedBox: null,
  selectedOption: null,
  frontSaltoOptions: ['.1', '.2', '.3', '.4', '.5', '.6', '.7', '.8', '.9', '1.0'],
  backSaltoOptions: ['3.4', '4.5', '5.6', '6.7', '7.8', '8.9', '9.0', '10.1', '11.2', '12.3'],
  otherOptions: ['( H', 'F', 'A', 'B', 'C', 'D', 'E', 'G', 'I', 'J'],
  loading: false,
};

export const BoxesStore = signalStore(
  { providedIn: 'root' },
    withState(initialState),
    withMethods((store, stateService = inject(StateService)) => ({

    async loadAll() {
      patchState(store, { loading: true });
      try {
        const boxes = await stateService.initializeBoxes();
        patchState(store, { boxes, loading: false });
      } catch (error) {
        patchState(store, { loading: false });
      }
    },

    selectBox(boxId: number) {
      const selectedBox = store.boxes().find((box: any) => box.id === boxId) || null;
      patchState(store, { selectedBox });
    },

    updateBox(id: number, selectedOption: string) {
      const updatedBoxes = store.boxes().map((box) =>
        box.id === id ? { ...box, selectedOption } : box
      );
      patchState(store, { boxes: updatedBoxes });
      stateService.saveState(updatedBoxes);
    },

    clearSelections() {
      const clearedBoxes = store.boxes().map((box) => ({
        ...box,
        selectedOption: null,
      }));
      patchState(store, { boxes: clearedBoxes });
      stateService.saveState(clearedBoxes);
    },

    onOptionSelected(option: string) {
      const selectedBox = store.selectedBox();
      if (selectedBox) {
        this.updateBox(selectedBox.id, option);
        const currentIndex = store.boxes().findIndex(
          (box) => box.id === selectedBox.id
        );
        const isLastBox = currentIndex === store.boxes().length - 1;
        if (!isLastBox) {
          const nextBox = store.boxes()[currentIndex + 1];
          patchState(store, { selectedBox: nextBox });
        } else {
          patchState(store, { selectedBox });
        }
      }
    },

    selectedOption: computed(() =>
      store.selectedBox() ? store.selectedBox()!.selectedOption : null
    ),

    totalValue: computed(() => {
      const total = store.boxes().reduce((sum, box) => {
        const optionValue = parseFloat(box.selectedOption || '0');
        return sum + (isNaN(optionValue) ? 0 : optionValue);
      }, 0);
      return Math.round(total * 100) / 100;
    }),

  }))
);





