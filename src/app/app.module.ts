import { CartComponent } from './cart/cart.component';
import { SearchComponent } from './search/search.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { HeaderComponent } from './header/header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

import { StoreModule } from '@ngrx/store';
import { ShopReducer } from './store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { ShopEffects } from './store/effects';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { FormsModule } from '@angular/forms';
import { SortComponent } from './sort/sort.component';
import { FilterComponent } from './filter/filter.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      ShoppingListComponent,
      SearchComponent,
      CartComponent,
      SortComponent,
      FilterComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      BrowserAnimationsModule,
      MatFormFieldModule,
      MatInputModule,
      MatSliderModule,
      MatButtonModule,
      MatTabsModule,
      StoreModule.forRoot({ shop: ShopReducer }),
      EffectsModule.forRoot([ShopEffects]),
      FormsModule,
      MatIconModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
