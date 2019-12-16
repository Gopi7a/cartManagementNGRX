import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';

export interface Product {
  id: number;
  name: string;
  price: number;
  discount: string;
  img_url: string;
  category: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  cart: Product[] = [];
  @Output() searchValue = new EventEmitter();

  constructor(private store: Store<{ items: []; cart: [] }>, private router: Router) {
    store.pipe(select('shop')).subscribe((data: any) => (this.cart = data.cart));
  }

  ngOnInit() {
  }

  routeMe(page) {
    this.router.navigate([page]);
  }

  searchText(txt) {
    this.searchValue.emit(txt);
  }
}
