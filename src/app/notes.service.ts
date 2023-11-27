import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  
  noteClickSubscription = new Subject();
  noteDetailSubscription = new Subject();
  noteSubscription = new Subject();
  showHideSubscription = new Subject();
  noteSearchSubscription = new Subject();
  disableEditingSubscription = new Subject();

  constructor() { }

  noteAddEditHandler() {
    this.noteSubscription.next({action: 'addEdit'});
  }

  noteDeleteHandler() {
    this.noteSubscription.next({action: 'delete'});
  }

  noteToggleHandler() {
    this.showHideSubscription.next("");
  }

  searchHandler( value: any ) {
    this.noteSearchSubscription.next({value});
  }

  clearData() {
    this.noteSubscription.next({ action: 'clear' });
    this.noteSubscription.next({action: 'delete'});
  }

}
