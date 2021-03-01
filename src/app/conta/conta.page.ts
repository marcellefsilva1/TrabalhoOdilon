import {
  Component,
  OnInit
} from '@angular/core';
import { AlertController, NavController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.page.html',
  styleUrls: ['./conta.page.scss'],
})
export class ContaPage implements OnInit {
  contas: any = [];
  contasUsuario: any = [];
  pessoa: any;


  constructor(private navController: NavController, public alertController: AlertController, public toastController: ToastController) {}

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('loginBD'))) {
      this.pessoa = JSON.parse(localStorage.getItem('loginBD'));
    } else {
      this.navController.navigateBack('/login');
    }

    this.contas = JSON.parse(localStorage.getItem('contaBD'));

    if(!this.contas){
      this.contas = []
      localStorage.setItem('contaBD', JSON.stringify(this.contas));
    }

    for (var i = 0; i < this.contas.length; i++) {
      if (this.contas[i].nomeUsuario === this.pessoa.usuario) {
        this.contasUsuario.push(this.contas[i]);
      }
    }

    console.log(this.contasUsuario);
  }


  excluirConta(id: string) {
    let conta: any[] = null
    conta = this.contas.filter((temp) => {
      return temp.id === id
    });
    this.confirmarExclusao(conta[0]);

  }

  async confirmarExclusao(conta: any) {
    const alert = await this.alertController.create({
      header: 'Confirma a exclusão?',
      message: conta.id,
      buttons: [{
        text: 'Cancelar'
      }, {
        text: 'Confirmar',
        cssClass: 'danger',
        handler: () => {
          this.contas = JSON.parse(localStorage.getItem('contaBD'));
          this.contas = this.contas.filter((temp) => {
            return temp.id != conta.id
          });
          localStorage.setItem('contaBD', JSON.stringify(this.contas));
          this.navController.navigateBack('/conta');
          window.location.href = window.location.href.replace('conta', 'conta');

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
