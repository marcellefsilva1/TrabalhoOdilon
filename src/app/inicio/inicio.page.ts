import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  pessoas: any = [];
  constructor(private navController: NavController) { }

  ngOnInit() {
    this.pessoas = JSON.parse(localStorage.getItem('usuarioBD'));
    if(!this.pessoas){
      this.pessoas = []
      localStorage.setItem('usuarioBD', JSON.stringify(this.pessoas));
    }
    localStorage.setItem('loginBD', JSON.stringify(null));
  }

  

}
