import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, interval } from 'rxjs';
import { map, switchMap } from "rxjs/operators";

@Injectable()
export class MarketService {

	API_BITCOIN = "http://www.mercadobitcoin.net/api/BTC/ticker/"
	API_BRITA = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='02-09-2018'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda"

	constructor(private http: Http) { }

	//Get object from API_BITCOIN, every 3 seconds
	getBitcoin(): Observable<any> {
		return interval(3000).pipe(
			switchMap(() => this.http.get(this.API_BITCOIN)
				.pipe(map(response => response.json().ticker)))
		)
	}

	//Get object from API_BRITA, every 3 seconds
	getBrita(): Observable<any> {
		return interval(3000).pipe(
			switchMap(() => this.http.get(this.API_BRITA)
				.pipe(map(response => response.json().value)))
		)
	}

}