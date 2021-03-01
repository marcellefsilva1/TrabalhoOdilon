import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationTipocontaPage } from './registration-tipoconta.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrationTipocontaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationTipocontaPageRoutingModule {}
