import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';
import { Notes } from 'src/app/models/notes';
import { faArrowRotateLeft, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-notes',
  templateUrl: './create-notes.component.html',
  styleUrls: ['./create-notes.component.scss']
})
export class CreateNotesComponent implements OnInit {

  // FontAwesome Icons
  squarePlus = faSquarePlus;
  arrowRotateLeft = faArrowRotateLeft;

  noteForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private API: ApiService, private toastr: ToasterService, private router:Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.noteForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      tags: ['', [Validators.required]]
    });
  }

  get f() {
    return this.noteForm.controls;
  }

  get form() {
    return {
      dirty: this.noteForm.dirty,
      submitted: this.submitted
    };
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.noteForm.valid); // Debugging
    if (this.noteForm.invalid) {
      return;
    }
    this.postAPI(this.noteForm.value);
    this.clear();
    this.router.navigate(["/notes"]);
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
    this.submitted = false;
  }
}
