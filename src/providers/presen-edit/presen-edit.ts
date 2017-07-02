import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PresenEditProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
 */
interface Slide{
    content: string;
}

@Injectable()
export class PresenEditProvider {

    constructor(public http: Http) {
    }
    generateSlides(title, content){
        var slides = [];
        if(title != ""){
            var slide = <Slide>{
                content: title
            };
            slides.push(slide);
        }
        if(content != ""){
            var contents = content.split(/\r\n|\r|\n/);
            for(var i = 0; i < contents.length; i++){
                if(contents[i] != ""){
                    var slide = <Slide>{
                        content: contents[i]
                    };

                    slides.push(slide);
                }
            }
        }
        return slides;
    }
}
