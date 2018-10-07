import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides)
  slides: Slides;
   numbers = [0, 1, 2];

  constructor(public navCtrl: NavController) {

  }
  slideChanged() {
    //this.slides.slidePrev(0);
    let currentIndex = this.slides.getActiveIndex();
   
    console.log('Current index is', currentIndex);
    
  }
}
