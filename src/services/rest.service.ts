import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RestService{

  constructor(public http: HttpClient){}

  apiUrlYoutubeDataV3 = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyDGvgEx6yMODoaiYIHkkLnbzxd_qSe4FUs&part=snippet&maxResults=1&type=video"

  getUrlMusic(musicName: string){
    return new Promise(resolve => {
    this.http.get(this.apiUrlYoutubeDataV3+'&q='+musicName).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
