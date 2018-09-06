import { Component, OnInit, Input } from '@angular/core';
import { MarketService } from '../../../shared/providers/market.service';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../../shared/providers/user.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // User Real
  brluser: number = undefined;

  // Bitcoin in BRL
  bitcoinbrl: number = undefined;
  // User original Bitcoin
  bitcoinuser: number = undefined;

  // Brita in BRL
  britabrl: number = undefined;
  // User original Brita
  britauser: number = undefined;

  // Total in BRL
  totalbrl: number = 0;

  // Chart Object
  chart;

  constructor(private market: MarketService, public title: Title, private userService: UserService) {
    // Set the page title
    title.setTitle("Dashboard");
  }

  ngOnInit() {
    // Get current user
    let user = this.userService.getUser();
    // Take the money (brl), bitcoin, brita that the user has in the database
    this.brluser = user.money_brl;
    this.bitcoinuser = user.cryptocoins.bitcoin;
    this.britauser = user.cryptocoins.brita;

    // Takes the current bitcoin value that is provided by API
    this.market.bitcoincurrent.subscribe(message => {
      if (message.buy !== undefined) {
        // Calculate the value of the bitcoin in brl
        this.bitcoinbrl = this.bitcoinuser * Number(message.buy);
        // Calculate total
        this.calculateTotalMoney();
      }
    });

    // Takes the current britas value that is provided by API
    this.market.britacurrent.subscribe(message => {
      if (message.cotacaoCompra !== undefined) {
        // Calculate the value of the britas in brl
        this.britabrl = this.britauser * message.cotacaoCompra;
        // Calculate total
        this.calculateTotalMoney();
      }
    });
  }

  ngAfterViewInit() {
    this.renderChart()
  }

  // Calculates the total value of currencies in brl
  calculateTotalMoney() {
    // Only calculates if the value of the coins is set
    if (this.brluser != undefined && this.bitcoinbrl != undefined && this.britabrl != undefined) {
      this.totalbrl = this.bitcoinbrl + this.britabrl + this.brluser;
      this.updateChart([this.brluser, this.bitcoinbrl, this.britabrl]);
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
          backgroundColor: ["#009b3a", "#ffba15", "#663300"],
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
