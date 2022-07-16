import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ShellRoutingModule } from './shell-routing.module';
import { ShellComponent } from './page/shell.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  declarations: [
    ShellComponent,
    MenuItemComponent,
    ToolbarComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgScrollbarModule.withConfig({
      track: 'all',
      pointerEventsMethod: 'scrollbar',
    }),
    ShellRoutingModule,
  ],
})
export class ShellModule {}
