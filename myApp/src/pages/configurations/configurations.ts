import { PerfilPage } from './../perfil/perfil';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SobrePage } from '../sobre/sobre';

/**
 * Generated class for the ConfigurationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-configurations',
  templateUrl: 'configurations.html',
})
export class ConfigurationsPage {

  public rootPage = PerfilPage;
  public perfilPage = PerfilPage;
  public sobrePage = SobrePage;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigurationsPage');
  }

  openPage(page: any){
    this.navCtrl.push(page);
  }
}
