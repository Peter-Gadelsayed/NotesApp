import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';

@Component({
  selector: 'app-create-notes',
  templateUrl: './create-notes.component.html',
  styleUrls: ['./create-notes.component.scss']
})
export class CreateNotesComponent implements OnInit {
  noteForm: any;
  formError: any;

  submitForm() {
    this.postAPI(this.noteForm.value);
    this.clear();
  }

  get f() {
    return this.noteForm.controls;
  }

  constructor(private fb: FormBuilder, private API: ApiService, private toastr: ToasterService) { }

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

  postAPI(data: any) {
    this.API.postNote(data).subscribe(res => {
      console.log(res.value);
      this.toastr.SuccessToaster("Note Created Successfully");
    }, err => {

      this.toastr.ErrorToaster("Note Creation Failed");

      for (let error of Object.values(err.error.errors)) {
        this.toastr.ErrorToaster(`${error}`);
      }
    });
  }

  clear() {

    this.noteForm.reset();
  }


}
