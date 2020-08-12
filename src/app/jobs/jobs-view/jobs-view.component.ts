import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/jobs/job.service';
import { Job } from 'src/app/jobs/job.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-jobs-view',
  templateUrl: './jobs-view.component.html',
  styleUrls: ['./jobs-view.component.css'],
})
export class JobsViewComponent implements OnInit {
  jobs: Job[] = [];
  private postsSub: Subscription;

  public filterLocation = '';
  public filterJobType = '';
  constructor(private jobsService: JobsService) {}

  ngOnInit(): void {
    this.jobsService.getJobs();
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
  }
  onDelete(jobId: string) {
    this.jobsService.deleteJob(jobId);
  }
}
