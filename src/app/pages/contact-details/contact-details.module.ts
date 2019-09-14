import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ContactDetailsPage } from './contact-details.page';
import { MaskDirective } from 'src/app/directives/mask.directive';

const routes: Routes = [
  {
    path: '',
    component: ContactDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ContactDetailsPage, MaskDirective]
})
export class ContactDetailsPageModule { }
