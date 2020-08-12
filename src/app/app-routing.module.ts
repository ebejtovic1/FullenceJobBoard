import { NgModule } from '@angular/core';
import { JobsViewComponent } from 'src/app/jobs/jobs-view/jobs-view.component';
import { Routes, RouterModule } from '@angular/router';
import { JobCreateComponent } from './jobs/job-create/job-create.component';
import { CardComponent } from './card/card.component';
import { ShowMoreComponent } from 'src/app/jobs/show-more/show-more.component';

const routes: Routes = [
  {
    path: 'card',
    component: CardComponent,
  },
  { path: '', component: JobsViewComponent },
  {
    path: 'create',
    component: JobCreateComponent,
  },
  {
    path: 'showMore/:jobId',
    component: ShowMoreComponent,
  },
  {
    path: 'edit/:postId',
    component: JobCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
