import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'registration-tipoconta',
    loadChildren: () => import('./registration-tipoconta/registration-tipoconta.module').then( m => m.RegistrationTipocontaPageModule)
  },
  {
    path: 'tipo-conta',
    loadChildren: () => import('./tipo-conta/tipo-conta.module').then( m => m.TipoContaPageModule)
  },
  {
    path: 'registration-conta',
    loadChildren: () => import('./registration-conta/registration-conta.module').then( m => m.RegistrationContaPageModule)
  },
  {
  path: 'registration-conta/:id',
    loadChildren: () => import('./registration-conta/registration-conta.module').then( m => m.RegistrationContaPageModule)
  },
  {
    path: 'registration-tipoconta/:tipo.nomeTipo',
    loadChildren: () => import('./registration-tipoconta/registration-tipoconta.module').then(m => m.RegistrationTipocontaPageModule)
  },
  {
    path: 'conta',
    loadChildren: () => import('./conta/conta.module').then( m => m.ContaPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
