import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute
} from '@angular/router';
import {
  NavController,
  ToastController
} from '@ionic/angular';

@Component({
  selector: 'app-registration-tipoconta',
  templateUrl: './registration-tipoconta.page.html',
  styleUrls: ['./registration-tipoconta.page.scss'],
})
export class RegistrationTipocontaPage implements OnInit {
  pessoa: any;
  tipos: any = [];
  tipo = {
    nomeTipo: null
  };

  public formGroup: FormGroup;
  constructor(private activatedRoute: ActivatedRoute, private navController: NavController, public toastController: ToastController,
    private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      'nomeTipo': ['', Validators.compose([
        Validators.required,
      ])]
    })

  }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('loginBD'))) {
      this.pessoa = JSON.parse(localStorage.getItem('loginBD'));
    } else {
      this.navController.navigateBack('/login');
    }

    this.tipos = JSON.parse(localStorage.getItem('tipoBD'));
    if (!this.tipos) {
      this.tipos = []
      localStorage.setItem('tipoBD', JSON.stringify(this.tipos));
    }

    this.formGroup.get('nomeTipo').setValue(this.tipo.nomeTipo);

    this.tipo.nomeTipo = this.activatedRoute.snapshot.paramMap.get('nomeTipo');
    if (this.tipo.nomeTipo){
      this.tipo = this.tipos[this.tipo.nomeTipo];
    }else{
      this.tipo.nomeTipo = this.tipos.length;
    }
  }

  async submitForm() {
    this.tipo.nomeTipo = this.formGroup.value.nomeTipo;

    this.tipos = JSON.parse(localStorage.getItem('tipoBD'));
    

    if (!this.verificarTipoConta(this.tipo.nomeTipo)) {
      this.tipos.push(this.tipo);
      localStorage.setItem('tipoBD', JSON.stringify(this.tipos));
      this.exibirMensagem('Tipo de Conta cadastrado com sucesso!!!');
      this.navController.navigateBack('/tipo-conta');
      //window.location.href = window.location.href.replace('registration-tipoconta', 'tipo-conta');
    } else {
      //this.exibirMensagem('Não foi possível criar a conta!!!');
      if(this.tipo.nomeTipo){
        for(let i = 0; i < this.tipos.length; i++){
          if(this.tipos[i].nomeTipo === this.tipo.nomeTipo){
            this.tipos[i] = this.tipo;
          }
        }
      }
    }

  
  }

  async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500
    });
    toast.present();
  }

  verificarTipoConta(nome: string): boolean {
    for (var i = 0; i < this.tipos.length; i++) {
      if (this.tipos[i].nomeTipo === nome) {
        return true;
      }
    }
    return false;

  }
}
