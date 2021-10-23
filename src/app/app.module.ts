import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavbarComponent } from './core/top-navbar/top-navbar.component';
import { MenuListItemComponent } from './core/menu-list-item/menu-list-item.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { NavService } from './service/nav/nav.service';
import { environment } from 'src/environments/environment';
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
	declarations: [AppComponent, TopNavbarComponent, MenuListItemComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		MatIconModule,
		MatSidenavModule,
		MatListModule,
		MatButtonModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		NgScrollbarModule,
	],
	providers: [NavService],
	bootstrap: [AppComponent],
})
export class AppModule {}
