import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuickQuizComponent } from './page/quick-quiz.component';

const routes: Routes = [
  {
    path: '',
    component: QuickQuizComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuickQuizRoutingModule {}
