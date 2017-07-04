import { Component, ViewChild } from '@angular/core';
import { Events, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import { TranslateService } from '@ngx-translate/core';

import { EditPage } from '../pages/edit/edit';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = EditPage;

    pages: Array<{title: string, component: any}>;

    constructor(
        private storage: Storage,
        private events: Events,
        public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        private translate: TranslateService
    ) {
        this.initializeApp();
        this.translate.setDefaultLang("ja");
        this.pages = [];
        for(var i = 0; i < 9;i++){
            this.storage.get('slide' + i).then((val) => {
                var title = "undefined";
                if(val != ""){
                    var item = JSON.parse(val);
                    if(item != null){
                        if(item.title != ""){
                            title = item.title;
                        }
                    }
                }
                this.pages.push({ title: title, component: EditPage });
            });
        }
        this.events.subscribe('title:updated', (id, title) => {
                this.pages[id].title = title;
        });
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openDefaultPage() {
        this.nav.setRoot(EditPage);
    }

    openPage(page, idx) {
        var item = {
            "title":"",
            "content":""
        };
        this.storage.get('slide' + idx).then((val) => {
            if(val != ""){
                var tmp = JSON.parse(val);
                if(tmp != null){
                    item = tmp;
                }     
            } 
            this.nav.setRoot(page.component, {id:idx, title:item.title, content:item.content});
        });
    }
}
