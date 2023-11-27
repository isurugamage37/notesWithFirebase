import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NotesService } from 'src/app/notes.service';
import { Router } from '@angular/router';
import { NoteDetailComponent } from '../../note-detail/note-detail.component';
import {SharedService} from '../../shared.service'

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input() note: any;
  @Input() i: any;
  // currentDate: String;
  
  @Output('noteClicked') noteClicked = new EventEmitter();
  @Output() showDetailsScreenCallEdit = new EventEmitter();
  @Output() showListScreenCall = new EventEmitter();
  @ViewChild(NoteDetailComponent)
  noteDetailComponent!: NoteDetailComponent;
  showButtons: boolean = false;

  constructor(private notesService: NotesService,
    private sharedService: SharedService,
    private router: Router) { }

  ngOnInit() {
    // this.currentDate = (new Date().getHours() > 12? new Date().getHours() - 12: new Date().getHours()) + ':'  + new Date().getMinutes() + (new Date().getHours() > 12? ' PM': ' AM');    
  }

  noteClickHandler() {
    // this.note.selected = true;
    this.showButtons = true
    this.noteClicked.emit();
  }

  noteClickHandlerD() {
    // this.note.selected = true;
    this.showButtons = false
  }

  deleteNoteHandler(noteDelete: any) {
    this.notesService.noteDeleteHandler();
    this.sharedService.deleteMethod(noteDelete);
    // this.selectedNote = false;
  }

  editNoteHandler(noteEdit: any){
    console.log("hhhhh",noteEdit)
    this.showDetailsScreenCallEdit.emit(true);
   this.sharedService.triggerMethod(noteEdit);
  }

}

