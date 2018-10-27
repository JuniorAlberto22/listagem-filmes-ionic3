import { MovieProvider } from './../../providers/movie/movie';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DetalhesPage } from '../detalhes/detalhes';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MovieProvider
  ]
})
export class FeedPage {

  public objeto_feed = {
    titulo: "Charles França",
    data: "November 5, 1995",
    descricao: "Estou criando um app incrível...",
    qtd_likes: 12,
    qtd_comments: 4,
    time_comment: "11h ago teste"
  }
  public loader;
  public lista_fimes = new Array<any>();
  public refresher;
  public isRefreshing: boolean = false;
  public page = 1;
  public infiniteScroll;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private movieProvider: MovieProvider, private loadingCtrl: LoadingController) {
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregarFilmes();
  }

  carregarFilmes(newPage: boolean = false){
    this.presentLoading();
    this.movieProvider.getLetestMovies(this.page).subscribe(m => 
        {
          const response = (m as any);
          const objetoRetorno = JSON.parse(response._body);
          if(newPage){
            this.concatArray(objetoRetorno.results, this.lista_fimes);
            this.infiniteScroll.complete();
          }else{
            this.lista_fimes = (objetoRetorno as any).results;
          }
          this.closeLoading();

          if(this.isRefreshing){
            this.refresher.complete();
            this.isRefreshing = false;
          }
        },
        error => {
          console.log(error);
          this.presentLoading()
        }
     );
  }

  concatArray(from, to){
    from.forEach(element => {
      to.push(element);
    });
  }
  ionViewDidEnter() {
    this.carregarFilmes()
  }

  presentLoading() {
  this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
  }

  closeLoading() {
    this.loader.dismiss();
  }

  abrirDetalhes(filme){
    this.navCtrl.push(DetalhesPage, {id: filme.id});
  }

  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    this.page++;
    this.carregarFilmes(true);
  }

}
