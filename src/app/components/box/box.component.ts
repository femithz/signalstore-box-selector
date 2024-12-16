import {Component, inject, OnInit} from '@angular/core';
import { StateService } from "../../services/state.service";
import {BoxesStore} from "../../store/state.store";
import {Box} from "../../models/box.model";
@Component({
    selector: 'app-box',
    imports: [],
    templateUrl: './box.component.html',
    styleUrls: ['./box.component.css']
})
export class BoxComponent {
  store = inject(BoxesStore);
  constructor() {
  }
}
