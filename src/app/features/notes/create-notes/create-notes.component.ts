import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';
import { Notes } from 'src/app/models/notes';

@Component({
  selector: 'app-create-notes',
  templateUrl: './create-notes.component.html',
  styleUrls: ['./create-notes.component.scss']
})
export class CreateNotesComponent implements OnInit {
  noteForm!: FormGroup;
  submitted = false;

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
    });
  }

  get f() {
    return this.noteForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.noteForm.valid); // Debugging
    if (this.noteForm.invalid) {
      return;
    }
    this.postAPI(this.noteForm.value);
    this.clear();
  }

  postAPI(data: Notes) {
    this.API.postNote(data).subscribe(res => {
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
