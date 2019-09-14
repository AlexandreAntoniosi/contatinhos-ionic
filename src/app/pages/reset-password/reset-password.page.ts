import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController, ToastController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
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
      email: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  async submit() {
    const loading = await this.loadingCtrl.create({ message: "Enviando e-mail..." });
    loading.present()

    this.service
      .reset(this.form.value)
      .subscribe(
        (res: any) => {
          loading.dismiss();
          if (res.success)
            this.showSuccess(res);
          else
            this.showError("Falha ao enviar e-mail.");
        },
        (err: any) => {
          loading.dismiss();
          this.showError("Falha ao enviar e-mail.");
        }
      )
  }

  async showSuccess(data) {
    const alert = await this.alertCtrl.create({
      message: "E-mail para reset de senha enviado.",
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
