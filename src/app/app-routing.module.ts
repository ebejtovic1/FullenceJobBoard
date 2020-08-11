import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobCreateComponent} from './jobs/job-create/job-create.component'

const routes: Routes = [
  {
    path: 'create', component: JobCreateComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
