import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CsvReaderComponent } from './views/csv-reader/csv-reader.component';
import {FormsModule} from '@angular/forms';
import {CsvTableComponent} from './views/csv-table/csv-table.component';
import { NgxPopper } from 'angular-popper';

@NgModule({
  declarations: [
    AppComponent,
    CsvReaderComponent,
    CsvTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPopper
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
