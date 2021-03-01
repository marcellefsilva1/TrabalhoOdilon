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
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  pessoas: any = [];
  pessoa = {
    nome: null,
    email: null,
    usuario: null,
    senha: null
  };

  public formGroup: FormGroup;
  constructor(private activatedRoute: ActivatedRoute, private navController: NavController, public toastController: ToastController,
    private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      'nome': ['', Validators.compose([
        Validators.required,
      ])],
      'email': ['', Validators.compose([
        Validators.required,
      ])],
      'usuario': ['', Validators.compose([
        Validators.required,
      ])],
      'senha': ['', Validators.compose([
        Validators.required,
      ])]
    })
  }

  ngOnInit() {
    this.pessoas = JSON.parse(localStorage.getItem('usuarioBD'));
    if (!this.pessoas) {
      this.pessoas = []
      localStorage.setItem('usuarioBD', JSON.stringify(this.pessoas));
    }

    this.formGroup.get('nome').setValue(this.pessoa.nome);
    this.formGroup.get('email').setValue(this.pessoa.email);
    this.formGroup.get('usuario').setValue(this.pessoa.usuario);
    this.formGroup.get('senha').setValue(this.pessoa.senha);

  }

  async submitForm() {
    this.pessoa.nome = this.formGroup.value.nome;
    this.pessoa.email = this.formGroup.value.email;
    this.pessoa.usuario = this.formGroup.value.usuario;
    this.pessoa.senha = this.formGroup.value.senha;

    //pegando os dados do banco
    this.pessoas = JSON.parse(localStorage.getItem('usuarioBD'));

    if (!this.verificarUsuario(this.pessoa.usuario)) {
      this.pessoas.push(this.pessoa);
      localStorage.setItem('usuarioBD', JSON.stringify(this.pessoas));
      this.exibirMensagem('Usuário cadastrado!!!');
      this.navController.navigateBack('/login');
    } else {
      this.exibirMensagem('Não foi possivel cadastrar usuario.');
    }
  }

  async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500
    });
    toast.present();
  }

  verificarUsuario(usuario: string): boolean {
    for (var i = 0; i < this.pessoas.length; i++) {
      if (this.pessoas[i].usuario === usuario) {
        return true;
      }
    }
    return false;

  }
}
