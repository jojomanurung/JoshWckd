import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuickQuizPlayComponent } from './components/quick-quiz-play/quick-quiz-play.component';
import { QuickQuizComponent } from './page/quick-quiz.component';
import { QuickQuizGuard } from './quick-quiz.guard';

const routes: Routes = [
  {
    path: '',
    component: QuickQuizComponent,
  },
  {
    path: 'play',
    component: QuickQuizPlayComponent,
    canActivate: [QuickQuizGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [QuickQuizGuard],
})
export class QuickQuizRoutingModule {}
