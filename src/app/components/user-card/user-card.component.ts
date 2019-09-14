import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserUtil } from 'src/app/utils/user.util';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  public user: User;

  constructor() { }

  ngOnInit() {
    this.user = UserUtil.get();
  }

}
