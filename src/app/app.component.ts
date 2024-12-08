import {signal, Component, computed} from '@angular/core';
import { CommonModule} from '@angular/common';
import { BoxComponent } from "./components/box/box.component";
import { OptionSelectorComponent } from "./components/option-selector/option-selector.component";
import { StateService } from "./services/state.service";
import { Box } from "./models/box.model";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BoxComponent, OptionSelectorComponent, OptionSelectorComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  boxes = this.stateService.boxes;
  selectedBox = signal<Box | null>(null);
  frontSaltoOptions = signal(['.1', '.2', '.3', '.4', '.5', '.6', '.7', '.8', '.9', '1.0']);
  backSaltoOptions = signal(['3.4', '4.5', '5.6', '6.7', '7.8', '8.9', '9.0', '10.1', '11.2', '12.3']);
  otherOptions = signal(['( H', 'F', 'A', 'B', 'C', 'D', 'E', 'G', 'I', 'J']);

  constructor(public stateService: StateService) {
  }

  onBoxSelected(boxId: number) {
    const box = this.boxes().find(b => b.id === boxId);
    this.selectedBox.set(box || null);
  }

  isSelected(boxId: number) {
    return signal(() => this.selectedBox()?.id === boxId);
  }

  onOptionSelected(option: string) {
    if (this.selectedBox()) {
      this.stateService.updateBox(this.selectedBox()!.id, option);
      const currentIndex = this.boxes().findIndex(box => box.id === this.selectedBox()?.id);
      const nextBox = this.boxes()[currentIndex + 1];
      this.selectedBox.set(nextBox || null);
    }
  }

  clearSelections() {
    this.stateService.clearSelections();
  }
}
