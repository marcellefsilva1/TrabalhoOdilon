import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationContaPageRoutingModule } from './registration-conta-routing.module';

import { RegistrationContaPage } from './registration-conta.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationContaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegistrationContaPage]
})
export class RegistrationContaPageModule {}
