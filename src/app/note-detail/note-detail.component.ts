import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NotesService } from '../notes.service';
import { Database, set, ref , onValue,push, update } from '@angular/fire/database';
import { Subscription } from 'rxjs';
import {SharedService} from '../shared.service'

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit, OnDestroy {
  note: any = null;
  currentDate: string = "";
  isButtonDisabled: boolean = true;
  checkEditNoteObj: boolean = false;
  editNoteObj!: any[];
  editNoteAID : String = '';
  @Output() showListScreenCall = new EventEmitter();
  @ViewChild('titleTextarea', { static: true })
  titleTextarea!: ElementRef;
  @ViewChild('bodyTextarea', { static: true })
  bodyTextarea!: ElementRef;
  public titleTextareaNg: string | undefined ;
  public bodyTextareaNg: string | undefined ;
  public email!: string | null;

  private subscription: Subscription;

  constructor(private notesService: NotesService,
    private sharedService: SharedService,
    public database : Database ) { 
      this.subscription = this.sharedService.methodTriggered$.subscribe((note) => {
        this.noteValue(note);
      });

      this.subscription = this.sharedService.methodNewNote$.subscribe((note) => {
        this.newNote(note);
      });
    }    
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.currentDate = (new Date().getDate() + ', ' + new Date().getFullYear()) + ' at ' + (new Date().getHours() > 12 ? new Date().getHours() - 12 : new Date().getHours()) + ':' + ("0" + new Date().getMinutes()).slice(-2) + (new Date().getHours() > 12 ? ' PM' : ' AM');
    setInterval(() => {
      this.currentDate = (new Date().getDate() + ', ' + new Date().getFullYear()) + ' at ' + (new Date().getHours() > 12 ? new Date().getHours() - 12 : new Date().getHours()) + ':' + ("0" + new Date().getMinutes()).slice(-2) + (new Date().getHours() > 12 ? ' PM' : ' AM');
    }, 1000);
    this.notesService.noteClickSubscription.subscribe((note) => {
      // this.note = note;
      this.email =localStorage.getItem('email');
      let resultArray =  this.email ? this.email.split(".") : [];
      const starCountRef = ref(this.database, 'NOTE_DETAIL/' + resultArray[0]);
      console.log("localStorage.getItem('email')",localStorage.getItem('email'));
      onValue(starCountRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();

            this.note=childData;
  
        
          console.log("godaaaaaaaaaaaaaaaaaaaaaaaaaaa1",childData);
          console.log("this.notethis.notethis.notethis.notethis.note",this.note);

          // ...
        });
      }, {
        onlyOnce: true
      });

      //end

      console.log("this.note finalllll",this.note);
      this.bodyTextarea.nativeElement.value = this.note.body;
      this.titleTextarea.nativeElement.value = this.note.title;
      this.titleTextarea.nativeElement.focus();
    });

    this.notesService.noteSubscription.subscribe((data: any) => {
      this.bodyTextarea.nativeElement.value = '';
      this.titleTextarea.nativeElement.value = '';
      this.note = null;
    });

    this.notesService.disableEditingSubscription.subscribe(({ disableEditing }: any) => {
      this.bodyTextarea.nativeElement.disabled = disableEditing;
      this.titleTextarea.nativeElement.disabled = disableEditing;

    });

    //start
    this.email =localStorage.getItem('email');
    let resultArray =  this.email ? this.email.split(".") : [];
    console.log("uuuuuuuuuuhnnnnn this.email",this.email);
    console.log("uuuuuuuuuuhnnnnn",resultArray);

    const starCountRef = ref(this.database, 'NOTE_DETAIL/' + resultArray[0]);
//     onValue(starCountRef, (snapshot) => {
//     const data = snapshot.val();
//     console.log("dataeeeeeeeeeeeeeeeee",data);
//     console.log("dataeeeeeeeeeeeeeeeeeddd",data);
//     // for(let i =0; i<data.starCount.length;i++){
//     //   console.log("dataeeeeeeeeeeeeeeeee",data.starCount.title);
//     // }
 
// });
localStorage.getItem('email')
console.log("localStorage.getItem('email')",localStorage.getItem('email'));
onValue(starCountRef, (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    const childKey = childSnapshot.key;
    const childData = childSnapshot.val();
    console.log("dataeeeeeeeeeeeeeeeechildDatachildDatachildDatae",childData);
    // ...
  });
}, {
  onlyOnce: true
});
  }

  textInputHandler() {
    this.notesService.noteDetailSubscription.next({ value: { body: this.bodyTextarea.nativeElement.value, title: this.titleTextarea.nativeElement.value }, note: this.note });
  }

  saveNote() {

  if(this.checkEditNoteObj){
    console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy" );
    this.email = localStorage.getItem('email');
  let resultArray =  this.email ? this.email.split(".") : [];

  this.showListScreenCall.emit(true);
  this.isButtonDisabled = true;
  console.log("this.titleTextarea",this.titleTextareaNg);
  console.log("this.titleTextarea",this.titleTextareaNg);
 
  let currentDate = (new Date().getHours() > 12? new Date().getHours() - 12: new Date().getHours()) + ':'  + new Date().getMinutes() + (new Date().getHours() > 12? ' PM': ' AM');  

  const postListRef = ref(this.database, 'NOTE_DETAIL/' + resultArray[0] +'/' + this.editNoteAID);
  console.log("99999999999editNoteObjeditNoteObjpostListRefpostListRef",postListRef);
  // const newPostRef = push(postListRef);
  update(postListRef, {
    title: this.titleTextareaNg,
    body:  this.bodyTextareaNg,
  });

  } else{
    console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn" );
  this.email = localStorage.getItem('email');
  let resultArray =  this.email ? this.email.split(".") : [];
  
  console.log("localStorage.getItem('email')this.email this.email ",resultArray[0] );
  this.showListScreenCall.emit(true);
  this.isButtonDisabled = true;
  console.log("this.titleTextarea",this.titleTextareaNg);
  console.log("this.titleTextarea",this.titleTextareaNg);
  let currentDate = (new Date().getHours() > 12? new Date().getHours() - 12: new Date().getHours()) + ':'  + new Date().getMinutes() + (new Date().getHours() > 12? ' PM': ' AM');  
  const postListRef = ref(this.database, 'NOTE_DETAIL/' + resultArray[0] );
  const newPostRef = push(postListRef);
  set(newPostRef, {
    id: Math.random() * 100,
    title: this.titleTextareaNg,
    body:  this.bodyTextareaNg,
    date:currentDate,
    aId:null
  });
  }
    
     
  }

  back() {
    this.showListScreenCall.emit(true);
    if (this.titleTextarea.nativeElement.value.trim().length > 0 || this.bodyTextarea.nativeElement.value.trim().length > 0 ) {
    } else {
      this.notesService.noteDeleteHandler();
    }
   
  }
  onInputChange() {
    if (this.titleTextarea.nativeElement.value.trim().length > 0 || this.bodyTextarea.nativeElement.value.trim().length > 0 ) {
      this.isButtonDisabled = false; 
    } else {
      this.isButtonDisabled = true;
    }
  }

  noteValue(note:any){
    this.checkEditNoteObj = false;
    this.editNoteObj = [];
    this.editNoteAID = '';
    this.editNoteAID = note.aId;
    this.titleTextareaNg = note.title;
    this.bodyTextareaNg = note.body;
    this.editNoteObj = note;
    this.checkEditNoteObj = true;

  }

  newNote(note:any){

    this.bodyTextarea.nativeElement.value = '';
      this.titleTextarea.nativeElement.value = '';
      this.checkEditNoteObj = false;
  }

}
