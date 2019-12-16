import { Component, OnInit, Input } from '@angular/core';
import { ShopEffects } from '../store/effects';
import { ProductService } from './../service/product.service';
import { Store, select } from '@ngrx/store';
import { AddToCart, RemoveFromCart } from '../store/actions';
import { GetItems } from '../store/actions';

export interface Product {
  id: number;
  name: string;
  price: number;
  discount: string;
  img_url: string;
  category: string;
}

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  value = 0;
  max = 10000;
  min = 100;
  thumbLabel = true;
  productDetails: any;
  inCart = false;
  backupProduct: any;

  constructor(private productService: ProductService, private store: Store<{ items: []; cart: [] }>) {
    store.pipe(select('shop')).subscribe((data: any) => {
      this.productDetails = data.items;
      this.backupProduct = data.items;
    });
  }

  ngOnInit() {
    // fetch product details
    this.store.dispatch(new GetItems());
  }

  showDiscountPrice(price, discount) {
    const discountAmt = (price / 100) * discount;
    return parseInt(price, 10) - discountAmt;
  }

  filterBy(price) {
    if (price === 'high') {
      this.productDetails = this.productDetails.sort((a, b) => {
        return b['price'] - a['price'];
      });
    } else if (price === 'low') {
      this.productDetails = this.productDetails.sort((a, b) => {
        return a['price'] - b['price'];
      });
    } else if (price === 'discount') {
      this.productDetails = this.productDetails.sort((a, b) => {
        return a['discount'] - b['discount'];
      });
    } else {
      this.productDetails = this.productDetails;
    }
  }

  slideMe(price) {
    this.productDetails = this.backupProduct;
    return this.productDetails = this.productDetails.filter((item) => item.price >= price);
  }

  addToCart(item: Product) {
    this.store.dispatch(new AddToCart(item));
    this.inCart = true;
  }

  removeFromCart(item: Product) {
    this.store.dispatch(new RemoveFromCart(item));
    this.inCart = false;
  }

  displayfilterRange(eve) {
    // console.log(eve)
  }

  searchFilter(eve) {
    this.productDetails = this.backupProduct;
    return this.productDetails = this.productDetails.filter((item) => {
      return (item.name.toLowerCase().indexOf(eve.toLowerCase()) !== -1);
    });
  }
}
