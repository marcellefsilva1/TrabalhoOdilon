import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  usuarioLogado(): boolean{
    let pessoa = JSON.parse(localStorage.getItem('loginBD'));
    if (pessoa){
      return true;
    }
    return false;

  }
  public appPages = [
    { title: 'Tela Inicial', url: '/conta', icon: 'heart' },
    { title: 'Cadastro de Conta', url: '/registration-conta', icon: 'heart' },
    { title: 'Cadastro de Tipo de Conta', url: '/registration-tipoconta', icon: 'heart' },
    { title: 'Lista Tipo Conta', url: '/tipo-conta', icon: 'list' },
    { title: 'Sair', url: '/inicio', icon: 'heart' },

    



  ];
  
 
  
  constructor() {}
}
