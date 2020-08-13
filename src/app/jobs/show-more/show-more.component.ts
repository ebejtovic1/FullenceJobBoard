import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Job } from 'src/app/jobs/job.model';
import { JobsService } from 'src/app/jobs/job.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-show-more',
  templateUrl: './show-more.component.html',
  styleUrls: ['./show-more.component.css'],
})
export class ShowMoreComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private jobsService: JobsService,
    private router: Router
  ) {}
  job: Job;
  private jobId: string;
  isLoading = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('jobId')) {
        this.jobId = paramMap.get('jobId');
        this.isLoading = true;
        console.log(this.jobId);
        console.log(this.jobsService.getJob(this.jobId));
        this.jobsService.getJob(this.jobId).subscribe((postData) => {
          this.isLoading = false;
          this.job = {
            id: postData._id,
            title: postData.title,
            description: postData.description,
            imagePath: postData.imagePath,
            location: postData.location,
            jobType: postData.jobType,
            firm: postData.firm,
            descSubstring: postData.descSubstring,
          };
        });
      }
    });
  }
  onDelete(jobId: string) {
    this.jobsService.deleteJob(jobId);
    this.router.navigateByUrl('');
  }
}
