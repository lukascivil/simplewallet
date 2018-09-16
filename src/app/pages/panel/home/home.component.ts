import { Component, OnInit, Input } from '@angular/core';
import { MarketService } from '../../../shared/providers/market.service';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../../shared/providers/user.service';
import { Chart } from 'chart.js';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Bitcoin in BRL
  bitcoinbrl: number = undefined;
  // Brita in BRL
  britabrl: number = undefined;

  // Total in BRL
  totalbrl: number = 0;

  // User data
  user: User;

  // Chart Object
  chart;
  // Substriptions
  private _userSubscription;
  private _bitcoinSubscription;
  private _britaSubscription;

  constructor(private market: MarketService, public title: Title, private userService: UserService) {
    // Set the page title
    title.setTitle("Dashboard");
  }

  ngOnInit() {
    // Get current user
    this._userSubscription = this.userService.usercurrent.subscribe(user => {
      this.user = user;
    });

    // Takes the current bitcoin value that is provided by API
    this._bitcoinSubscription = this.market.bitcoincurrent.subscribe(message => {
      // Calculate the value of the bitcoin in brl
      this.bitcoinbrl = this.user.cryptocoins.bitcoin * Number(message.buy);
      // Calculate total
      this.calculateTotalMoney();
    });

    // Takes the current britas value that is provided by API
    this._britaSubscription = this.market.britacurrent.subscribe(message => {
      // Calculate the value of the britas in brl
      this.britabrl = this.user.cryptocoins.brita * message.cotacaoCompra;
      // Calculate total
      this.calculateTotalMoney();
    });
  }

  ngAfterViewInit() {
    this.renderChart()
  // Unsubscribe all substriptions
  ngOnDestroy() {
    this._userSubscription.unsubscribe();
    this._bitcoinSubscription.unsubscribe();
    this._britaSubscription.unsubscribe();
  }

  // Calculates the total value of currencies in brl
  calculateTotalMoney() {
    // Only calculates if the value of the coins is set
    if (this.user.money_brl != undefined && this.bitcoinbrl != undefined && this.britabrl != undefined) {
      this.totalbrl = this.bitcoinbrl + this.britabrl + this.user.money_brl;
    }
  }

  renderChart() {
    var canvas = <HTMLCanvasElement>document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    // Pie chart Object
    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ["Real", "Bitcoin", "Brita"],
        datasets: [{
          label: "Population (millions)",
          backgroundColor: ["#009b3a", "#ffba15", "#9c27b0"],
          data: [0, 0, 0]
        }]
      },
      options: {
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              // Returns the label in the brl currency format
              return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            }
          }
        },
        title: {
          display: true,
          text: 'Projection of currencies in BRL'
        }
      }
    });
  }

  // For each currency the value is updated in the chart
  updateChart(values: Array<number>) {
    for (let key in values)
      this.chart.data.datasets[0].data[key] = values[key];
    this.chart.update();
  }

}
