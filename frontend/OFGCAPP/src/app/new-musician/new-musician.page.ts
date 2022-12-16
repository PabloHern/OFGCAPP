import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Musician } from '../models/musician';
import { MusicianService } from '../services/musician.service';
import { TokenService } from '../services/token.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new-musician',
  templateUrl: './new-musician.page.html',
  styleUrls: ['./new-musician.page.scss'],
})
export class NewMusicianPage {
  newMusician: Musician;
  name = '';
  description = '';
  toastColor: string;
  token: any;
  constructor(private router: Router, private musicianService: MusicianService, private tokenService: TokenService, private toastController: ToastController) { }

  ionViewWillEnter() {

  }
  goToHome() {
    this.router.navigateByUrl("/home");
  }
  onCreate() {
    this.newMusician = new Musician(this.name, this.description);
    this.token = this.tokenService.getToken();
    this.musicianService.createMusician(this.newMusician, this.token).subscribe(
      data => {
        this.toastColor = 'success'
        this.presentToast(data.message);
        this.router.navigate(['/event-list']);
      },
      err => {
        this.toastColor = 'danger'
        this.presentToast(err.error.message);
      }
    )
  }
  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000,
      position: 'bottom',
      color: this.toastColor,
      icon: "alert-circle-outline",
      animated: true
    });
    toast.present();
  }
  logOut(): void {
    this.tokenService.logOut();
    this.router.navigateByUrl("/home");
  }
}
