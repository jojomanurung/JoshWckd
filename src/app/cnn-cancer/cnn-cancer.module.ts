import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CnnCancerRoutingModule } from './cnn-cancer-routing.module';
import { CnnCancerComponent } from './page/cnn-cancer.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CnnCancerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CnnCancerRoutingModule,
  ]
})
export class CnnCancerModule { }
