import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './core/main/main.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { ToolbarComponent } from './core/toolbar/toolbar.component';
import { MenuItemComponent } from './core/menu-item/menu-item.component';

import { LayoutModule } from '@angular/cdk/layout';
import { SharedModule } from './shared/shared.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { NavService } from './service/nav/nav.service';
import { environment } from 'src/environments/environment';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatIconRegistry } from '@angular/material/icon';
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ToolbarComponent,
    MenuItemComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "wckdApp" }),
    NgScrollbarModule.withConfig({
      track: 'all',
      pointerEventsMethod: 'scrollbar',
    }),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
  ],
  providers: [NavService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer, iconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    overlayContainer.getContainerElement().classList.add('one-dark-theme');
    iconRegistry.addSvgIconSet(
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')
    );
  }
}
