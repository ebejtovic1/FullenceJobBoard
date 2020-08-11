//servis je typescript klasa koja omogućava komuniciranje između komponenti bez propertija i bindinga
import { Job } from './job.model'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map} from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({providedIn: 'root'})
export class JobsService{
  private jobs: Job [] = [];
  //da bi mogli slati kopiju azuriranu (mozemo samo staviti this.posts)
  private jobsUpdated = new Subject <Job []>();

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute){}

  addPost(title: string, description: string, image: File, location: string, jobType: string, firm:string){

    const jobData = new FormData();
    jobData.append("title", title);
    jobData.append("description", description);
    jobData.append("image", image, title);
    jobData.append("location", location);
    jobData.append("jobType", jobType);
    jobData.append("firm", firm);
    this.http.post<{message: string, post: Job}>
    ('http://localhost:3000/api/jobs',jobData)
    .subscribe((responseData)=>{
      const post: Job = {id: responseData.post.id, title: title, description:description, imagePath: responseData.post.imagePath, location:location, jobType:jobType, firm:firm}
      this.jobs.push(post);
      this.jobsUpdated.next([...this.jobs]);
      this.router.navigate(["/"]);
    });

  }

}
