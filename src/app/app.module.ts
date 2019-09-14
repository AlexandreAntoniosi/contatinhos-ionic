import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuPage } from './pages/menu/menu.page';
import { UserCardComponent } from './components/user-card/user-card.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [AppComponent, MenuPage, UserCardComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    AuthGuard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
