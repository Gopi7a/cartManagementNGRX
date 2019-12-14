import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ActionTypes } from './actions';
import { ProductService } from './../service/product.service';

@Injectable()
export class ShopEffects {
    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) { }

    @Effect()
    loadCart$ = this.actions$.pipe(
        ofType(ActionTypes.LoadItems),
        mergeMap(() =>
            this.productService.fetchProductDetails().pipe(
                map(cart => {
                    return { type: ActionTypes.LoadSuccess, payload: cart };
                }),
                catchError(() => EMPTY)
            )
        )
    );
}