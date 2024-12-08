import { Component, Input, Output, EventEmitter, Signal } from '@angular/core';
import {NgFor, NgForOf} from '@angular/common';

@Component({
  selector: 'app-option-selector',
  standalone: true,
  imports: [NgFor, NgForOf],
  templateUrl: './option-selector.component.html',
  styleUrls: ['./option-selector.component.css']
})
export class OptionSelectorComponent {
  @Input() frontSaltoOptions: string[] = [];
  @Input() backSaltoOptions: string[] = [];
  @Input() otherOptions: string[] = [];
  @Input() selectedOption: string | null = null;
  @Output() optionSelected = new EventEmitter<string>();

  selectOption(option: string) {
    this.optionSelected.emit(option);
  }
}
