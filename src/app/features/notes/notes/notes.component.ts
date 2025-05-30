import { Component } from '@angular/core';
import { Notes } from 'src/app/models/notes';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';
import { faCopy, faEye, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {
  notes: Notes[] = [];

  OpenBtnText: string = 'View';
  delBtnText: string = 'Delete';
  editBtnText: string = 'Edit';
  duplicateBtnText: string = 'Duplicate';

  // FontAwesome Icons
  penToSquare = faPenToSquare;
  eye = faEye;
  copy = faCopy;
  trash = faTrash;
  plus = faPlus;



  constructor(
    private apiService: ApiService,
    private router: Router,
    private alert: AlertService,
    private spinner: SpinnerService,
    private toaster: ToasterService
  ) { }

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.spinner.show(); // Show spinner
    this.apiService.getNotes().subscribe((notes) => {
      this.notes = notes;
      this.spinner.hide(); // Hide spinner on success
    }, (error) => {
      this.toaster.ErrorToaster("Error Fetching Notes", error.message || "Error",);
      this.spinner.hide(); // Hide spinner on error
    }
    );
  }

  openNote(note: Notes) {
    this.router.navigate(['/notes/show/', note.id])
  }

  createNote() {
    this.router.navigate(['/notes/create'])
  }

  deleteNote(note: Notes) {
    this.alert.confirm('Delete Note ?', `Are you sure you want to delete this note "${note.title}" ?`, 'Delete', 'Keep', () => {
      this.deleteNoteFunction(note);
    });
  }

  editNote(note: Notes) {
    this.router.navigate(['/notes/edit/', note.id])
  }

  deleteNoteFunction(note: Notes) {
    this.spinner.show(); // Show spinner
    // Delete the Note by its ID
    this.apiService.deleteNote(note.id).subscribe(res => {
      this.toaster.SuccessToaster("Note Deleted Successfully", res.message || "Deleted",);
      // Update the list after deletion
      this.getNotes();
      this.spinner.hide(); // Hide spinner on success
    }, err => {
      this.toaster.ErrorToaster("Error Deleting Note", err.message || "Error",);
      this.spinner.hide(); // Hide spinner on error
    });
  }

  duplicateNote(note: Notes) {
    this.spinner.show(); // Show spinner
    // Create a new note with the same content as the original note
    const newNote: Notes = { ...note, id: 0 }; // ID is auto-generated
    this.apiService.postNote(newNote).subscribe(res => {
      // this.notes.push(res); // Add the duplicated note to the list
      // Update the list after deletion
      this.getNotes();
      this.toaster.SuccessToaster("Note Duplicated Successfully", res.message || "Duplicated",);
      this.spinner.hide(); // Hide spinner on success
    }, err => {
      this.toaster.ErrorToaster("Error Duplicating Note", err.message || "Error",);
      this.spinner.hide(); // Hide spinner on error
    });
  }
}
