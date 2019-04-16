import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';
import * as firebase from 'firebase';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-tutor-orders',
  templateUrl: './tutor-orders.page.html',
  styleUrls: ['./tutor-orders.page.scss'],
})
export class TutorOrdersPage implements OnInit {
 
  tutor_orders=[
  ];
  constructor(
    private router: Router,
    public itemService : ItemService,
    public events: Events
  ) { 
    var self = this;
    events.subscribe('dataloaded', (time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('data load time:', time);
      self.tutor_orders = this.itemService.getTutorOrders();
      console.log("courses loaded: " + self.tutor_orders);
      });
  }
  current_user = firebase.auth().currentUser;

  ngOnInit() {
    console.log("ngOnInit ...");
    this.tutor_orders  = this.itemService.getTutorOrders();
    console.log("courses no: "+this.tutor_orders.length)
    if(this.tutor_orders  != undefined){
          console.log("couse length" + this.tutor_orders.length);
    }
  }

}
