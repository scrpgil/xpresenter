import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PlayPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-play',
    templateUrl: 'play.html',
})
export class PlayPage {
    slides:any;
    slide:any;
    num:number;
    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams
    ) {
        this.num = 0;
        this.slides = this.navParams.data.slides;
        this.slide = this.slides[this.num];
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PlayPage');
    }
    next(){
        this.num++;
        if(this.slides.length <= this.num){
            this.navCtrl.pop();
        }else{
            this.slide = this.slides[this.num];
        }
    }
}
