import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesModule } from './notes.module';
import { CreateNotesComponent } from './create-notes/create-notes.component';
import { NotesComponent } from './notes/notes.component';
import { EditNotesComponent } from './edit-notes/edit-notes.component';

const routes: Routes = [
  {path: '', component: NotesComponent,

    children:[
      {path: 'create', component: CreateNotesComponent},
      {path: 'edit/:id', component: EditNotesComponent},
    ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
