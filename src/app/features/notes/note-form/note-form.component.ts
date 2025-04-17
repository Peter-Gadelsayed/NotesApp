import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Notes } from 'src/app/models/notes';
import { ApiService } from '../api.service';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';
import { faArrowRotateLeft, faSquarePlus, faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements OnInit {
  // FontAwesome Icons
  squarePlus = faSquarePlus;
  arrowRotateLeft = faArrowRotateLeft;
  save = faSave;

  noteForm!: FormGroup;
  submitted = false;
  isEditMode = false;
  noteId?: number;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToasterService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.noteId = Number(id);
        this.loadNote(this.noteId);
      }
    });
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

  loadNote(id: number) {
    this.apiService.getNoteById(id).subscribe({
      next: (note: Notes) => {
        this.noteForm.patchValue(note);
      },
      error: (error) => {
        this.toastr.ErrorToaster('Error loading note');
        console.error('Error loading note:', error);
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.noteForm.invalid) return;

    const noteData = this.noteForm.value;
    const request = this.isEditMode
      ? this.apiService.updateNote(this.noteId!, noteData)
      : this.apiService.postNote(noteData);

    request.subscribe({
      next: () => {
        const message = this.isEditMode ? 'Note Updated Successfully' : 'Note Created Successfully';
        this.toastr.SuccessToaster(message);
        if (this.isEditMode) {
          this.router.navigate(['/notes/show', this.noteId]);
        } else {
          this.clear();
        }
      },
      error: (err) => {
        this.toastr.ErrorToaster(this.isEditMode ? 'Update Failed' : 'Creation Failed');
        if (err.error?.errors) {
          Object.values(err.error.errors).forEach((error: any) => {
            this.toastr.ErrorToaster(`${error}`);
          });
        }
      }
    });
  }

  clear() {
    this.noteForm.reset();
    this.submitted = false;
  }

  cancel() {
    if (this.isEditMode) {
      this.router.navigate(['/notes/show', this.noteId]);
    } else {
      this.clear();
    }
  }
}
