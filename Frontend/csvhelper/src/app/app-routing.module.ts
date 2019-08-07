import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CsvOverviewComponent} from './views/csv-overview/csv-overview.component';

const routes: Routes = [
  {path: '', component: CsvOverviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
