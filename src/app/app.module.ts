import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteComponent } from './notes-list/note/note.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NotesService } from './notes.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { MatMenuModule } from '@angular/material/menu';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { LoginComponent } from './user/login/login.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { ProfileComponent } from './user/profile/profile.component';
// import { HotToastModule } from '@ngneat/hot-toast';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { SharedService } from './shared.service';
import { HotToastModule } from '@ngneat/hot-toast';



@NgModule({
  declarations: [
    AppComponent,
    NotesListComponent,
    NoteComponent,
    NoteDetailComponent,
    LoginComponent,
    SignUpComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatFormFieldModule,
    AppRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp({"projectId":"notes-ddc9d","appId":"1:500258118587:web:b15b187a0eec4ee288429e","databaseURL":"https://notes-ddc9d-default-rtdb.firebaseio.com","storageBucket":"notes-ddc9d.appspot.com","apiKey":"AIzaSyAKFneDcwoWpK0vnRDTMYSvYdrh5lh-UlM","authDomain":"notes-ddc9d.firebaseapp.com","messagingSenderId":"500258118587"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
    HotToastModule.forRoot(),
    MatMenuModule,
  ],
  providers: [NotesService,SharedService],
  bootstrap: [AppComponent]
})
export class AppModule {}
