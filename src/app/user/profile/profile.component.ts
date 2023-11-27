// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css']
// })
// export class ProfileComponent {

// }


import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { getAuth, updateProfile } from 'firebase/auth';
import { switchMap, tap } from 'rxjs';
import { ProfileUser } from 'src/app/models/user';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { UsersService } from 'src/app/services/users.service';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  // user$ = this.usersService.currentUserProfile$;
  
  public users : any;
  @Output() showListScreenCall = new EventEmitter();
  public displayName: string | undefined ;


  profileForm = this.fb.group({
    uid: [''],
    displayName: [''],
    firstName: [''],
    lastName: [''],
    phone: [''],
    address: [''],
  });
  

  constructor(
    private imageUploadService: ImageUploadService,
    private toast: HotToastService,
    private usersService: UsersService,
    private fb: NonNullableFormBuilder
  ) {
  }

  ngOnInit(): void {
    this.usersService.currentUserProfile$
      .pipe(untilDestroyed(this), tap(console.log))
      .subscribe((user) => {
        this.profileForm.patchValue({ ...user });
      });
  }

  uploadFile(event: any, user: any) {
    console.log("eventtttttttttttt",event);
    console.log("eventtttttttttttt event.target.files[0]",event.target.files[0]);
    console.log("eventtttttttttttt",user.uid);
    this.imageUploadService
      .uploadImage(event.target.files[0], `images/profile/${user.uid}`)
      .pipe(
        this.toast.observe({
          loading: 'Uploading profile image...',
          success: 'Image uploaded successfully',
          error: 'There was an error in uploading the image',
        }),
        switchMap((photoURL) =>
          // this.usersService.updateUser({
          //   uid,
          //   photoURL,
          // })
        
      // if(auth.currentUser != null){
        updateProfile(user, {
          photoURL: photoURL
        }).then(() => {
          this.showListScreenCall.emit(true);
          console.log("godaaaaaaaaaaaaaaaaa111111");
          // Profile updated!
          // ...
        }).catch((error) => {
          this.showListScreenCall.emit(true);
          console.log("Nooooooooooooooooooooooooooo111111");
          // An error occurred
          // ...
        })
      // }
        )
      )
      .subscribe();
      
  }

  saveProfile(user : any) {
    
    // const { uid, ...data } = this.profileForm.value;
    console.log("yyyyyyyyyyyyyyy",user)
    console.log("yyyyyyyyyyyyyyy",this.profileForm)
    console.log("yyyyyyyyyyyyyyy",this.profileForm.value)

    if (!user.uid) {
      return;
    }

    // this.usersService
    //   .updateUser({ uid, ...data })
    //   .pipe(
    //     this.toast.observe({
    //       loading: 'Saving profile data...',
    //       success: 'Profile updated successfully',
    //       error: 'There was an error in updating the profile',
    //     })
    //   )
    //   .subscribe();
    updateProfile(user, {
          displayName: this.profileForm.value.displayName , 
        }).then(() => {
          console.log("godaaaaaaaaaaaaaaaaa111111");
          this.showListScreenCall.emit(true);
          // Profile updated!
          // ...
        }).catch((error) => {
          console.log("Nooooooooooooooooooooooooooo111111");
          // An error occurred
          // ...
        })
  }

  loadUser(){
    const user= getAuth().currentUser;
console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjhfughfucbdskjbchjdsh",user)
    if(user != null){
      this.users = user 
      if(user.displayName){
this.displayName = user.displayName;
      }
    
   
   }
  }

  back(){
    this.showListScreenCall.emit(true);

  }
}

