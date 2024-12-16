import {Component, inject} from '@angular/core';
import {BoxComponent} from "../box/box.component";
import {HeaderComponent} from "../header/header.component";
import {OptionSelectorComponent} from "../option-selector/option-selector.component";
import {BoxesStore} from "../../store/state.store";

@Component({
  selector: 'app-layout',
    imports: [
        BoxComponent,
        HeaderComponent,
        OptionSelectorComponent
    ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  store = inject(BoxesStore);
}
