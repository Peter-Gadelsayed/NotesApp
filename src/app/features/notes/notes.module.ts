import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesRoutingModule } from './notes-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotesComponent } from './notes/notes.component';
import { ShowNoteComponent } from './show-note/show-note.component';
import { NoteFormComponent } from './note-form/note-form.component';

@NgModule({
  declarations: [
    NotesComponent,
    ShowNoteComponent,
    NoteFormComponent
  ],
  imports: [
    CommonModule,
    NotesRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class NotesModule { }
