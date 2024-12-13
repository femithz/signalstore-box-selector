import { Component } from '@angular/core';
import { StateService } from "../../services/state.service";

@Component({
  selector: 'app-option-selector',
  standalone: true,
  imports: [],
  templateUrl: './option-selector.component.html',
  styleUrls: ['./option-selector.component.css']
})
export class OptionSelectorComponent {
  constructor(public stateService: StateService) {}
}
