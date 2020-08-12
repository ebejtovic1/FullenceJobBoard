import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobCreateComponent} from './jobs/job-create/job-create.component'
import { CardComponent } from './card/card.component';

const routes: Routes = [
  {
    path: 'card', component: CardComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
