import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) { }
  @Output() searchString = new EventEmitter();
  ngOnInit() {
  }

  routeMe() {
    this.router.navigate(['']);
  }

  searchTexthere(eve){
    this.searchString.emit(eve);
  }
}
