import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { QuickQuizRoutingModule } from './quick-quiz-routing.module';
import { QuickQuizComponent } from './page/quick-quiz.component';

@NgModule({
  declarations: [
    QuickQuizComponent
  ],
  imports: [CommonModule, SharedModule, QuickQuizRoutingModule],
})
export class QuickQuizModule {}
