import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-musician',
  templateUrl: './musician.page.html',
  styleUrls: ['./musician.page.scss'],
})
export class MusicianPage {

  constructor(private router: Router) { }

  goToHome() {
    this.router.navigateByUrl("/home");
  }
}
