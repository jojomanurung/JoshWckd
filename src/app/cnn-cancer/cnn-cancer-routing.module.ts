import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CnnCancerComponent } from './page/cnn-cancer.component';

const routes: Routes = [{ path: '', component: CnnCancerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CnnCancerRoutingModule { }
