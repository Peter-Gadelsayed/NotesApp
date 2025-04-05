import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Notes } from 'src/app/models/notes';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-show-note',
  templateUrl: './show-note.component.html',
  styleUrls: ['./show-note.component.scss']
})
export class ShowNoteComponent {
  notes!: Notes[];

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

}
