import { NgModule } from '@angular/core';
import { JobsViewComponent } from 'src/app/components/jobs-view/jobs-view.component';
import { Routes, RouterModule } from '@angular/router';
import { JobCreateComponent } from './jobs/job-create/job-create.component';

const routes: Routes = [
  {
    path: 'create',
    component: JobCreateComponent,
  },
  { path: 'showJobs', component: JobsViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
