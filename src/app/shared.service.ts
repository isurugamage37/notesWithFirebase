// shared.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private methodTriggeredSource = new Subject<any>();
  private deleteNote = new Subject<any>();
  private newNote = new Subject<any>();

  methodTriggered$ = this.methodTriggeredSource.asObservable();
  methodDeleteNote$ = this.deleteNote.asObservable();
  methodNewNote$ = this.newNote.asObservable();

  triggerMethod(note :any) {
    this.methodTriggeredSource.next(note);
  }

  deleteMethod(note :any) {
    this.deleteNote.next(note);
  }

  newNodeMethod(note :any) {
    this.newNote.next(note);
  }
}