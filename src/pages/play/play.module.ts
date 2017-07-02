import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayPage } from './play';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        PlayPage,
    ],
    imports: [
        IonicPageModule.forChild(PlayPage),
        TranslateModule.forChild()
    ],
    exports: [
        PlayPage
    ]
})
export class PlayPageModule {}
