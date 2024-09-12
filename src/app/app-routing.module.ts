import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LabsComponent } from './pages/labs/labs.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component:HomeComponent
  },
  {
    path: 'labs',
    component:LabsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
