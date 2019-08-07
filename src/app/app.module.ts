import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RootComponent } from './root/root.component';
import { SearchComponent } from './root/search/search.component';
import { SandboxComponent } from './root/sandbox/sandbox.component';
import { SearchFieldComponent } from './root/search/search-field/search-field.component';
import { ResultsListComponent } from './root/search/results-list/results-list.component';
import { LookItemComponent } from './root/sandbox/look-item/look-item.component';
import { UtilsComponent } from './root/sandbox/utils/utils.component';
import { CostsSumComponent } from './root/sandbox/costs-sum/costs-sum.component';
import { CalendarComponent } from './root/search/search-field/calendar/calendar.component';
import { GenderComponent } from './root/search/search-field/gender/gender.component';
import { CurrencyComponent } from './root/search/search-field/currency/currency.component';
import { ClothesItemComponent } from './root/search/results-list/result-item/result-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { GenderService } from './service/gender.service';

import {MatButtonModule, MatCardModule, MatGridListModule, MatTooltipModule} from '@angular/material';
import { CurrencyService } from './service/currency.service';
import { MatFormFieldModule, MatDatepickerModule, MatInputModule, MatNativeDateModule} from '@angular/material';

import { SatNativeDateModule, SatDatepickerModule } from 'saturn-datepicker';
import { ClothesItemService } from './service/clothesItem.service';
import { ResizableModule } from "angular-resizable-element";
import { ResizeService } from "./service/resize.service";

import { AngularSplitModule } from 'angular-split';
import { DragDropModule  } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    SearchComponent,
    SandboxComponent,
    SearchFieldComponent,
    ResultsListComponent,
    LookItemComponent,
    UtilsComponent,
    CostsSumComponent,
    CalendarComponent,
    GenderComponent,
    CurrencyComponent,
    ClothesItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatNativeDateModule,
    MatInputModule,
    SatDatepickerModule,
    SatNativeDateModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatGridListModule,
    ResizableModule,
    AngularSplitModule,
    DragDropModule,
    MatTooltipModule
  ],
  exports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    SatNativeDateModule,
    SatDatepickerModule,
  ],
  providers: [
    GenderService,
    CurrencyService,
    ClothesItemService,
    ResizeService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
