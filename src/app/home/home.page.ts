import { Component } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';

import { RestService } from '../../services/rest.service'

import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  inputTitle: string;
  musicId: any;
  musicName: any;
  ready: boolean;
  urlDownload: string;
  currentUrl: SafeUrl;

  constructor(public alertController: AlertController, private platform: Platform, public restService: RestService, private file: File, private fileTransfer: FileTransfer, private sanitizer: DomSanitizer){
    this.urlDownload = "//api.youtube6download.top/fetch/iframe.php?color=c9181&i=";
  }

  async onDownload(){
    if( this.inputTitle == "" || this.inputTitle == null ){
      const alert = await this.alertController.create({
        header: 'Veuillez indiquer un titre de musique !',
        subHeader: '',
        message: '',
        buttons: ['OK']
      });

      await alert.present();
    }
    else{
      // Check for the video url from the Youtube Data v3 API
      this.restService.getUrlMusic(this.inputTitle)
      .then(data => {
        this.musicId = (data as any).items[0].id.videoId;
        this.musicName = (data as any).items[0].snippet.title;
        console.log(this.musicId);
      });

      // Convert url link to downloadable mp3 link
      // Wait for the API response
      await this.delay(500);
      this.currentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlDownload+this.musicId);
      console.log(this.urlDownload+this.musicId);
      this.ready = true;
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  checkMusicId(){
    if(this.musicId == undefined){
      window.setTimeout(this.checkMusicId, 100);
    }
    else{
      this.currentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlDownload+this.musicId);
      console.log(this.urlDownload+this.musicId);
      this.ready = true;
    }
  }

}
