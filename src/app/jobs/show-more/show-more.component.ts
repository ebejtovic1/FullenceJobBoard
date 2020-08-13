import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Job } from 'src/app/jobs/job.model';
import { JobsService } from 'src/app/jobs/job.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-show-more',
  templateUrl: './show-more.component.html',
  styleUrls: ['./show-more.component.css'],
})
export class ShowMoreComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private jobsService: JobsService,
    private router: Router,
    private authService: AuthService

  ) {
   }

   job: Job = {
    id: "",
    title: "", 
    description: "",
    imagePath: "",
    location: "",
    jobType: "",
    firm: "",
    descSubstring:"",
    creator: "",
  };
  private jobId: string;
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {

      this.userId = this.authService.getUserId();
      this.userIsAuthenticated = this.authService.getIsAuth();

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
            creator: postData.creator
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
