import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  inputTitle: string;

  constructor(public alertController: AlertController){}

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
      // On récupère l'url youtube de la musique en question

      // On converti la vidéo youtube en mp3

      // L'utilisateur télécharge ce mp3
    }
  }

}
