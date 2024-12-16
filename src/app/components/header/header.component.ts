import {Component, inject} from '@angular/core';
import { BoxesStore } from "../../store/state.store";

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  store = inject(BoxesStore);
}
