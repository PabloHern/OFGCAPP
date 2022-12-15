import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../services/events.service';
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.scss'],
})
export class EventListPage {
  events: any = [];
  constructor(private router: Router, private eventsService: EventsService) { }
  goToEvent(id: any) {
    this.router.navigateByUrl(`/event-details/${id}`);
  }
  goToHome() {
    this.router.navigateByUrl("/home");
  }
  ionViewWillEnter() {
    this.getAllEvents();
  }
  getAllEvents() {
    this.eventsService.getEvents().subscribe(response => {
      this.events = response;
      this.events = this.events['data'];
      console.log(this.events);
    });
  }
}
