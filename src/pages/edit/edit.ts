import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { PlayPage } from '../../pages/play/play';
import { PresenEditProvider } from '../../providers/presen-edit/presen-edit';

@Component({ 
    selector: 'page-edit',
    templateUrl: 'edit.html',
    providers:[PresenEditProvider]
})
export class EditPage {
    title:string = "";
    content:string = "";
    title_change_alert_title:string = "Change Title";
    title_change_alert_save:string = "Save";
    title_change_alert_cancel:string = "Cancel";
    title_change_alert_placeholder:string = "title";
    constructor(
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        public presenEditProvider: PresenEditProvider,
        public translate: TranslateService
    ) {
        this.translate.setDefaultLang("ja");
        this.translate.get("TITLE").subscribe((res: string) => {
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
        var alert_title = this.title_change_alert_title;
        let prompt = this.alertCtrl.create({
            title: alert_title,
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
                        console.log('Saved clicked');
                    }
                }
            ]
        });
        prompt.present();
    }
    play(){
        var slides = this.presenEditProvider.generateSlides(this.title, this.content);
        if(slides != null){
            if(slides.length > 0){
                this.navCtrl.push(PlayPage,{slides: slides});
            }
        }
    }
}
