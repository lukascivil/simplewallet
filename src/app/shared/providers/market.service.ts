import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, interval } from 'rxjs';
import { map, switchMap } from "rxjs/operators";

@Injectable()
export class MarketService {

	constructor(private http: Http) { }

	getBitcoin(): Observable<any> {
		return interval(3000).pipe(
			switchMap(() => this.http.get("http://www.mercadobitcoin.net/api/BTC/ticker/")
				.pipe(map(response => response.json().ticker)))
		)
	}

	getBrita(): Observable<any> {
		return interval(3000).pipe(
			switchMap(() => this.http.get("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='02-09-2018'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda")
				.pipe(map(response => response.json().value)))
		)
	}

}