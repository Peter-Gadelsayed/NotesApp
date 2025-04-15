import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Notes } from 'src/app/models/notes';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-edit-notes',
  templateUrl: './edit-notes.component.html',
  styleUrls: ['./edit-notes.component.scss']
})
export class EditNotesComponent implements OnInit {
  editForm!: FormGroup;
  noteId!: number;
  note!: Notes;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.initForm()
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.noteId = Number(id);
        this.loadNote(this.noteId);
      }
    });
  }

  initForm() {
    this.editForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required],
      priority: ['', Validators.required],
      tags: ['', Validators.required]
    });
  }

  get form() {
    return {
      dirty: this.editForm.dirty,
      submitted: this.submitted
    };
  }

  loadNote(id: number) {
    this.apiService.getNoteById(id).subscribe(
      (response: Notes) => {
        const noteData = response;
        this.note = noteData;
        this.editForm.patchValue({
          title: noteData.title,
          content: noteData.content,
          category: noteData.category,
          priority: noteData.priority,
          tags: noteData.tags
        });
      },
      (error: Error) => {
        console.error('Error loading note:', error);
      }
    );
  }

  onSubmit() {
    if (this.editForm.valid && this.noteId) {
      const updatedNote: Notes = {
        ...this.note,
        ...this.editForm.value,
        id: this.noteId
      };
      this.submitted = true;


      this.apiService.updateNote(this.noteId, updatedNote).subscribe(
        () => {
          this.router.navigate(['/notes/show', this.noteId]);
        },
        (error: Error) => console.error('Error updating note:', error)
      );
    }
  }

  cancel() {
    this.router.navigate(['/notes/show', this.noteId]);
  }
}
