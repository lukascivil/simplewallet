import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, interval, BehaviorSubject, of } from 'rxjs';
import { map, switchMap, catchError } from "rxjs/operators";
import { BitcoinServerResponse } from '../models/bitcoinserverresponse.model';
import { BritaServerResponse } from '../models/britaserverresponse.model';

@Injectable()
export class MarketService {

	// API URL mercadobitcoin.net
	private API_BITCOIN = "http://www.mercadobitcoin.net/api/BTC/ticker/";

	// API URL Banco Central do Brasil
	private API_BRITA = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='02-09-2018'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda";

	// Bitcoin, initialize with BitcoinServerResponse
	private bitcoinsource = new BehaviorSubject<BitcoinServerResponse>(new BitcoinServerResponse);
	bitcoincurrent = this.bitcoinsource.asObservable();

	// Brita, initialize with BritaServerResponse
	private britasource = new BehaviorSubject<BritaServerResponse>(new BritaServerResponse);
	britacurrent = this.britasource.asObservable();

	constructor(private http: Http) { }

	//Get object from API_BITCOIN, every 3 seconds
	getBitcoin(): Observable<any> {
		return interval(3000).pipe(
			switchMap(() => this.http.get(this.API_BITCOIN)
				.pipe(
					map(response => this.bitcoinsource.next(response.json().ticker)),
					catchError(error => of(`${error}`))
				)
			)
		)
	}

	//Get object from API_BRITA, every 3 seconds
	getBrita(): Observable<any> {
		return interval(3000).pipe(
			switchMap(() => this.http.get(this.API_BRITA)
				.pipe(
					map(response => this.britasource.next(response.json().value[0])),
					catchError(error => of(`${error}`))
				)
			)
		)
	}

}