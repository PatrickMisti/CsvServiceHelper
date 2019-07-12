import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CsvReaderComponent} from './views/csv-reader/csv-reader.component';

const routes: Routes = [
  {path: '', component: CsvReaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
