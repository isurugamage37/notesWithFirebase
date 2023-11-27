import { Component, OnInit ,Output,EventEmitter, ViewChild} from '@angular/core';
import { NotesService } from './notes.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { NotesListComponent } from './notes-list/notes-list.component';
import { getAuth } from 'firebase/auth';
import { ProfileComponent } from './user/profile/profile.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  hideSideNav = false;
  title = 'Note App';
  public showListScreen : boolean| undefined;
  public showDetailsScreen : boolean| undefined;
  public showLoginScreen : boolean| undefined;
  public showSignUpScreen : boolean| undefined;
  public showProfileScreen : boolean| undefined;
  public displayName: string = ''; 
  public photoURL: string = '/assets/images/image-placeholder.png'

  @Output('noteListClicked') noteListClicked = new EventEmitter();
  @ViewChild('list') NotesListComponent!: NotesListComponent;
  @ViewChild('profile') ProfileComponent!: ProfileComponent;
  constructor( private notesService: NotesService,
    private authService: AuthService,
    public usersService: UsersService,
    private router: Router ){
    this.showListScreen = false;
    this.showDetailsScreen = false;
    this.showLoginScreen = true;
    this.showSignUpScreen = false;
    this.showProfileScreen = false;

  }
  ngOnInit() {
    this.notesService.showHideSubscription.subscribe(() => {
      this.hideSideNav = !this.hideSideNav;
    });
  }

  showDetailsScreenCall(event:any):void{
    this.showListScreen = false;
    this.showDetailsScreen = true;
  }
  showListScreenCall(event:any):void{
    this.showListScreen = true;
    this.showDetailsScreen = false;
    this.showLoginScreen = false;
    this.showProfileScreen = false;
    this.noteListClicked.emit();
    this.NotesListComponent.click();
    const auth = getAuth();
    const user = auth.currentUser;
    if(user != null && user.displayName != null){
      this.displayName = user.displayName;
      if(user.photoURL){
        this.photoURL = user.photoURL;
      }
    }
   
  }

  showSignUpScreenCall(event:any):void{
    this.showListScreen = false;
    this.showDetailsScreen = false;
    this.showLoginScreen = false;
    this.showSignUpScreen = true;
    this.showProfileScreen = false;
  }

  showLoginScreenCall(event:any):void{
    this.showListScreen = false;
    this.showDetailsScreen = false;
    this.showLoginScreen = true;
    this.showSignUpScreen = false;
    this.displayName = '';
    this.showProfileScreen = false;
  }

  showProfileScreenCall(event:any):void{
    this.ProfileComponent.loadUser();
    this.showListScreen = false;
    this.showDetailsScreen = false;
    this.showLoginScreen = false;
    this.showSignUpScreen = false;
    this.showProfileScreen = true;
  }
  
  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}

