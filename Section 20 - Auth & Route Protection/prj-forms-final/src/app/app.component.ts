import { Component, OnInit, Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ConfigDetails } from 'config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  constructor(private config: ConfigDetails) {}

  ngOnInit() {
    firebase.initializeApp({
      apiKey: this.config.getApiKey(),
      authDomain: this.config.getAuthDomain()
    })
  }


}
