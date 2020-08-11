import { NgModule } from '@angular/core';
import { JobsViewComponent } from 'src/app/components/jobs-view/jobs-view.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: 'showJobs', component: JobsViewComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
