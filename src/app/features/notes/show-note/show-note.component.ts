import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Notes } from 'src/app/models/notes';
import { ApiService } from '../services/api.service';
import { catchError, Subject, takeUntil, switchMap, of } from 'rxjs';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-show-note',
  templateUrl: './show-note.component.html',
  styleUrls: ['./show-note.component.scss']
})
export class ShowNoteComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  notes: Notes[] = [];
  selectedNote?: Notes;
  noteId?: number;

  // FontAwesome Icons
  plus = faPlus;

  OpenBtnText: string = 'View';
  delBtnText: string = 'Delete';
  editBtnText: string = 'Edit';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertService,
    private toastr: ToasterService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params: ParamMap) => {
          const id = params.get('id');
          this.noteId = id ? Number(id) : undefined;
          return this.apiService.getNotes();
        }),
        catchError(error => {
          this.toastr.ErrorToaster('Error loading notes:', error);
          return of([]);
        })
      )
      .subscribe(notes => {
        this.notes = notes;
        this.trySelectNote();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private trySelectNote(): void {
    if (this.noteId) {
      const foundNote = this.notes.find(n => n.id === this.noteId);
      if (foundNote) {
        this.selectedNote = foundNote;
      } else {
        this.loadNoteDetails(this.noteId);
      }
    } else {
      this.selectedNote = undefined;
    }
  }

  private reloadNotes(): void {
    this.apiService.getNotes()
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          this.toastr.ErrorToaster('Error loading notes:', error);
          return of([]);
        })
      )
      .subscribe((notes) => {
        this.notes = notes;
        this.trySelectNote();
      });
  }

  private loadNoteDetails(id: number): void {
    this.apiService.getNoteById(id)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          this.toastr.ErrorToaster('Error loading note details:', error);
          this.router.navigate(['/notes']);
          return of(undefined);
        })
      )
      .subscribe((note) => {
        this.selectedNote = note;
      });
  }

  openNote(note: Notes): void {
    this.router.navigate(['/notes/show', note.id]);
  }

  editNote(note: Notes): void {
    this.router.navigate(['/notes/edit', note.id]);
  }

  deleteNote(note: Notes): void {
    this.alert.confirm('Delete Note ?', `Are you sure you want to delete this note "${note.title}" ?`, 'Delete', 'Keep', () => {
      const currentIndex = this.notes.findIndex(n => n.id === note.id);

      this.apiService.deleteNote(note.id)
        .pipe(
          takeUntil(this.destroy$),
          catchError((error) => {
            this.toastr.ErrorToaster('Error deleting note:', error);
            return of(null);
          })
        )
        .subscribe((res) => {
          if (res) {
            this.toastr.SuccessToaster("Note Deleted Successfully", res.message || "Deleted");

            if (currentIndex > 0) {
              const previousNote = this.notes[currentIndex - 1];
              this.router.navigate(['/notes/show', previousNote.id]);
            } else if (this.notes.length > 1) {
              const nextNote = this.notes[1];
              this.router.navigate(['/notes/show', nextNote.id]);
            } else {
              this.router.navigate(['/notes']);
            }

            this.reloadNotes();
          }
        });
    });
  }

  createNote(): void {
    this.router.navigate(['/notes/create']);
  }
}
