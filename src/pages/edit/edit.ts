import { Component } from '@angular/core';
import { Events, NavController, AlertController, NavParams } from 'ionic-angular';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { PlayPage } from '../../pages/play/play';
import { PresenEditProvider } from '../../providers/presen-edit/presen-edit';
import { Storage } from '@ionic/storage';

@Component({ 
    selector: 'page-edit',
    templateUrl: 'edit.html',
    providers:[PresenEditProvider]
})
export class EditPage {
    title:string = "";
    content:string = "";
    id:number = 999;
    title_change_alert_title:string = "Change Title";
    title_change_alert_save:string = "Save";
    title_change_alert_cancel:string = "Cancel";
    title_change_alert_placeholder:string = "title";
    constructor(
        private storage: Storage,
        private events: Events,
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        public presenEditProvider: PresenEditProvider,
        public translate: TranslateService,
        public navParams: NavParams
    ) {
        if(undefined === this.navParams.data.id){
            this.id = 999;
        }else{
            this.id = this.navParams.data.id;
        }
        if(undefined === this.navParams.data.title){
            this.translate.get("EDIT_PAGE.DEFAULT_TITLE").subscribe((res: string) => {
                this.title = res;
            });
        }else{
            this.title = this.navParams.data.title;
        }
        if(undefined === this.navParams.data.content){
            this.translate.get("EDIT_PAGE.DEFAULT_CONTENT").subscribe((res: string) => {
                this.content = res;
            });
        }else{
            this.content = this.navParams.data.content;
        }
        this.translate.setDefaultLang("ja");
        this.translate.get("TITLE_CHANGE_ALERT.TITLE").subscribe((res: string) => {
            if(res != ""){
                this.title_change_alert_title = res;
            }
        });
        this.translate.get("TITLE_CHANGE_ALERT.SAVE").subscribe((res: string) => {
            if(res != ""){
                this.title_change_alert_save = res;
            }
        });
        this.translate.get("TITLE_CHANGE_ALERT.CANCEL").subscribe((res: string) => {
            if(res != ""){
                this.title_change_alert_cancel = res;
            }
        });
        this.translate.get("TITLE_CHANGE_ALERT.PLACEHOLDER").subscribe((res: string) => {
            if(res != ""){
                this.title_change_alert_placeholder = res;
            }
        });
    }
    changeTitle(){
        let prompt = this.alertCtrl.create({
            title: this.title_change_alert_title,
            inputs: [
                {
                    name: "title",
                    value: this.title,
                    placeholder: this.title_change_alert_placeholder,
                },
            ],
            buttons: [
                {
                    text: this.title_change_alert_cancel,
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: this.title_change_alert_save,
                    handler: data => {
                        this.title = data.title;
                        this.save();
                        console.log('Saved clicked');
                    }
                }
            ]
        });
        prompt.present();
    }
    play(){
        this.save();
        var slides = this.presenEditProvider.generateSlides(this.title, this.content);
        if(slides != null){
            if(slides.length > 0){
                this.navCtrl.push(PlayPage,{slides: slides});
            }
        }
    }
    save(){
        if(this.id != 999){
            this.events.publish('title:updated', this.id, this.title);
            this.storage.set('slide'+this.id, JSON.stringify({title:this.title,content:this.content}));
        }
    }
}
