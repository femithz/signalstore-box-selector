import { Component } from '@angular/core';
import { StateService } from "../../services/state.service";
@Component({
  selector: 'app-box',
  standalone: true,
  imports: [],
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent {
  constructor(public stateService: StateService) {
  }
}
