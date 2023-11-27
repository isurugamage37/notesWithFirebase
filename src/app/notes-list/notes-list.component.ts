import { Component, OnInit,Output,EventEmitter, OnDestroy } from '@angular/core';
import { NotesService } from '../notes.service';
import { Database, set, ref , onValue,push, remove } from '@angular/fire/database';
import { Subscription, interval } from 'rxjs';
import {SharedService} from '../shared.service'

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit, OnDestroy {

  public notesList!: any[];

  public filteredNotes!: any[];

  selectedNote = null;
  disableEditing = false;
  public email!: string | null;
  note: any = null;
  public noteArry!: any[];
  private subscription: Subscription;

  searchedText = '';
  @Output() showDetailsScreenCall = new EventEmitter();
i: any;

  constructor(private notesService: NotesService,
    private sharedService: SharedService,
    public database : Database) {
    this.notesService.clearData();

    this.subscription = this.sharedService.methodDeleteNote$.subscribe((note) => {
      this.deleteNote(note);
    });
   }

   ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
     this.notesService.clearData();
    this.notesService.noteDetailSubscription.subscribe((data: any) => {
      localStorage.setItem('notes', JSON.stringify(this.notesList));
    });

    this.notesService.noteSubscription.subscribe((data: any) => {
      if ( data.action === 'delete' && this.selectedNote ) {
          this.notesList.splice(this.getSelectedNoteIndex(), 1);
          if(this.notesList.length === 0){
          }
      }
      if ( data.action === 'addEdit' ) {
        let currentDate = (new Date().getHours() > 12? new Date().getHours() - 12: new Date().getHours()) + ':'  + ( new Date().getMinutes() < 10? '0'+ new Date().getMinutes() : new Date().getMinutes() )+ (new Date().getHours() > 12? ' PM': ' AM');    
        
        if (Array.isArray(this.notesList)) {
          this.notesList.forEach(note => note.selected = false);
        } else {
          this.notesList = [];
        }
        this.notesList.push({
          id: Math.random() * 100,
          body: '',
          title: '',
          date: currentDate,
          selected: true
        });
        this.noteClickHandler(this.notesList[this.notesList.length-1]);
      }
      localStorage.setItem('notes', JSON.stringify(this.notesList));
    });
  }

  click(){
    this.notesList = [];
    this.email =localStorage.getItem('email');
    let resultArray =  this.email ? this.email.split(".") : [];
    const starCountRef = ref(this.database, 'NOTE_DETAIL/' + resultArray[0]);
      onValue(starCountRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          if (Array.isArray(this.notesList)) {
            this.notesList.forEach(note => note.selected = false);
          } else {
            this.notesList = [];
          }
          if(childData.aId==null){
            childData.aId = childKey;
          }
          this.notesList.push(childData);
            localStorage.setItem('notes', JSON.stringify(childData));
        });
      }, {
        onlyOnce: true
      });
  
   this.filteredNotes = this.notesList;
  }

  setDummyNote() {
    let notes = JSON.parse(localStorage.getItem('notes')  || '{}');
    if( !notes || notes && notes.length === 0 ){
      let currentDate = (new Date().getHours() > 12? new Date().getHours() - 12: new Date().getHours()) + ':'  + new Date().getMinutes() + (new Date().getHours() > 12? ' PM': ' AM');      
      const newNote = {
        id: Math.random() * 100,
        body: '',
        title: '',
        date: currentDate,
        selected: true
      };
      localStorage.setItem('notes', JSON.stringify([newNote])); 
      this.notesList = JSON.parse(localStorage.getItem('notes')  || '{}');
      this.notesService.noteClickSubscription.next(newNote);
    }
  }

  addNoteHandler(){
    this.showDetailsScreenCall.emit(true);
    this.sharedService.newNodeMethod(true);
  }

  editNoteHandler(){
    this.setDummyNote();
    this.showDetailsScreenCall.emit(true);
  }

  getSelectedNoteIndex() {
    const index = this.notesList.findIndex( note => note.selected  === true );
    this.selectedNote = this.notesList[index];
    return index;
  }

  removeSelection() {
    this.notesList.forEach(note => note.selected = false);
  }

  deleteNoteHandler() {
    this.notesService.noteDeleteHandler();
  }

  noteClickHandler(data: any) {
    const index = this.notesList.findIndex( note => note.id === data.id );
    this.selectedNote = this.notesList[index];
    this.notesList.forEach(note => note.selected = false);
    this.notesList[index].selected = true;
    this.notesService.noteClickSubscription.next(this.notesList[index]);
  }

  click2( value? : any){
    if( this.notesList && this.notesList.length > 0 ){
      return this.notesList.filter((note) => {
        if( this.searchedText.trim().length === 0 || 
          note.title.indexOf(this.searchedText.trim()) > -1 || 
          note.body.indexOf(this.searchedText.trim()) > -1 ){
          return true;
        } else {
          return false;
        }
    });
    } else {
      return [];
    }
  }

  searchedNotes(value? : any){
    this.notesList.push(this.noteArry);

    if( this.notesList && this.notesList.length > 0 ){
      return this.notesList.filter((note) => {
        if( this.searchedText.trim().length === 0 || 
          note.title.indexOf(this.searchedText.trim()) > -1 || 
          note.body.indexOf(this.searchedText.trim()) > -1 ){
          return true;
        } else {
          return false;
        }
    });
    } else {
      return [];
    }    
  }

  searchHandler(inputEl: { value: any; }) {
    this.notesService.searchHandler(inputEl.value);
  }

  showDetailsScreenCallEdit(){
    this.showDetailsScreenCall.emit(true);
  }

  deleteNote(note:any){

    this.email = localStorage.getItem('email');
  let resultArray =  this.email ? this.email.split(".") : [];
 
  let currentDate = (new Date().getHours() > 12? new Date().getHours() - 12: new Date().getHours()) + ':'  + new Date().getMinutes() + (new Date().getHours() > 12? ' PM': ' AM');  

  const postListRef = ref(this.database, 'NOTE_DETAIL/' + resultArray[0] +'/' + note.aId);
  remove(postListRef);

  }
  

}

