import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {

  constructor() { }
  @Output() filterRange = new EventEmitter();

  ngOnInit() {
  }

  filterBy(range) {
    this.filterRange.emit(range);
  }
}
