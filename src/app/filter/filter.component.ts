import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  value = 100;
  max = 10000;
  min = 100;
  thumbLabel = true;
  @Output() sendValue = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  slideMe() {
    this.sendValue.emit(this.value);
  }
}
