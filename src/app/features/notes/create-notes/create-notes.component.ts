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
  noteForm: any;
  
  submitForm() {
    console.log(this.noteForm.value);
    this.postAPI(this.noteForm.value);
  }
  
  
  constructor(private fb:FormBuilder, private API:ApiService) {}
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.noteForm = this.fb.group({
      title: ['', [Validators.required]] ,
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
      console.log(err);
    });
  }

}
