import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './notes/notes.component';
import { ShowNoteComponent } from './show-note/show-note.component';
import { FormGuard } from 'src/app/core/form.guard';
import { NoteFormComponent } from './note-form/note-form.component';

const routes: Routes = [
  { path: '', component: NotesComponent },
  { path: 'create', component: NoteFormComponent, canDeactivate: [FormGuard] },
  { path: 'edit/:id', component: NoteFormComponent, canDeactivate: [FormGuard] },
  { path: 'show/:id', component: ShowNoteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
