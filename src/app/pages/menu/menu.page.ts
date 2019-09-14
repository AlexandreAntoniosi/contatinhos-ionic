import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserUtil } from 'src/app/utils/user.util';
import { ContactUtil } from 'src/app/utils/contact.util';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  logout() {
    UserUtil.clear();
    ContactUtil.clear();
    this.navCtrl.navigateRoot('/login');
  }

}
