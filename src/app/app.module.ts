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
import { ResultItemComponent } from './root/search/results-list/result-item/result-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CurrencyService } from './service/currency.service';
import { GenderService } from './service/gender.service';

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
    ResultItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [
    GenderService,
    CurrencyService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
