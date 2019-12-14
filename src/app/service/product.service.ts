import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  fetchProductDetails(): Observable<any> {
    return this.httpClient.get('https://api.myjson.com/bins/qzuzi',
    ).pipe(
      map((res) => res)
    );
  }

}
