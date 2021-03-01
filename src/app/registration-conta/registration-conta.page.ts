import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { NavController, ToastController} from '@ionic/angular';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-registration-conta',
  templateUrl: './registration-conta.page.html',
  styleUrls: ['./registration-conta.page.scss'],
})
export class RegistrationContaPage implements OnInit {
  contas: any = [];
  tipoConta: any = [];
  pessoa = {
    nome: null,
    email: null,
    usuario: null,
    senha: null
  }

  conta = {
    id: null,
    descricao: null,
    tipoConta: null,
    valor: null,
    dataVencimento: null,
    situacao: null,
    nomeUsuario: null
  };

  public formGroup: FormGroup;
  constructor(private activatedRoute: ActivatedRoute, private navController: NavController, public toastController: ToastController,
    private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      'descricao': ['', Validators.compose([
        Validators.required,
      ])],
      'tipoConta': ['', Validators.compose([
        Validators.required,
      ])],
      'valor': ['', Validators.compose([
        Validators.required,
      ])],
      'dataVencimento': ['', Validators.compose([
        Validators.required,
      ])],
      'situacao': ['', Validators.compose([
        Validators.required,
      ])]
    })
  }

  ngOnInit() {

    if (JSON.parse(localStorage.getItem('loginBD'))){
     this.pessoa = JSON.parse(localStorage.getItem('loginBD'));
    }else{
    this.navController.navigateBack('/login');
    }

    this.tipoConta = JSON.parse(localStorage.getItem('tipoBD'));
    console.log(this.tipoConta);

    this.contas = JSON.parse(localStorage.getItem('contaBD'));
    if (!this.contas) {
      this.contas = []
      localStorage.setItem('contaBD', JSON.stringify(this.contas));
    }

    this.activatedRoute.params.subscribe( param => {
      if(param['id']){
        for(var i = 0; i < this.contas.length; i++){
          if(this.contas[i].id == param['id']){
            this.conta = this.contas[i];
            this.formGroup.value.descricao = this.conta.descricao;
          }
        }
      }
    });

    console.log(this.conta.id);

    this.formGroup.get('descricao').setValue(this.conta.descricao);
    this.formGroup.get('tipoConta').setValue(this.conta.tipoConta);
    this.formGroup.get('dataVencimento').setValue(this.conta.dataVencimento);
    this.formGroup.get('valor').setValue(this.conta.valor);
    this.formGroup.get('situacao').setValue(this.conta.situacao);

    
  }

  async submitForm() {
    this.conta.descricao = this.formGroup.value.descricao;
    this.conta.tipoConta = this.formGroup.value.tipoConta;
    this.conta.dataVencimento = this.formGroup.value.dataVencimento;
    this.conta.valor = this.formGroup.value.valor;
    this.conta.situacao = this.formGroup.value.situacao;
    this.conta.nomeUsuario = this.pessoa.nome;
    

    this.contas = JSON.parse(localStorage.getItem('contaBD'));
    if(this.conta.id){
      for(let i = 0; i < this.contas.length; i++){
        if(this.contas[i].id === this.conta.id){
          this.contas[i] = this.conta;
        }
      }
    }else{
      this.conta.id = uuid();
      this.contas.push(this.conta);
    }
      
    localStorage.setItem('contaBD', JSON.stringify(this.contas));
    this.exibirMensagem('Conta cadastrada com sucesso!!!');
    this.navController.navigateBack('/conta');
    //window.location.href = window.location.href.replace('registration-conta', 'conta');
  }

  async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500
    });
    toast.present();
  }


}
