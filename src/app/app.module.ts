import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavbarComponent } from './core/top-navbar/top-navbar.component';
import { MenuListItemComponent } from './core/menu-list-item/menu-list-item.component';

import { LayoutModule } from '@angular/cdk/layout';
import { SharedModule } from './shared/shared.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { NavService } from './service/nav/nav.service';
import { environment } from 'src/environments/environment';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MainComponent } from './core/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavbarComponent,
    MenuListItemComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    NgScrollbarModule,
  ],
  providers: [NavService],
  bootstrap: [AppComponent],
})
export class AppModule {}
