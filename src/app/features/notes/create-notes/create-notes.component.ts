import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-create-notes',
  templateUrl: './create-notes.component.html',
  styleUrls: ['./create-notes.component.scss']
})
export class CreateNotesComponent implements OnInit {
  success:boolean = false;
  failed: boolean = false;
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

  constructor(private fb:FormBuilder, private API:ApiService) {}
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
      console.log(res);
      this.success = true;
    }, err => {
      console.log(err.message);
      this.failed = true;
      if (err.status === 400) {
        this.formError = "Invalid Input. please try again and fill all the data required."
      } else if (err.status === 401) {
        this.formError = "Unauthorized. please sign in again."
      } else {
        this.formError = "Oops. Couldn't connect to the server or something else happened. Please Check your connection or try again later."
      }
    });
  }

}
