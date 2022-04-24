import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CnnCancerRoutingModule } from './cnn-cancer-routing.module';
import { CnnCancerComponent } from './page/cnn-cancer.component';


@NgModule({
  declarations: [
    CnnCancerComponent
  ],
  imports: [
    CommonModule,
    CnnCancerRoutingModule
  ]
})
export class CnnCancerModule { }
