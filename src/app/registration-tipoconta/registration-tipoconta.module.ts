import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationTipocontaPageRoutingModule } from './registration-tipoconta-routing.module';

import { RegistrationTipocontaPage } from './registration-tipoconta.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationTipocontaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegistrationTipocontaPage]
})
export class RegistrationTipocontaPageModule {}
