import { Component, OnInit, OnDestroy } from '@angular/core';
import { JobsService } from 'src/app/jobs/job.service';
import { Job } from 'src/app/jobs/job.model';
import { Subscription } from 'rxjs';
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'app-jobs-view',
  templateUrl: './jobs-view.component.html',
  styleUrls: ['./jobs-view.component.css'],
})
export class JobsViewComponent implements OnInit, OnDestroy {
  jobs: Job[] = [];

  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(private jobsService: JobsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.jobsService.getJobs();
    this.userId = this.authService.getUserId();
    this.postsSub = this.jobsService
      .getPostUpdateListener()
      .subscribe((jobs: Job[]) => {
        this.jobs = jobs;
        this.jobs.forEach((job) => {
          if (job.description.length > 150) {
            job.descSubstring = job.description.substring(0, 150) + '...';
          } else job.descSubstring = job.description;
        });
      });

      this.userIsAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService
        .getAuthStatusListener()
        .subscribe(isAuthenticated => {
          this.userIsAuthenticated = isAuthenticated;
          this.userId = this.authService.getUserId();
        });
  }
  onDelete(jobId: string) {
    this.jobsService.deleteJob(jobId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
