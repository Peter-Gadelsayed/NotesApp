import { Component } from '@angular/core';
import { Notes } from 'src/app/models/notes';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {
  notes: Notes[] = [];

  OpenBtnText: string = 'View';
  delBtnText: string = 'Delete';
  editeBtnText: string = 'Edit';


  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.apiService.getData().subscribe((notes) => {
      console.log('Fetched notes:', notes);
      this.notes = notes;
    }, (error) => console.error('Error:', error)
    );

  }

  openNote(note: Notes) {
    this.router.navigate(['/notes/show/', note.id])
  }

  createNote() {
    this.router.navigate(['/notes/create'])
  }

  delNote(note: Notes) {
    Swal.fire({
      title: 'Delete ?',
      text: "Are you sure you want to delete this note ?",
      icon: "error",
      showDenyButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: '#e43949',
      denyButtonText: `Keep`,
      denyButtonColor: '#198754',
    }).then((res) => {
      if (res.isConfirmed) {
        this.delNoteFunction(note);
      }
    })
  }

  delNoteFunction(note: Notes) {
    // Delete the Note by its ID
    this.apiService.deleteData(note.id).subscribe(res => {
      console.log(res);

      // Update the list after deletion
      this.apiService.getData().subscribe(notes => {
        this.notes = notes;
      });

    }, err => {
      console.log(err);
    });
  }
}
