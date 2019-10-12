import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataStreamManagerComponent } from './data-stream-manager/data-stream-manager.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'manage-data',
    pathMatch: 'full'
  },
  {
    path: 'manage-data',
    component: DataStreamManagerComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
