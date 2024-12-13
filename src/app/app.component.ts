import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { BoxComponent } from "./components/box/box.component";
import { OptionSelectorComponent } from "./components/option-selector/option-selector.component";
import { StateService } from "./services/state.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BoxComponent, OptionSelectorComponent, OptionSelectorComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public stateService: StateService) {
  }



}
