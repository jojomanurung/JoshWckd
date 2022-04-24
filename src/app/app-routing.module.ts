import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './core/main/main.component';

const main: Routes = [
  {
    path: 'management',
    loadChildren: () =>
      import('./management/management.module').then((m) => m.ManagementModule),
  },
  {
    path: 'kanban',
    loadChildren: () =>
      import('./kanban/kanban.module').then((m) => m.KanbanModule),
  },
  {
    path: 'quick-quiz',
    loadChildren: () =>
      import('./quick-quiz/quick-quiz.module').then((m) => m.QuickQuizModule),
  },
  {
    path: 'cnn-cancer',
    loadChildren: () =>
    import('./cnn-cancer/cnn-cancer.module').then(m => m.CnnCancerModule)
  },
];

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: '',
    component: MainComponent,
    children: [...main],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
