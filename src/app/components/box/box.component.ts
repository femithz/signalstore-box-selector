import { Component, Input, Output, EventEmitter, Signal } from '@angular/core';
import { Box } from "../../models/box.model";
@Component({
  selector: 'app-box',
  standalone: true,
  imports: [],
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent {
  @Input({ required: true }) box!: Box;
  @Input({ required: true }) isSelected!: boolean;
  @Output() boxSelected = new EventEmitter<number>();
  onBoxSelected() {
    this.boxSelected.emit(this.box.id);
  }
}
