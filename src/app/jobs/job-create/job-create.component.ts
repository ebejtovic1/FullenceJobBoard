import { Component, OnInit } from '@angular/core';
import { Job } from '../job.model';
import { NgForOf } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JobsService } from '../job.service';
import { ActivatedRoute, ParamMap } from '@angular/router'; //da znamo da li idemo edit ili create posta, da li je id proslijeđen ili ne
import { mimeType } from "./mime-type.validator";

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.css']
})
export class JobCreateComponent implements OnInit {

  constructor(public jobsService: JobsService, public route: ActivatedRoute) { }

  private mode='create';
  private jobId: string;
  imagePreview: string;
  isLoading = false;
  enteredContent='';
  enteredTitle='';
  form: FormGroup;
  job: Job;
  ngOnInit(): void {

    this.form= new FormGroup({
      title: new FormControl(null,
        {validators: [Validators.required, Validators.minLength(3)]}),
      description: new FormControl(null,
        {validators: [Validators.required]}),
      image: new FormControl(null, {validators: [Validators.required], asyncValidators:[mimeType]}),
      location: new FormControl(null,
        {validators: [Validators.required]}),
      jobType: new FormControl(null,
          {validators: [Validators.required]}),
      firm: new FormControl(null,
            {validators: [Validators.required]}),

      });
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('jobId')){
        //ide Edit
      }
      else{
        this.mode='create';
        this.jobId= null;
      }
    });
  }

  onSavePost(){
    if(this.form.invalid)
    {
      return;
     }
    /*const post: Post = { //kad imamo event i output
      title: form.value.title,
      content: form.value.content
     };*/

     this.isLoading=true;
     if(this.mode==='create'){
       this.jobsService.addPost(this.form.value.title, this.form.value.description, this.form.value.image, this.form.value.location, this.form.value.jobType, this.form.value.firm)

     }
     else{
       //ovjde ide za update
     }
     this.form.reset();
  }
  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload= () => {
       this.imagePreview = reader.result.toString();
    };
    reader.readAsDataURL(file);
   }

}