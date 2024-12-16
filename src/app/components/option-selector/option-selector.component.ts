import {Component, inject} from '@angular/core';
import { StateService } from "../../services/state.service";
import {BoxesStore} from "../../store/state.store";

@Component({
    selector: 'app-option-selector',
    imports: [],
    templateUrl: './option-selector.component.html',
    styleUrls: ['./option-selector.component.css']
})
export class OptionSelectorComponent {
  store = inject(BoxesStore);
}
