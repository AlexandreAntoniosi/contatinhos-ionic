import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MenuPage } from './pages/menu/menu.page';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule) },
  { path: 'reset-password', loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule) },
  {
    path: '',
    component: MenuPage,
    canActivate: [AuthGuard],
    children: [
      { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
      { path: 'contacts/:id', loadChildren: () => import('./pages/contact-details/contact-details.module').then(m => m.ContactDetailsPageModule) },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
