import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController, ToastController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/data.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private service: DataService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  async submit() {
    const loading = await this.loadingCtrl.create({ message: "Cadastrando..." });
    loading.present()

    this.service
      .createCustomer(this.form.value)
      .subscribe(
        (res: User) => {
          loading.dismiss();
          this.showSuccess(res);
        },
        (err: any) => {
          loading.dismiss();
          this.showError("Falha ao cadastrar.");
        }
      )
  }

  async showSuccess(data) {
    const alert = await this.alertCtrl.create({
      message: "Bem vindo!",
      buttons: [
        {
          text: "Continuar",
          handler: () => {
            this.navCtrl.navigateRoot('/login');
          }
        }
      ]
    });
    alert.present();
  }

  async showError(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      showCloseButton: true,
      closeButtonText: "Fechar"
    });
    toast.present();
  }

}
