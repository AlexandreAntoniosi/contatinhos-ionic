import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/data.service';
import { UserUtil } from 'src/app/utils/user.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private service: DataService,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    const user = UserUtil.get();
    if (user)
      this.navCtrl.navigateRoot('/');
  }

  async submit() {
    const loading = await this.loadingCtrl.create({ message: "Autenticando..." });
    loading.present()

    this.service
      .auth(this.form.value)
      .subscribe(
        (res: any) => {
          loading.dismiss();
          this.showSuccess(res);
        },
        (err: any) => {
          loading.dismiss();
          this.showError("Falha ao autenticar.");
        }
      )
  }

  async showSuccess(data) {
    UserUtil.set(data.data);
    this.navCtrl.navigateRoot('/');
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
