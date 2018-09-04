export class User {
	id: string;
	name: string;
	email: string;
	password: string;
	transactions: any;
	money_brl: number;
	cryptocoins: { brita: number, bitcoin: number };
}