import { Component } from '@angular/core';

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



}
