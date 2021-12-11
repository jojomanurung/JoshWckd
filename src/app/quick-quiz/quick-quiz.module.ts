import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { QuickQuizRoutingModule } from './quick-quiz-routing.module';
import { QuickQuizComponent } from './page/quick-quiz.component';
import { QuickQuizPlayComponent } from './components/quick-quiz-play/quick-quiz-play.component';
import { QuickQuizEndDialog } from './components/quick-quiz-end-dialog/quick-quiz-end-dialog.component';

@NgModule({
  declarations: [
    QuickQuizComponent,
    QuickQuizPlayComponent,
    QuickQuizEndDialog,
  ],
  imports: [CommonModule, SharedModule, QuickQuizRoutingModule],
})
export class QuickQuizModule {}
