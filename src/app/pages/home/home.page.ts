import { Component, OnInit, OnChanges } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { DataService } from 'src/app/data.service';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { ContactUtil } from 'src/app/utils/contact.util';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public contacts: Contact[];
  public contact: Contact;


  constructor(
    private service: DataService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
  ) {
  }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({ message: "Carregando contatinhos..." });
    const data = ContactUtil.get();
    console.log(data);
    if (!data || data.length == 0) {
      loading.present()
      this.service.getContacts()
        .subscribe(
          (res: Contact[]) => {
            console.log('aqui');

            this.contacts = res;
            ContactUtil.set(res)
          },
          (err: any) => {
            console.log(err);
          },
          () => {
            loading.dismiss();
          }
        );
    }
    else {
      this.contacts = data;
      loading.dismiss();
    }
  }

  addContact() {
    this.navCtrl.navigateRoot('contacts/new');
  }

  editContact(item) {
    this.contact = item;
    this.navCtrl.navigateRoot(`contacts/${this.contact.id}`)
  }
}
