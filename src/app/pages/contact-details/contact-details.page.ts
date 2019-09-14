import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Contact } from 'src/app/models/contact.model';
import { ContactUtil } from 'src/app/utils/contact.util';
import { GuidUtil } from 'src/app/utils/guid.util';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.page.html',
  styleUrls: ['./contact-details.page.scss'],
})
export class ContactDetailsPage implements OnInit {
  public contact: Contact;
  public isNew = false;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: DataService,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) {
    this.form = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      email: ['', Validators.required],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required],
      endereco: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id == "new") {
      this.contact = new Contact(GuidUtil.newGuid(), '', '', '', '', '', '');
      this.isNew = true;
    }
    else {
      this.contact = ContactUtil.getContact(id);
      this.isNew = false;
    }

    this.form.patchValue(this.contact);
  }

  remove() {
    ContactUtil.remove(this.contact);
    this.navCtrl.navigateRoot('/');
  }

  create() {
    ContactUtil.add(this.form.value);
    this.navCtrl.navigateRoot('/');
  }

  edit() {
    ContactUtil.edit(this.form.value);
    this.navCtrl.navigateRoot('/');
  }
}