import { Component, OnInit } from '@angular/core';
import { CreateMemorialService } from 'src/services/create-memorial.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnInit {

  constructor(public service:CreateMemorialService) { }

  ngOnInit(): void {
  }

}
