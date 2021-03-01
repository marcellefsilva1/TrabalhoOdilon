import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationContaPage } from './registration-conta.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrationContaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationContaPageRoutingModule {}
