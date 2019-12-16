import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RemoveFromCart } from '../store/actions';
import { Router } from '@angular/router';

export interface Product {
  id: number;
  name: string;
  price: number;
  discount: any;
  img_url: string;
  category: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: Product[] = [];
  itemCount: any;
  countProd: number;
  uniqueProd: any;
  cartMsg = 'Cart is empty, Click here to continue shopping!';

  constructor(private store: Store<any>, private router: Router) {
    store.pipe(select('shop')).subscribe((data: any) => {(this.cart = data.cart)});
  }

  ngOnInit() {
    this.itemCount = this.cart.reduce((tally, item) => {
      tally[item.id] = (tally[item.id] || 0) + 1;
      return tally;
    }, {});

    const uniqueSet = new Set();
    this.uniqueProd = this.cart.filter(item => {
      if (!uniqueSet.has(item.id)) {
        uniqueSet.add(item.id);
        return true;
      }
      return false;
    }, uniqueSet);

    // this.uniqueProd = [
    //   { id: 9091, name: "Item2", price: 250, discount: 15, category: "literature", img_url: "http://lorempixel.com/500/600/technics/" },
    //   { id: 9092, name: "Item2", price: 250, discount: 15, category: "literature", img_url: "http://lorempixel.com/500/600/technics/" },
    //   { id: 9093, name: "Item2", price: 250, discount: 15, category: "literature", img_url: "http://lorempixel.com/500/600/technics/" }
    // ];
  }

  showDiscountPrice(price, discount) {
    const discountAmt = (price / 100) * discount;
    return parseInt(price, 10) - discountAmt;
  }

  getProdCount(id) {
    this.countProd = this.itemCount[id] || 0;
    return this.countProd;
  }

  removeItem(id) {
    this.countProd = this.itemCount[id] - 1;
    if (this.countProd <= 0) { this.countProd = 0; }
    this.itemCount[id] = this.countProd;
    return this.getProdCount(id);
  }

  addItem(id) {
    this.countProd = this.itemCount[id] + 1;
    this.itemCount[id] = this.countProd;
    return this.getProdCount(id);
  }

  removeFromCart(item: Product) {
    this.store.dispatch(new RemoveFromCart(item));
    const uniqueSet = new Set();

    this.uniqueProd = this.cart.filter(data => {
      if (!uniqueSet.has(data.id)) {
        uniqueSet.add(data.id);
        return true;
      }
      return false;
    }, uniqueSet);
   }

  routeMe() {
    this.router.navigate(['']);
  }

  getTotalAmt(price, id) {
    return price * this.getProdCount(id);
  }

  getAllDiscount(items) {
    const getDiscountAmount = [];
    items.filter((data) => {
      getDiscountAmount.push(this.getAllDiscountPrice(data.price, data.discount) * this.getProdCount(data.id));
    });
    return getDiscountAmount.reduce((total, amount) => total + amount, 0);
  }

  getAllDiscountPrice(price, discount) {
    const discountAmt = (price / 100) * discount;
    return discountAmt;
  }

  getAllTotalAmt() {
    let total = 0;
    const c = this.uniqueProd.filter((item) => {
      total += item.price * this.getProdCount(item.id);
    });
    const discuount = this.getAllDiscount(this.uniqueProd);
    return total - discuount;
  }
  checkout() {
    const uniqueSet = new Set();
    this.uniqueProd = [];
    this.cart.filter(item => {
      this.store.dispatch(new RemoveFromCart(item));
      if (!uniqueSet.has(item.id)) {
        uniqueSet.delete(item.id);
        return true;
      }
      return false;
    }, uniqueSet);
    this.cartMsg = 'Thanks for shopping!, Order placed!';
  }
}
