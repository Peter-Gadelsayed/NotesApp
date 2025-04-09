import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-notes',
  templateUrl: './create-notes.component.html',
  styleUrls: ['./create-notes.component.scss']
})
export class CreateNotesComponent implements OnInit {
  noteForm: any;
  formError: any;

  submitForm() {
    console.log(this.noteForm);
    this.postAPI(this.noteForm.value);
    this.noteForm.reset();
  }
  
  get f() {
    return this.noteForm.controls;
  }

  constructor(private fb:FormBuilder, private API:ApiService, private toastr:ToastrService) {}
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.noteForm = this.fb.group({
      title: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      tags: ['', [Validators.required]],
      content: ['', [Validators.required]],
      category: ['', [Validators.required]],
    })
  }

  postAPI(data:any) {
    this.API.postData(data).subscribe(res => {
      this.toastr.success("Note Created Successfully");
    }, err => {
      
      for (let error of Object.values(err.error.errors)) {
        this.toastr.error(`${error}`);
      }

      if (err.status === 401) {
        this.toastr.error("Unauthorized. please sign in again.");
      }
    });
  }

}
