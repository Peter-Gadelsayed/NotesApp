import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { CreateNotesComponent } from './create-notes/create-notes.component';
import { NotesComponent } from './notes/notes.component';
import { EditNotesComponent } from './edit-notes/edit-notes.component';
import { ShowNoteComponent } from './show-note/show-note.component';


@NgModule({
  declarations: [
    CreateNotesComponent,
    NotesComponent,
    EditNotesComponent,
    ShowNoteComponent
  ],
  imports: [
    CommonModule,
    NotesRoutingModule
  ]
})
export class NotesModule { }
