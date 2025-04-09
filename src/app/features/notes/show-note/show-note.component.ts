import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Notes } from 'src/app/models/notes';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-show-note',
  templateUrl: './show-note.component.html',
  styleUrls: ['./show-note.component.scss']
})
export class ShowNoteComponent implements OnInit {
  notes: Notes[] = [];
  selectedNote: Notes | null = null;
  noteId: string | null = null;

  OpenBtnText: string = 'View';
  delBtnText: string = 'Delete';
  editBtnText: string = 'Edit';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadNotesAndMaybeSelectNote();
  }

  // ✅ تعديل هنا
  loadNotesAndMaybeSelectNote() {
    this.apiService.getData().subscribe(
      (notes) => {
        this.notes = notes;

        // ننتظر بعد ما النوتس توصل وبعدين نحاول نحدد الـ note المطلوبة
        this.route.paramMap.subscribe(params => {
          this.noteId = params.get('id');
          if (this.noteId) {
            const foundNote = this.notes.find(n => n.id === Number(this.noteId));
            if (foundNote) {
              this.selectedNote = foundNote;
            } else {
              // fallback لو ملقاش النوت في اللستة (مثلاً لو اتغيرت بالباك اند)
              this.loadNoteDetails(this.noteId);
            }
          }
        });
      },
      (error) => console.error('Error loading notes:', error)
    );
  }

  loadNoteDetails(id: string) {
    this.apiService.getNoteById(Number(id)).subscribe(
      (note) => {
        this.selectedNote = note;
      },
      (error: Error) => console.error('Error loading note details:', error)
    );
  }

  openNote(note: Notes) {
    this.router.navigate(['/notes/show', note.id.toString()]);
  }

  editNote(note: Notes) {
    this.router.navigate(['/notes/edit', note.id]);
  }

  deleteNote(note: Notes) {
    if (confirm('Are you sure you want to delete this note?')) {
      this.apiService.deleteNote(note.id).subscribe(
        () => {
          this.loadNotesAndMaybeSelectNote();
          if (this.selectedNote?.id === note.id) {
            this.selectedNote = null;
          }
        },
        (error: Error) => console.error('Error deleting note:', error)
      );
    }
  }

  createNote() {
    this.router.navigate(['/notes/create']);
  }
}
