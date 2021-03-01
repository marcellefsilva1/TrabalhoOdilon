import { Component,  OnInit} from '@angular/core';
import {  AlertController,  NavController,  ToastController} from '@ionic/angular';

@Component({
  selector: 'app-tipo-conta',
  templateUrl: './tipo-conta.page.html',
  styleUrls: ['./tipo-conta.page.scss'],
})

export class TipoContaPage implements OnInit {
  tipos: any[] = [];
  pessoa: any;
  constructor(private navController: NavController, public alertController: AlertController, public toastController: ToastController) {}

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('loginBD'))) {
      this.pessoa = JSON.parse(localStorage.getItem('loginBD'));
    } else {
      this.navController.navigateBack('/login');
    }
  }

  async ionViewWillEnter() {
    this.tipos = JSON.parse(localStorage.getItem('tipoBD'));
    if (!this.tipos) {
      this.tipos = []
      localStorage.setItem('tipoBD', JSON.stringify(this.tipos));
    }
  }

  async excluirTipoConta(nome: string) {
    let tipo: any[] = null
    tipo = this.tipos.filter((temp) => {
      return temp.nomeTipo === nome
    });
    this.confirmarExclusao(tipo[0]);
  }

  async confirmarExclusao(tipo: any) {
    const alert = await this.alertController.create({
      header: 'Confirma a exclusão?',
      message: tipo.nomeTipo,
      buttons: [{
        text: 'Cancelar'
      }, {
        text: 'Confirmar',
        cssClass: 'danger',
        handler: () => {
          this.tipos = JSON.parse(localStorage.getItem('tipoBD'));
          this.tipos = this.tipos.filter((temp) => {
            return temp.nomeTipo != tipo.nomeTipo
          });
          localStorage.setItem('tipoBD', JSON.stringify(this.tipos));
          this.navController.navigateBack('/tipo-conta');
          this.exibirMensagem();
        }
      }]
    });
    await alert.present();
  }

  async exibirMensagem() {
    const toast = await this.toastController.create({
      message: 'Registro excluído com sucesso!!!',
      duration: 1500
    });
    toast.present();
  }


}
