import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  pessoas: any = [];
  pessoa = {
    usuario: null,
    senha: null
  };
  controle = false;

  public formGroup: FormGroup;
  constructor(private activatedRoute: ActivatedRoute, private navController: NavController, public toastController: ToastController,
    private formBuilder: FormBuilder) {
     this.formGroup = this.formBuilder.group({
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
    if(!this.pessoas){
      this.pessoas = []
      localStorage.setItem('usuarioBD', JSON.stringify(this.pessoas));
    }
    localStorage.setItem('loginBD', JSON.stringify(null));
  }

    async submitForm(){
      this.pessoa.usuario = this.formGroup.value.usuario;
      this.pessoa.senha = this.formGroup.value.senha;
      this.pessoas = JSON.parse(localStorage.getItem('usuarioBD'));

      for(var i=0; i < this.pessoas.length; i++){
        if(this.pessoas[i].usuario === this.pessoa.usuario && this.pessoas[i].senha === this.pessoa.senha ){
          localStorage.setItem('loginBD', JSON.stringify(this.pessoas[i]));
          this.controle = true;
          this.navController.navigateBack('/conta');
          window.location.href = window.location.href.replace('login', 'conta');
        }
      }
      if (!this.controle){
        this.exibirMensagem("Usuário ou senha incorreto!");
      }
    }

    async exibirMensagem(mensagem: string) {
      const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500
    });
    toast.present();
    }

  }
