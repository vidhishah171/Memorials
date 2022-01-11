import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //for refresh page goes to home page
  constructor() { }
  private router:Router
  title = 'Soulium';

  ngOnInit() {
    this.router?.navigate([''])
  }
}
