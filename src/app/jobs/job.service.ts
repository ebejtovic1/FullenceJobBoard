//servis je typescript klasa koja omogućava komuniciranje između komponenti bez propertija i bindinga
import { Job } from './job.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class JobsService {
  private jobs: Job[] = [];
  //da bi mogli slati kopiju azuriranu (mozemo samo staviti this.posts)
  private jobsUpdated = new Subject<Job[]>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  getJobs() {
    this.http
      .get<{ message: string; jobs: any }>('http://localhost:3000/api/jobs')
      .pipe(
        map((jobData) => {
          // _id to id
          return jobData.jobs.map((post) => {
            return {
              title: post.title,
              id: post._id,
              description: post.description,
              imagePath: post.imagePath,
              location: location,
              jobType: post.jobType,
              firm: post.firm,
            };
          });
        })
      )
      .subscribe((transformedPosts) => {
        this.jobs = transformedPosts;
        this.jobsUpdated.next([...this.jobs]);
      });
  }

  addJob(
    title: string,
    description: string,
    image: File,
    location: string,
    jobType: string,
    firm: string,
    descSubstring: string

  ) {
    const jobData = new FormData();
    jobData.append('title', title);
    jobData.append('description', description);
    jobData.append('image', image, title);
    jobData.append('location', location);
    jobData.append('jobType', jobType);
    jobData.append('firm', firm);

    this.http
      .post<{ message: string; post: Job }>(
        'http://localhost:3000/api/jobs',
        jobData
      )
      .subscribe((responseData) => {
        const post: Job = {
          id: responseData.post.id,
          title: title,
          description: description,
          imagePath: responseData.post.imagePath,
          location: location,
          jobType: jobType,
          firm: firm,
          descSubstring:""
        };
        this.jobs.push(post);
        this.jobsUpdated.next([...this.jobs]);
        this.router.navigate(['/']);
      });
  }
  deleteJob(jobId:string){
    this.http.delete("http://localhost:3000/api/jobs/" + jobId)
    .subscribe(()=>{
      const updatedJobs = this.jobs.filter(job => job.id!==jobId);
      this.jobs = updatedJobs;
      this.jobsUpdated.next([...this.jobs]);
    });
  }


  updateJob(
    id: string,
    title: string,
    description: string,
    image: File | string,
    location: string,
    jobType: string,
    firm: string,
  ) {
    let jobData: Job | FormData;
    if (typeof image === 'object') {
      jobData = new FormData();
      jobData.append('id', id);
      jobData.append('title', title);
      jobData.append('description', description);
      jobData.append('image', image, title);
      jobData.append('location', location);
      jobData.append('jobType', jobType);
      jobData.append('firm', firm);

    } else {
      jobData = {
        id: id,
        title: title,
        description: description,
        imagePath: image,
        location: location,
        jobType: jobType,
        firm: firm,
        descSubstring: ""
      };
    }

    this.http
      .put('http://localhost:3000/api/jobs/' + id, jobData)
      .subscribe((response) => {
        const updatedJobs = [...this.jobs];
        const oldJobIndex = updatedJobs.findIndex((p) => p.id === id);
        const post: Job = {
          id: id,
          title: title,
          description: description,
          imagePath: '',
          location: location,
          jobType: jobType,
          firm: firm,
          descSubstring: ""
        };

        updatedJobs[oldJobIndex] = post;
        this.jobs = updatedJobs;
        this.jobsUpdated.next([...this.jobs]);
        this.router.navigate(['/'], { relativeTo: this.route });
      });
  }

  getPostUpdateListener() {
    return this.jobsUpdated.asObservable();
  }

  getJob(id: string){
    return this.http.get<{_id: string, title: string, description: string, imagePath: string, location: string, jobType: string, firm: string,descSubstring:string }>("http://localhost:3000/api/jobs/" + id);
  }
}
