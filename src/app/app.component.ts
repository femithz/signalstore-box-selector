import {Component, inject, OnInit} from '@angular/core';
import { CommonModule} from '@angular/common';
import { BoxesStore } from "./store/state.store";
import { LayoutComponent } from "./components/layout/layout.component";

@Component({
    selector: 'app-root',
    imports: [CommonModule, LayoutComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  store = inject(BoxesStore);
  constructor() {
  }
  ngOnInit() {
    this.loadAll().then(() => {})
  }
  async  loadAll() {
    await  this.store.loadAll();
  }
}
