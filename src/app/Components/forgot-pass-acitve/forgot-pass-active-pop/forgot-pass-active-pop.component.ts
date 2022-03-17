import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-pass-active-pop',
  templateUrl: './forgot-pass-active-pop.component.html',
  styleUrls: ['./forgot-pass-active-pop.component.css']
})
export class ForgotPassActivePopComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  changePassword(){
    localStorage.clear();
    setTimeout(() => {
          this.router.navigate(['/login'])
            .then(() => {
              window.location.reload();
            });
        }, 1000);
    // this.router.navigate(['/login'])
  }
}
