import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile-pop',
  templateUrl: './user-profile-pop.component.html',
  styleUrls: ['./user-profile-pop.component.css']
})
export class UserProfilePopComponent implements OnInit {

  constructor(
    public dialogRef:MatDialogRef<UserProfilePopComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {
  }



 


}
