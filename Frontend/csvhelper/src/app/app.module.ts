import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CsvReaderComponent } from './views/csv-reader/csv-reader.component';
import {FormsModule} from '@angular/forms';
import {CsvTableComponent} from './views/csv-table/csv-table.component';
import { NgxPopper } from 'angular-popper';
import { CsvOverviewComponent } from './views/csv-overview/csv-overview.component';
import {NgxLoadingModule} from 'ngx-loading';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule, MatMenuModule
} from '@angular/material';
import { TableEditPopupComponent } from './views/csv-table/table-edit-popup/table-edit-popup.component';
import {Globals} from './globals';

@NgModule({
  declarations: [
    AppComponent,
    CsvReaderComponent,
    CsvTableComponent,
    CsvOverviewComponent,
    TableEditPopupComponent
  ],
  entryComponents: [
    TableEditPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPopper,
    NgxLoadingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatGridListModule,
    MatMenuModule
  ],
  providers: [
    Globals
    /*{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
