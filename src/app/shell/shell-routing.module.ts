import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './page/shell.component';

const routes: Routes = [
  {
    path: 'management',
    loadChildren: () =>
      import('../management/management.module').then((m) => m.ManagementModule),
  },
  {
    path: 'kanban',
    loadChildren: () =>
      import('../kanban/kanban.module').then((m) => m.KanbanModule),
  },
  {
    path: 'quick-quiz',
    loadChildren: () =>
      import('../quick-quiz/quick-quiz.module').then((m) => m.QuickQuizModule),
  },
];

const shell: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [...routes],
  },
];

@NgModule({
  imports: [RouterModule.forChild(shell)],
  exports: [RouterModule],
})
export class ShellRoutingModule {}
