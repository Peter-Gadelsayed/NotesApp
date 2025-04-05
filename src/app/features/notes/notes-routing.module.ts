import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNotesComponent } from './create-notes/create-notes.component';
import { NotesComponent } from './notes/notes.component';
import { EditNotesComponent } from './edit-notes/edit-notes.component';
import { ShowNoteComponent } from './show-note/show-note.component';
import { NotFoundComponent } from 'src/app/shared/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: NotesComponent },
  { path: 'create', component: CreateNotesComponent },
  { path: 'edit/:id', component: EditNotesComponent },
  { path: 'show/:id', component: ShowNoteComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
